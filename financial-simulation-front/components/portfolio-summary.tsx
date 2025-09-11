"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";

export const PortfolioSummary = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Portfolio Summary</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              $12,430.50
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">+$287.50</span>
              <span className="text-green-600 font-semibold">(+2.37%)</span>
            </div>
          </div>
          <div className="w-24 h-24 relative">
            {/* 简单的饼图表示 */}
            <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
              <div className="absolute inset-0 rounded-full border-8 border-teal-500 border-r-0 border-b-0 transform rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-8 border-blue-600 border-l-0 border-b-0 transform -rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-8 border-blue-300 border-t-0 border-r-0 transform rotate-90"></div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
