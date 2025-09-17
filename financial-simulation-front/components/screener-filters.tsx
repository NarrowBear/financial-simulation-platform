const ScreenerFilters = () => {
  const sectors = [
    "Technology",
    "Financials", 
    "Healthcare",
    "Energy",
    "Industrials",
    "Utilities",
    "Materials",
    "Communication Services"
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Screener Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Market Cap Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Market Cap</label>
          <div className="relative">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="$10M"
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="text"
                placeholder="$2000B"
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Dividend Yield Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Dividend Yield</label>
          <div className="relative">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Min %"
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="text"
                placeholder="Max %"
                className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* P/E Ratio Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">P/E Ratio</label>
          <div className="relative">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="5"
                className="w-16 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="text"
                placeholder="20"
                className="w-16 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 text-gray-400 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sector Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Sector</label>
          <div className="relative">
            <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option value="">- Select Sector -</option>
              {sectors.map((sector) => (
                <option key={sector} value={sector} className="bg-gray-700">
                  {sector}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex justify-end space-x-3 mt-6">
        <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
          Clear Filters
        </button>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ScreenerFilters;
