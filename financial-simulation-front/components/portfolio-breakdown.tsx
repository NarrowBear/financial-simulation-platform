const PortfolioBreakdown = () => {
  const holdings = [
    { name: "Stocks", percentage: 70.4, color: "bg-blue-500" },
    { name: "Bonds", percentage: 18.3, color: "bg-blue-300" },
    { name: "Cash", percentage: 11.3, color: "bg-gray-400" }
  ];

  const totalPercentage = holdings.reduce((sum, item) => sum + item.percentage, 0);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Holdings</h3>
      
      <div className="flex items-center space-x-6">
        {/* Donut Chart */}
        <div className="relative w-32 h-32">
          <svg width="128" height="128" viewBox="0 0 128 128" className="w-full h-full">
            <circle
              cx="64"
              cy="64"
              r="50"
              fill="none"
              stroke="#374151"
              strokeWidth="20"
            />
            <circle
              cx="64"
              cy="64"
              r="50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={`${(holdings[0].percentage / 100) * 314} 314`}
              strokeDashoffset="0"
              transform="rotate(-90 64 64)"
            />
            <circle
              cx="64"
              cy="64"
              r="50"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="20"
              strokeDasharray={`${(holdings[1].percentage / 100) * 314} 314`}
              strokeDashoffset={`-${(holdings[0].percentage / 100) * 314}`}
              transform="rotate(-90 64 64)"
            />
            <circle
              cx="64"
              cy="64"
              r="50"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="20"
              strokeDasharray={`${(holdings[2].percentage / 100) * 314} 314`}
              strokeDashoffset={`-${((holdings[0].percentage + holdings[1].percentage) / 100) * 314}`}
              transform="rotate(-90 64 64)"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1">
          {holdings.map((holding, index) => (
            <div key={index} className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${holding.color}`}></div>
                <span className="text-white">{holding.name}</span>
              </div>
              <span className="text-white font-medium">{holding.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioBreakdown;
