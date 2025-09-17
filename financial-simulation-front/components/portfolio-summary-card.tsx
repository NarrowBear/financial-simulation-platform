interface PortfolioData {
  totalValue: string;
  dayChange: string;
  dayChangePercent: string;
  isPositive: boolean;
  cashBalance: string;
  investedAmount: string;
  dayGain: string;
  totalGain: string;
  totalGainPercent: string;
}

const portfolioData: PortfolioData = {
  totalValue: "$125,430.50",
  dayChange: "+$2,340.25",
  dayChangePercent: "+1.90%",
  isPositive: true,
  cashBalance: "$15,230.75",
  investedAmount: "$110,199.75",
  dayGain: "+$2,340.25",
  totalGain: "+$25,430.50",
  totalGainPercent: "+25.43%"
};

const PortfolioSummaryCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Portfolio Summary</h3>
        <div className="text-sm text-gray-400">As of 4:00 PM EST</div>
      </div>

      {/* Total Portfolio Value */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-white mb-2">
          {portfolioData.totalValue}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-lg font-medium ${portfolioData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {portfolioData.dayChange}
          </span>
          <span className={`text-lg ${portfolioData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            ({portfolioData.dayChangePercent})
          </span>
          <span className="text-sm text-gray-400">today</span>
        </div>
      </div>

      {/* Portfolio Breakdown */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
          <div className="text-sm text-gray-400 mb-1">Cash Balance</div>
          <div className="text-xl font-semibold text-white">{portfolioData.cashBalance}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
          <div className="text-sm text-gray-400 mb-1">Invested</div>
          <div className="text-xl font-semibold text-white">{portfolioData.investedAmount}</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Day's Gain</span>
          <span className={`font-medium ${portfolioData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {portfolioData.dayGain}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Gain</span>
          <div className="text-right">
            <div className={`font-medium ${portfolioData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {portfolioData.totalGain}
            </div>
            <div className={`text-sm ${portfolioData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              ({portfolioData.totalGainPercent})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;
