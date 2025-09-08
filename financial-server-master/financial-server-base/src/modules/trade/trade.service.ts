import { Injectable } from "@nestjs/common";
import { TradeRecord } from "./entities/trade-record.entity";
import { BaseService } from "../../common/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../order/entities/order.entity";
import { OrderOperation, OrderStatus, OrderType } from "src/common/enums/order.enums";
import { OrderService } from "../order/order.service";
import { DoubleHeapUtils } from "src/common/utils/double-heap.utils";
import { RedisService } from "src/common/service/redis.service";
import { v4 as uuidv4 } from 'uuid';
import { min } from "rxjs";

@Injectable()
export class TradeService extends BaseService<TradeRecord> {
    constructor(
        @InjectRepository(TradeRecord)
        private readonly tradeRecordRepository: Repository<TradeRecord>,
        @InjectRepository(Order)
        private readonly orderService: OrderService,
        private readonly redisService: RedisService,
    ) {
        super(tradeRecordRepository);
    }

    /**
     * Get trade records price
     * @param symbol 
     * @returns 
     */
    async getTradeRecordsPrice(symbol: number): Promise<number> {
        const searchSql = `
            SELECT IF(count(*) > 0, IF(count(*) > 1, sum(unit_price) / 2, unit_price), 0) AS estimated_price 
            FROM (
            SELECT sum(price) / sum(trade_quantity) AS unit_price FROM trade_record 
            WHERE symbol = ${symbol} and order_type = ${OrderOperation.BUY}
            ORDER BY created_time DESC
            limit 20
            UNION ALL
            SELECT sum(price) / sum(trade_quantity) AS unit_price FROM trade_record 
            WHERE symbol = ${symbol} and order_type = ${OrderOperation.SELL}
            ORDER BY created_time DESC
            limit 20
            )
        `;
        const tradeRecords = await this.tradeRecordRepository.query(searchSql);
        return tradeRecords.estimated_price;
    }

    /**
     * MatchMarketing Operation
     * 1. select all orders from order table with status = 'pending' and symbol = 'symbol'
     * 2. group by order.type(sell, buy)
     * 3. in buy group, order by price, create time desc, in sell group, order by price, create time asc
     * 4. filter the first order in each group, if(buy.price >= sell.price) then create a trade record,and match success,
     *    else, continue to the next order
     * 5. update order status to 'matched'
     * 6. update trade record status to 'success'
     */
    async matchMarketing(symbol: number): Promise<void> {
        // add lock, lock the symbol
        const lockKey = `trade:lock:${symbol}`;
        const lockValue = uuidv4();
        const lockResult = await this.redisService.setnx(lockKey, lockValue, 10);
        if(!lockResult) {
            throw new Error('Lock acquisition failed');
        }
        try {
            const pendingOrders = await this.orderService.findBy({
                status: OrderStatus.PENDING,
                symbol: symbol
            });
            const buyOrders = pendingOrders.filter(order => order.operation === OrderOperation.BUY).sort((a, b) => b.price - a.price);
            const sellOrders = pendingOrders.filter(order => order.operation === OrderOperation.SELL).sort((a, b) => a.price - b.price);

            const buyHeap = new DoubleHeapUtils<Order>('price');
            buyHeap.initHeap(buyOrders);
            const sellHeap = new DoubleHeapUtils<Order>('price');
            sellHeap.initHeap(sellOrders);
            while(buyHeap.getSize() > 0 && sellHeap.getSize() > 0) {
                const buyOrder = buyHeap.peek();
                const sellOrder = sellHeap.peek();
                if(buyOrder === null || sellOrder === null) {
                    break;
                }
                // if buy order or sell order is not limit order, then check slippage
                if(buyOrder.orderType !== OrderType.LIMIT || sellOrder.orderType !== OrderType.LIMIT) {
                    const slippageResult = await this.slippageCheck(sellOrder, buyOrder);
                    if(slippageResult) {
                        break;
                    }
                }
                // buy order available quantity and sell order available quantity
                const buyAvailableQuantity = buyOrder.quantity - buyOrder.dealQuantity;
                const sellAvailableQuantity = sellOrder.quantity - sellOrder.dealQuantity;
                let sellStatus: OrderStatus = OrderStatus.PENDING, buyStatus: OrderStatus = OrderStatus.PENDING;
                // when buy order price is greater than or equal to sell order price, then match the order
                if (buyOrder.price >= sellOrder.price) {
                    // the first situation, buy order price is greater than sell order price,
                    if(buyAvailableQuantity > sellAvailableQuantity) {
                        const result = await this.createTradeRecord(buyOrder, sellOrder, true);
                        if(result) {
                            sellHeap.extract(false);
                            buyOrder.dealQuantity += sellAvailableQuantity;
                            sellOrder.dealQuantity += sellAvailableQuantity;
                            sellStatus = OrderStatus.FILLED;
                            buyStatus = OrderStatus.PARTIAL_FILLED;
                        }
                    } else if (buyAvailableQuantity < sellAvailableQuantity) {
                        const result = await this.createTradeRecord(buyOrder, sellOrder, false);
                        if(result) {
                            buyHeap.extract(true);
                            sellOrder.dealQuantity += buyAvailableQuantity;
                            buyOrder.dealQuantity += buyAvailableQuantity;
                            sellStatus = OrderStatus.PARTIAL_FILLED;
                            buyStatus = OrderStatus.FILLED;
                        }
                    } else {
                        const result = await this.createTradeRecord(buyOrder, sellOrder, false);
                        if(result) {
                            buyHeap.extract(true);
                            sellHeap.extract(false);
                            buyOrder.dealQuantity += sellAvailableQuantity;
                            sellOrder.dealQuantity += sellAvailableQuantity;
                            sellStatus = OrderStatus.FILLED;
                            buyStatus = OrderStatus.FILLED;
                        }
                    }
                    await this.updateOrderStatus(buyOrder, buyOrder.dealQuantity, buyStatus);
                    await this.updateOrderStatus(sellOrder, sellOrder.dealQuantity, sellStatus);
                    
                } else {
                    break;
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await this.redisService.releaseLock(lockKey, lockValue);
        }
    }

    /**
     * Slippage check
     * @param sellOrder 
     * @param buyOrder 
     * @returns 
     */
    async slippageCheck(sellOrder: Order, buyOrder: Order): Promise<any> {
        let maxBuyPrice = 0, minBuyPrice = 0, maxSellPrice = 0, minSellPrice = 0;
        let situation = 0;
        // here has 3 situation:
        // 1. buy order is market order, sell order is market order
        // 2. buy order is limit order, sell order is market order
        // 3. buy order is market order, sell order is limit order
        if(buyOrder.orderType === OrderType.MARKET && sellOrder.orderType === OrderType.MARKET) {
            situation = 1;
            maxBuyPrice = buyOrder.price * (1 + buyOrder.maxSlippage / 100);
            minBuyPrice = buyOrder.price;
            maxSellPrice = sellOrder.maxSlippage;
            minSellPrice = sellOrder.price * (1 - sellOrder.maxSlippage / 100);
        } else if(buyOrder.orderType === OrderType.LIMIT && sellOrder.orderType === OrderType.MARKET) {
            situation = 2;
            minBuyPrice = buyOrder.price;
            maxSellPrice = sellOrder.price * (1 - sellOrder.maxSlippage / 100);
            minSellPrice = sellOrder.price;
        } else if(buyOrder.orderType === OrderType.MARKET && sellOrder.orderType === OrderType.LIMIT) {
            situation = 3;
            maxBuyPrice = buyOrder.price * (1 + buyOrder.maxSlippage / 100);
            minSellPrice = sellOrder.price;
        }
        const result = await this.slippage(situation, maxBuyPrice, minBuyPrice, maxSellPrice, minSellPrice, sellOrder, buyOrder);
        return result;
    }

    /**
     * Slippage check
     * @param situation 
     * @param maxBuyPrice 
     * @param minBuyPrice 
     * @param maxSellPrice 
     * @param minSellPrice 
     * @param sellOrder 
     * @param buyOrder 
     */
    async slippage(situation: number, maxBuyPrice: number, minBuyPrice: number, maxSellPrice: number, minSellPrice: number, sellOrder: Order, buyOrder: Order): Promise<any> {
        const result = {
            isMatch: false,
            buyPrice: 0,
            sellPrice: 0
        };
        if(situation === 1) {
            // need to check the price is in the range of maxBuyPrice and minBuyPrice
            if(minBuyPrice <= maxSellPrice && maxBuyPrice >= minSellPrice) {
                result.isMatch = true;
                result.buyPrice = Math.max(minBuyPrice, minSellPrice);
                result.sellPrice = Math.min(maxBuyPrice, maxSellPrice);
                const middlePrice = (result.buyPrice + result.sellPrice) / 2;
                result.buyPrice = middlePrice;
                result.sellPrice = middlePrice;
            }
        } else if (situation === 2) {
            if(minBuyPrice >= minSellPrice) {
                result.isMatch = true;
                result.buyPrice = minBuyPrice;
                result.sellPrice = minBuyPrice;
            }
        } else if (situation === 3) {
            if(maxBuyPrice >= minSellPrice) {
                result.isMatch = true;
                result.buyPrice = minSellPrice;
                result.sellPrice = minSellPrice;
            }
        }
        return result;
    }

    /**-+
     * Create trade record
     * @param buyOrder 
     * @param sellOrder 
     * @param isBuyGreaterThanSell 
     * @returns 
     */
    async createTradeRecord(buyOrder: Order, sellOrder: Order, isBuyGreaterThanSell: boolean): Promise<boolean> {
        const buyTradeRecord = new TradeRecord(), sellTradeRecord = new TradeRecord();
        buyTradeRecord.accountId = buyOrder.accountId;
        buyTradeRecord.symbol = buyOrder.symbol;
        buyTradeRecord.orderId = buyOrder.id;
        buyTradeRecord.orderType = OrderOperation.BUY;
        buyTradeRecord.price = sellOrder.price;
        buyTradeRecord.createdTime = new Date();
        buyTradeRecord.updateTime = new Date();
        if(isBuyGreaterThanSell) {
            buyTradeRecord.tradeQuantity = sellOrder.quantity - sellOrder.dealQuantity;
            sellTradeRecord.tradeQuantity = sellOrder.quantity - sellOrder.dealQuantity;
        } else {
            buyTradeRecord.tradeQuantity = buyOrder.quantity - buyOrder.dealQuantity;
            sellTradeRecord.tradeQuantity = buyOrder.quantity - buyOrder.dealQuantity;
        }
        sellTradeRecord.accountId = sellOrder.accountId;
        sellTradeRecord.symbol = sellOrder.symbol;
        sellTradeRecord.orderId = sellOrder.id;;
        sellTradeRecord.orderType = OrderOperation.SELL;
        sellTradeRecord.price = sellOrder.price;
        sellTradeRecord.createdTime = new Date();
        sellTradeRecord.updateTime = new Date();
        await this.tradeRecordRepository.insert([buyTradeRecord, sellTradeRecord]);
        return true;
    }

    /**
     * Update order status
     * @param order 
     * @param dealQuantity 
     * @param status 
     */
    async updateOrderStatus(order: Order, dealQuantity: number, status: OrderStatus) {
        await this.orderService.update(order.id, {
            status: status,
            dealQuantity: dealQuantity,
            updateTime: new Date()
        });
    }
}