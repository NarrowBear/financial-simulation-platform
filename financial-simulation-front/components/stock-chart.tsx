"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";

const timeRanges = ["1D", "5D", "1M", "6M", "1Y", "5Y"];

export const StockChart = () => {
  const [selectedRange, setSelectedRange] = useState("1D");

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-lg font-semibold text-gray-900">Price Chart</h3>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range}
                size="sm"
                variant={selectedRange === range ? "solid" : "bordered"}
                color={selectedRange === range ? "primary" : "default"}
                className={`text-xs px-3 py-1 ${
                  selectedRange === range 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onPress={() => setSelectedRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          {/* 模拟图表区域 */}
          <div className="w-full h-full relative">
            {/* 简单的折线图表示 */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* 网格线 */}
              <g stroke="#E5E7EB" strokeWidth="1" fill="none">
                <line x1="0" y1="40" x2="400" y2="40"/>
                <line x1="0" y1="80" x2="400" y2="80"/>
                <line x1="0" y1="120" x2="400" y2="120"/>
                <line x1="0" y1="160" x2="400" y2="160"/>
              </g>
              {/* 价格线 */}
              <path
                d="M 20 160 Q 100 140 180 120 T 360 80"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
              />
              {/* 填充区域 */}
              <path
                d="M 20 160 Q 100 140 180 120 T 360 80 L 360 200 L 20 200 Z"
                fill="url(#chartGradient)"
              />
              {/* 数据点 */}
              <circle cx="20" cy="160" r="3" fill="#3B82F6"/>
              <circle cx="100" cy="140" r="3" fill="#3B82F6"/>
              <circle cx="180" cy="120" r="3" fill="#3B82F6"/>
              <circle cx="260" cy="100" r="3" fill="#3B82F6"/>
              <circle cx="340" cy="80" r="3" fill="#3B82F6"/>
            </svg>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
