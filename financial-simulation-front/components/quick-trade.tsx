"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";

export const QuickTrade = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Quick Trade</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="AAPL"
              className="flex-1"
              endContent={
                <button className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              }
            />
            <Button
              isIconOnly
              variant="bordered"
              className="min-w-8 w-8 h-10"
            >
              ▼
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="10"
              className="flex-1"
              endContent={
                <button className="text-gray-400 hover:text-gray-600">
                  ▼
                </button>
              }
            />
            <Select
              placeholder="Market"
              className="w-24"
              size="sm"
            >
              <SelectItem key="market" value="market">Market</SelectItem>
              <SelectItem key="limit" value="limit">Limit</SelectItem>
              <SelectItem key="stop" value="stop">Stop</SelectItem>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="AAPL"
              className="flex-1"
              endContent={
                <button className="text-gray-400 hover:text-gray-600">
                  ▼
                </button>
              }
            />
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="172.50"
              className="flex-1"
            />
            <Input
              placeholder="10"
              className="flex-1"
            />
          </div>

          <div className="flex gap-2">
            <Button
              color="primary"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Buy
            </Button>
            <Button
              color="danger"
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Sell
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
