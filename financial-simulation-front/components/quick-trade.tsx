const QuickTrade = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Quick Trade</h3>
      
      <div className="space-y-4">
        {/* Symbol Search */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Symbol</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Q AAPL"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Symbol Input */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Symbol</label>
          <input
            type="text"
            placeholder="AAC"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="100"
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Order Type</label>
          <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="market">Market</option>
            <option value="limit">Limit</option>
            <option value="stop">Stop</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
            Buy
          </button>
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickTrade;