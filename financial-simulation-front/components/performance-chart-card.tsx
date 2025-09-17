import { useState } from "react";

const timeRanges = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

const performanceData = {
  "1D": {
    labels: ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"],
    values: [123000, 123500, 124200, 124800, 125100, 125300, 125200, 125430],
    title: "Portfolio Performance"
  },
  "1W": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    values: [120000, 121500, 123000, 124200, 125430],
    title: "Portfolio Performance"
  },
  "1M": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [115000, 118000, 121000, 125430],
    title: "Portfolio Performance"
  },
  "3M": {
    labels: ["Month 1", "Month 2", "Month 3"],
    values: [110000, 117000, 125430],
    title: "Portfolio Performance"
  },
  "1Y": {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    values: [100000, 105000, 115000, 125430],
    title: "Portfolio Performance"
  },
  "ALL": {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    values: [80000, 90000, 95000, 110000, 125430],
    title: "Portfolio Performance"
  }
};

const PerformanceChartCard = () => {
  const [selectedRange, setSelectedRange] = useState("1M");
  const data = performanceData[selectedRange as keyof typeof performanceData];

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
  const changePercent = ((change / previousValue) * 100).toFixed(2);

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
        </div>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-white">
          ${currentValue.toLocaleString()}
        </div>
        <div className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}${change.toLocaleString()} ({changePercent}%)
        </div>
      </div>

      <div className="h-48 relative">
        <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-full h-full">
          {/* Grid lines */}
          <defs>
            <pattern id="performance-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#performance-grid)" />
          
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
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#gradient)"
          />
          
          {/* Data points */}
          {data.values.map((value, index) => {
            const x = (index / (data.values.length - 1)) * 100;
            const y = 100 - ((value - min) / range) * 100;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>${max.toLocaleString()}</span>
          <span>${((max + min) / 2).toLocaleString()}</span>
          <span>${min.toLocaleString()}</span>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {data.labels.map((label, index) => (
            <span key={index} className="text-center">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChartCard;
