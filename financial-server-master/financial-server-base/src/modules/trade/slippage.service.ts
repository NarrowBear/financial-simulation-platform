import { Injectable } from "@nestjs/common";
import { Order } from "../order/entities/order.entity";
import { OrderType } from "src/common/enums/order.enums";

@Injectable()
export class SlippageService {

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
        // extract = 1, means extract the buy order, extract = 2, means extract the sell order
        const result = {
            isMatch: false,
            buyPrice: 0,
            sellPrice: 0,
            extract: 0
        };
        let middlePrice = 0;
        if(situation === 1) {
            
            // need to check the price is in the range of maxBuyPrice and minBuyPrice
            if(minBuyPrice <= maxSellPrice && maxBuyPrice >= minSellPrice) {
                result.isMatch = true;
                result.buyPrice = Math.max(minBuyPrice, minSellPrice);
                result.sellPrice = Math.min(maxBuyPrice, maxSellPrice);
                middlePrice = (result.buyPrice + result.sellPrice) / 2;
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
        if(!result.isMatch) {
            middlePrice = (minBuyPrice + maxBuyPrice + minSellPrice + maxSellPrice) / 4;
            if(Math.abs(buyOrder.price - middlePrice) > Math.abs(sellOrder.price - middlePrice)) {
                result.extract = 1;
            } else {
                result.extract = 2;
            }
        }
        return result;
    }
}
