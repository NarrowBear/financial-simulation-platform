import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";

const timeRanges = ["1D", "5D", "1M", "6M", "1Y", "5Y"];

export default function StockChart() {
  const [selectedRange, setSelectedRange] = useState("1D");

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-lg font-semibold text-gray-900">Price Chart</h3>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range}
                size="sm"
                variant={selectedRange === range ? "solid" : "ghost"}
                onClick={() => setSelectedRange(range)}
                className={
                  selectedRange === range
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Chart Line */}
                <path
                  d="M 20 160 Q 60 140 100 120 T 180 100 T 260 80 T 340 60 T 380 40"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Area under curve */}
                <path
                  d="M 20 160 Q 60 140 100 120 T 180 100 T 260 80 T 340 60 T 380 40 L 380 200 L 20 200 Z"
                  fill="url(#chartGradient)"
                />
                {/* Data points */}
                <circle cx="20" cy="160" r="3" fill="#3b82f6"/>
                <circle cx="60" cy="140" r="3" fill="#3b82f6"/>
                <circle cx="100" cy="120" r="3" fill="#3b82f6"/>
                <circle cx="140" cy="110" r="3" fill="#3b82f6"/>
                <circle cx="180" cy="100" r="3" fill="#3b82f6"/>
                <circle cx="220" cy="90" r="3" fill="#3b82f6"/>
                <circle cx="260" cy="80" r="3" fill="#3b82f6"/>
                <circle cx="300" cy="70" r="3" fill="#3b82f6"/>
                <circle cx="340" cy="60" r="3" fill="#3b82f6"/>
                <circle cx="380" cy="40" r="3" fill="#3b82f6"/>
              </svg>
            </div>
            <p className="text-sm text-gray-500 mt-2">Interactive Chart - {selectedRange}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
