export enum OrderOperation {
    BUY = 'Buy',
    SELL = 'Sell'
}

export enum OrderType {
    MARKET = 'Market',
    LIMIT = 'Limit'
}

export enum OrderStatus {
    PENDING = 'Pending',
    PARTIAL_FILLED = 'PartialFilled',
    FILLED = 'Filled',
    CANCELLED = 'Cancelled',
    REJECTED = 'Rejected'
} 