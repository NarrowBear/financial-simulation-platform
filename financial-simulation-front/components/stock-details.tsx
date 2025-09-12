"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";

interface StockDetailsProps {
  symbol?: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

export const StockDetails = ({ 
  symbol = "AAPL", 
  price = 145.86, 
  change = 1.34, 
  changePercent = 0.93 
}: StockDetailsProps) => {
  const stockData = {
    previousClose: 144.52,
    open: 143.80,
    high: 146.20,
    marketCap: "2.31T",
    peRatio: 24.7,
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories."
  };

  return (
    <Card className="w-full shadow-xl rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl" style={{ backgroundColor: '#FFFFFF' }}>
      <CardHeader className="pb-6 px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mb-8 gap-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Stock Details</h3>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 w-full sm:w-56 border border-gray-200">
            <span className="text-gray-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Search stocks..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-5 mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg sm:text-2xl">🍎</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 truncate">Apple Inc.</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <p className="text-base sm:text-lg text-gray-500 font-medium">(AAPL)</p>
              <span className="px-2 py-1 bg-gray-100 text-xs font-semibold text-gray-600 rounded-md w-fit">NASDAQ</span>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">${price.toFixed(2)}</div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-green-600 text-lg sm:text-xl">▲</span>
            <span className="text-green-600 font-bold text-lg sm:text-xl">
              +{change.toFixed(2)} (+{changePercent.toFixed(2)}%)
            </span>
            <span className="text-sm text-gray-500">Today</span>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-6 sm:space-y-8">
          {/* 关键数据 */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Key Statistics</h4>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div className="flex justify-between items-center py-3 px-3 sm:px-4 bg-white rounded-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Previous Close</span>
                <span className="font-bold text-gray-900 text-base sm:text-lg">${stockData.previousClose}</span>
              </div>
              <div className="flex justify-between items-center py-3 px-3 sm:px-4 bg-white rounded-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Open</span>
                <span className="font-bold text-gray-900 text-base sm:text-lg">${stockData.open}</span>
              </div>
              <div className="flex justify-between items-center py-3 px-3 sm:px-4 bg-white rounded-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Day's Range</span>
                <span className="font-bold text-gray-900 text-base sm:text-lg">$143.10 - ${stockData.high}</span>
              </div>
              <div className="flex justify-between items-center py-3 px-3 sm:px-4 bg-white rounded-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Market Cap</span>
                <span className="font-bold text-gray-900 text-base sm:text-lg">{stockData.marketCap}</span>
              </div>
              <div className="flex justify-between items-center py-3 px-3 sm:px-4 bg-white rounded-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-medium text-gray-600">P/E Ratio</span>
                <span className="font-bold text-gray-900 text-base sm:text-lg">{stockData.peRatio}</span>
              </div>
            </div>
          </div>

          {/* 公司描述 */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <div className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">About Apple Inc.</div>
            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {stockData.description}
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base">
              View Full Analysis
            </button>
            <button className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base">
              Add to Watchlist
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
