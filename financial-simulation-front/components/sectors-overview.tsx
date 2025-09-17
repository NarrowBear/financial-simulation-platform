interface SectorData {
  name: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  chartData: number[];
}

const sectorsData: SectorData[] = [
  {
    name: "Technology",
    change: "+1.4%",
    changePercent: "+1.4%",
    isPositive: true,
    chartData: [100, 102, 101, 103, 104],
  },
  {
    name: "Financials",
    change: "+0.8%",
    changePercent: "+0.8%",
    isPositive: true,
    chartData: [100, 100.5, 100.8, 100.6, 100.8],
  },
  {
    name: "Healthcare",
    change: "-0.3%",
    changePercent: "-0.3%",
    isPositive: false,
    chartData: [100, 99.8, 99.5, 99.7, 99.7],
  },
  {
    name: "Energy",
    change: "+0.6%",
    changePercent: "+0.6%",
    isPositive: true,
    chartData: [100, 100.2, 100.4, 100.3, 100.6],
  },
  {
    name: "Industrials",
    change: "+0.8%",
    changePercent: "+0.8%",
    isPositive: true,
    chartData: [100, 100.3, 100.5, 100.7, 100.8],
  },
  {
    name: "Utilities",
    change: "-0.5%",
    changePercent: "-0.5%",
    isPositive: false,
    chartData: [100, 99.9, 99.7, 99.6, 99.5],
  },
  {
    name: "Materials",
    change: "+0.4%",
    changePercent: "+0.4%",
    isPositive: true,
    chartData: [100, 100.1, 100.2, 100.3, 100.4],
  },
  {
    name: "Communication Services",
    change: "+1.1%",
    changePercent: "+1.1%",
    isPositive: true,
    chartData: [100, 100.5, 100.8, 101.0, 101.1],
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
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default function SectorsOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
      {sectorsData.map((sector) => (
        <div key={sector.name} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">{sector.name}</h3>
            <MiniChart data={sector.chartData} isPositive={sector.isPositive} />
          </div>
          <div className={`text-lg font-bold ${sector.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {sector.changePercent}
          </div>
        </div>
      ))}
    </div>
  );
}
