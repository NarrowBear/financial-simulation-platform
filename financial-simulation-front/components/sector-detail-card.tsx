const SectorDetailCard = () => {
  const chartData = [100, 102, 101, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];
  const max = Math.max(...chartData);
  const min = Math.min(...chartData);
  const range = max - min;

  const points = chartData.map((value, index) => {
    const x = (index / (chartData.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Sector Detail</h3>
      
      {/* Chart */}
      <div className="h-48 relative mb-6">
        <svg width="100%" height="100%" viewBox="0 0 400 200" className="w-full h-full">
          {/* Grid lines */}
          <defs>
            <pattern id="sector-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sector-grid)" />
          
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
            <linearGradient id="sector-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#sector-gradient)"
          />
        </svg>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Market Cap</span>
          <span className="text-lg font-semibold text-white">$14.25T</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Advancers</span>
          <span className="text-lg font-semibold text-blue-400">50</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Avg P/E</span>
          <span className="text-lg font-semibold text-blue-400">28.3</span>
        </div>
      </div>
    </div>
  );
};

export default SectorDetailCard;
