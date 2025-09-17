import { useState } from "react";

const timeRanges = ["1D", "1M", "6M", "1Y", "5Y"];

const candlestickData = [
  { open: 346.01, high: 360.12, low: 345.50, close: 349.89, isPositive: true },
  { open: 345.50, high: 348.20, low: 344.80, close: 347.30, isPositive: true },
  { open: 347.30, high: 349.50, low: 346.10, close: 348.90, isPositive: true },
  { open: 348.90, high: 350.20, low: 347.80, close: 349.20, isPositive: true },
  { open: 349.20, high: 352.10, low: 348.50, close: 349.89, isPositive: true },
];

const CandlestickChart = () => {
  const max = Math.max(...candlestickData.map(d => d.high));
  const min = Math.min(...candlestickData.map(d => d.low));
  const range = max - min;

  return (
    <div className="h-48 relative">
      <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-full h-full">
        {candlestickData.map((candle, index) => {
          const x = (index / (candlestickData.length - 1)) * 100;
          const bodyTop = 100 - ((candle.close - min) / range) * 100;
          const bodyBottom = 100 - ((candle.open - min) / range) * 100;
          const highY = 100 - ((candle.high - min) / range) * 100;
          const lowY = 100 - ((candle.low - min) / range) * 100;
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
      </svg>
    </div>
  );
};

const StockDetailsCard = () => {
  const [selectedRange, setSelectedRange] = useState("1D");

  const financialMetrics = [
    { label: "Market Cap", value: "2.60 T" },
    { label: "P/E Ratio", value: "35.87" },
    { label: "EPS", value: "9.76" },
    { label: "Open", value: "346.01" },
    { label: "Day Range", value: "345.50 - 360.12" },
    { label: "Volume", value: "21.15M" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Microsoft Corp</h3>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-white">349.89</span>
          <span className="text-lg font-medium text-green-400">+3.55</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
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
        <CandlestickChart />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {financialMetrics.map((metric, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-sm text-gray-400">{metric.label}:</span>
            <span className="text-sm font-medium text-white">{metric.value}</span>
          </div>
        ))}
      </div>

      <button className="w-full text-blue-400 hover:text-blue-300 font-medium text-sm py-2">
        Load More
      </button>
    </div>
  );
};

export default StockDetailsCard;
