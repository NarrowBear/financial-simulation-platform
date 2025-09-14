import { Card, CardBody, CardHeader } from "@heroui/card";

interface Order {
  order: string;
  symbol: string;
  type: string;
  quantity: string;
  status: string;
}

const orders: Order[] = [
  { order: "Buy", symbol: "AAPL", type: "Buy", quantity: "12.50", status: "Completed" },
  { order: "Sell", symbol: "MSFT", type: "Sell", quantity: "$296,80", status: "Completed" },
];

export default function OrdersTable() {
  return (
    <Card className="w-full">
      <CardHeader className="text-white rounded-t-lg" style={{ backgroundColor: '#338EF7' }}>
        <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
      </CardHeader>
      <CardBody className="pt-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 pb-2 border-b border-gray-200">
            <div>Order</div>
            <div>Symbol</div>
            <div>Type</div>
            <div>Quantity</div>
            <div>Status</div>
          </div>
          
          {/* Rows */}
          {orders.map((order, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 py-2 text-sm">
              <div className="font-medium text-gray-900">{order.order}</div>
              <div className="text-gray-600">{order.symbol}</div>
              <div className="text-gray-600">{order.type}</div>
              <div className="text-gray-600">{order.quantity}</div>
              <div className="text-blue-600">{order.status}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
