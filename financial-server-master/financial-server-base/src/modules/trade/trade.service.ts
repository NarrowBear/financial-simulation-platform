import { Injectable } from "@nestjs/common";
import { TradeRecord } from "./entities/trade-record.entity";
import { BaseService } from "../../common/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../order/entities/order.entity";
import { OrderOperation, OrderStatus } from "src/common/enums/order.enums";
import { OrderService } from "../order/order.service";
import { DoubleHeapUtils } from "src/common/utils/double-heap.utils";

@Injectable()
export class TradeService extends BaseService<TradeRecord> {
    constructor(
        @InjectRepository(TradeRecord)
        private readonly tradeRecordRepository: Repository<TradeRecord>,
        @InjectRepository(Order)
        private readonly orderService: OrderService,
    ) {
        super(tradeRecordRepository);
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
    async matchMarketing(symbol: string): Promise<void> {
        const pendingOrders = await this.orderService.findBy({
            status: OrderStatus.PENDING,
            symbol: Number(symbol)
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
            const buyTradeRecord = new TradeRecord(), sellTradeRecord = new TradeRecord();
            buyTradeRecord.accountId = buyOrder.accountId;
            buyTradeRecord.symbol = buyOrder.symbol;
            buyTradeRecord.orderId = buyOrder.id;
            // when buy order price is greater than or equal to sell order price, then match the order
            if (buyOrder.price > sellOrder.price) {
                // the first situation, buy order price is greater than sell order price,
                if(buyOrder.quantity > sellOrder.quantity) {
                    
                    buyTradeRecord.tradeQuantity = sellOrder.quantity;
                    buyTradeRecord.orderType = OrderOperation.BUY;
                    buyTradeRecord.price = sellOrder.price;

                    sellTradeRecord.accountId = sellOrder.accountId;
                    sellTradeRecord.symbol = sellOrder.symbol;
                    sellTradeRecord.orderId = sellOrder.id;
                    sellTradeRecord.tradeQuantity = sellOrder.quantity;
                    sellTradeRecord.orderType = OrderOperation.SELL;
                    sellTradeRecord.price = buyOrder.price;

                }
            }
        }
    }
}