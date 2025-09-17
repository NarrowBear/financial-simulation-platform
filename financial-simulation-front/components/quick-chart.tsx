import { useState } from "react";

const timeRanges = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y"];

const QuickChart = () => {
  const [selectedRange, setSelectedRange] = useState("1M");

  // Sample candlestick data
  const candlestickData = [
    { open: 170, high: 175, low: 168, close: 173, isPositive: true },
    { open: 173, high: 178, low: 171, close: 176, isPositive: true },
    { open: 176, high: 180, low: 174, close: 177, isPositive: true },
    { open: 177, high: 182, low: 175, close: 180, isPositive: true },
    { open: 180, high: 185, low: 178, close: 183, isPositive: true },
    { open: 183, high: 188, low: 181, close: 186, isPositive: true },
    { open: 186, high: 190, low: 184, close: 188, isPositive: true },
    { open: 188, high: 192, low: 186, close: 190, isPositive: true },
  ];

  const volumeData = [200, 300, 250, 400, 350, 450, 380, 420];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Quick Chart</h3>
        <div className="flex space-x-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                selectedRange === range
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-64 relative">
        <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-full h-full">
          {/* Grid lines */}
          <defs>
            <pattern id="quick-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quick-grid)" />
          
          {/* Candlestick Chart */}
          {candlestickData.map((candle, index) => {
            const x = (index / (candlestickData.length - 1)) * 100;
            const bodyTop = 100 - ((candle.close - 160) / 40) * 100;
            const bodyBottom = 100 - ((candle.open - 160) / 40) * 100;
            const highY = 100 - ((candle.high - 160) / 40) * 100;
            const lowY = 100 - ((candle.low - 160) / 40) * 100;
            const bodyHeight = Math.abs(bodyTop - bodyBottom);
            const bodyY = Math.min(bodyTop, bodyBottom);

            return (
              <g key={index}>
                {/* High-Low line */}
                <line
                  x1={`${x}%`}
                  y1={`${highY}%`}
                  x2={`${x}%`}
                  y2={`${lowY}%`}
                  stroke="#6b7280"
                  strokeWidth="1"
                />
                {/* Body */}
                <rect
                  x={`${x - 2}%`}
                  y={`${bodyY}%`}
                  width="4%"
                  height={`${bodyHeight}%`}
                  fill={candle.isPositive ? "#10b981" : "#ef4444"}
                  stroke={candle.isPositive ? "#10b981" : "#ef4444"}
                  strokeWidth="1"
                />
              </g>
            );
          })}
          
          {/* Moving Average Line */}
          <polyline
            points="0,80 12.5,75 25,70 37.5,65 50,60 62.5,55 75,50 87.5,45 100,40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
          <span>185.00</span>
          <span>178.00</span>
          <span>172.00</span>
          <span>164.00</span>
          <span>133.00</span>
        </div>
      </div>

      {/* Volume Chart */}
      <div className="h-16 mt-4">
        <svg width="100%" height="100%" viewBox="0 0 400 60" className="w-full h-full">
          {volumeData.map((volume, index) => {
            const x = (index / (volumeData.length - 1)) * 100;
            const height = (volume / 500) * 100;
            const isPositive = index % 2 === 0;
            
            return (
              <rect
                key={index}
                x={`${x - 1}%`}
                y={`${100 - height}%`}
                width="2%"
                height={`${height}%`}
                fill={isPositive ? "#10b981" : "#ef4444"}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default QuickChart;
