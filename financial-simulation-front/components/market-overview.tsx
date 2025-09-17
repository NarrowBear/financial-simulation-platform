interface MarketData {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  chartData: number[];
}

const marketData: MarketData[] = [
  {
    name: "S&P 500",
    value: "4,567.32",
    change: "+24.73",
    changePercent: "+0.55%",
    isPositive: true,
    chartData: [4560, 4565, 4562, 4568, 4567],
  },
  {
    name: "NASDAQ",
    value: "14,382.28",
    change: "+192.82",
    changePercent: "+1.07%",
    isPositive: true,
    chartData: [14350, 14370, 14360, 14380, 14382],
  },
  {
    name: "Dow Jones",
    value: "35,281.47",
    change: "+94.32",
    changePercent: "+0.27%",
    isPositive: true,
    chartData: [35200, 35220, 35210, 35250, 35281],
  },
  {
    name: "Crypto Index",
    value: "3,284.67",
    change: "-61.45",
    changePercent: "-1.28%",
    isPositive: false,
    chartData: [3300, 3320, 3310, 3290, 3284],
  },
];

const MiniChart = ({ data, isPositive }: { data: number[]; isPositive: boolean }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-16 h-8 flex items-center justify-center">
      <svg width="64" height="32" viewBox="0 0 64 32" className="w-16 h-8">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default function MarketOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {marketData.map((market) => (
        <div key={market.name} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-300">{market.name}</h3>
            <MiniChart data={market.chartData} isPositive={market.isPositive} />
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            {market.value}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${market.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {market.change}
            </span>
            <span className={`text-sm ${market.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              ({market.changePercent})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
