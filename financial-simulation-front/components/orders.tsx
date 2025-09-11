"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface Order {
  symbol: string;
  quantity: number;
  status: "Filled" | "Pending" | "Cancelled";
}

const orders: Order[] = [
  { symbol: "AAPL", quantity: 10, status: "Filled" },
  { symbol: "TSLA", quantity: 5, status: "Filled" },
  { symbol: "AMZN", quantity: 2, status: "Filled" },
];

export const Orders = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-3">
          {orders.map((order, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{order.symbol}</div>
                <div className="text-sm text-gray-500">{order.quantity}</div>
              </div>
              <Chip
                color={order.status === "Filled" ? "success" : "warning"}
                size="sm"
                variant="flat"
              >
                {order.status}
              </Chip>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
