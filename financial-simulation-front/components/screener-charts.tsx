import { useState } from "react";

const timeRanges = ["1D", "1M", "6M", "1Y", "5Y"];

const chartData = {
  "1D": {
    labels: ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"],
    values: [11.0, 11.1, 11.05, 11.15, 11.12, 11.18, 11.16, 11.18],
    title: "Charts"
  },
  "1M": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [10.8, 11.0, 11.2, 11.18],
    title: "Charts"
  },
  "6M": {
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    values: [10.5, 10.8, 11.0, 11.2, 11.1, 11.18],
    title: "Charts"
  },
  "1Y": {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    values: [9.5, 10.2, 10.8, 11.18],
    title: "Charts"
  },
  "5Y": {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    values: [5.0, 6.5, 8.2, 9.8, 11.18],
    title: "Charts"
  }
};

const ScreenerCharts = () => {
  const [selectedRange, setSelectedRange] = useState("1D");
  const data = chartData[selectedRange as keyof typeof chartData];

  const max = Math.max(...data.values);
  const min = Math.min(...data.values);
  const range = max - min;

  const points = data.values.map((value, index) => {
    const x = (index / (data.values.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const currentValue = data.values[data.values.length - 1];
  const previousValue = data.values[0];
  const change = currentValue - previousValue;
  const changePercent = ((change / previousValue) * 100).toFixed(1);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{data.title}</h3>
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
          <button className="p-1 text-gray-400 hover:text-white ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stock Symbol */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white">AAPL</h4>
      </div>

      {/* Chart */}
      <div className="h-48 relative mb-6">
        <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-full h-full">
          {/* Grid lines */}
          <defs>
            <pattern id="screener-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#screener-grid)" />
          
          {/* Chart line */}
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient fill */}
          <defs>
            <linearGradient id="screener-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#screener-gradient)"
          />
        </svg>
      </div>

      {/* Stock Info */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Price</span>
          <span className="text-lg font-semibold text-white">${currentValue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Change %</span>
          <span className={`text-lg font-semibold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{changePercent}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Market Cap</span>
          <span className="text-lg font-semibold text-white">$208.63B</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="border-t border-gray-700 pt-4">
        <h4 className="text-lg font-semibold text-white mb-4">Key Metrics</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Price</span>
            <span className="text-sm font-medium text-white">{currentValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Change %</span>
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{changePercent}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Market Cap</span>
            <span className="text-sm font-medium text-white">27.57</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenerCharts;
