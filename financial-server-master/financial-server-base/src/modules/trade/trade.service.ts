import { Injectable } from "@nestjs/common";
import { TradeRecord } from "./entities/trade-record.entity";
import { BaseService } from "../../common/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../order/entities/order.entity";
import { OrderOperation, OrderStatus } from "src/common/enums/order.enums";
import { OrderService } from "../order/order.service";

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

        // todo: match buy and sell orders
        for (const buyOrder of buyOrders) {
            

        }
    }
}