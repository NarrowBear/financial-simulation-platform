const PortfolioPerformanceMetrics = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Asset Allocation</h3>
      
      <div className="text-center">
        <div className="text-4xl font-bold text-white mb-2">70.44%</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Niayd Rotal</span>
            <span className="text-sm font-medium text-green-400">+15,750</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Cashica</span>
            <span className="text-sm font-medium text-green-400">+11.3%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformanceMetrics;
