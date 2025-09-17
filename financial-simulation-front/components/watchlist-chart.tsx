import { useState } from "react";

const timeRanges = ["1D", "1W", "1M", "1Y", "5Y"];

const chartData = {
  "1D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    values: [4310, 4325, 4400, 4350, 4567],
    title: "Watchlist"
  },
  "1W": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [4200, 4300, 4400, 4567],
    title: "Watchlist"
  },
  "1M": {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    values: [4000, 4100, 4300, 4567],
    title: "Watchlist"
  },
  "1Y": {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    values: [3500, 3800, 4200, 4567],
    title: "Watchlist"
  },
  "5Y": {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    values: [2000, 2500, 3000, 3500, 4567],
    title: "Watchlist"
  }
};

const WatchlistChart = () => {
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

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{data.title}</h3>
        <div className="flex space-x-2">
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

      <div className="h-64 relative">
        <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-full h-full">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart line */}
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          <span>{max.toLocaleString()}</span>
          <span>{((max + min) / 2).toLocaleString()}</span>
          <span>{min.toLocaleString()}</span>
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

export default WatchlistChart;
