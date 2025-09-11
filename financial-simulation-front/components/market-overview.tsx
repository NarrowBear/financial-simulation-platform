"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";

interface MarketData {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const marketData: MarketData[] = [
  {
    name: "S&P 500",
    value: "4,447.59",
    change: "+0.5.76",
    changePercent: "1.04%",
    isPositive: true,
  },
  {
    name: "NASDAQ",
    value: "13,794.04",
    change: "+118.14",
    changePercent: "0.86%",
    isPositive: true,
  },
  {
    name: "Dow Jones",
    value: "34,245.09",
    change: "+156.10",
    changePercent: "0.46%",
    isPositive: true,
  },
];

export const MarketOverview = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Market Overview</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-4">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        item.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.change}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        item.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ({item.changePercent})
                    </span>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {item.value}
                </div>
                <div className="w-full h-8 bg-gray-100 rounded mt-2 flex items-center justify-center">
                  <div className="w-full h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
