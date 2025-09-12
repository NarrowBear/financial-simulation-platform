"use client";

import { Sidebar } from "./sidebar";
import { Watchlist } from "./watchlist";
import { StockChart } from "./stock-chart";
import { StockDetails } from "./stock-details";

export const MarketPage = () => {
  return (
    <div className="flex h-full bg-gray-50">
      {/* 左侧边栏 */}
      <div className="w-64 bg-white shadow-sm">
        <Sidebar />
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Market</h1>
            <p className="text-gray-600">Watchlist</p>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：观察列表和图表 */}
            <div className="lg:col-span-2 space-y-6">
              <Watchlist />
              <StockChart />
            </div>

            {/* 右侧：股票详情 */}
            <div className="lg:col-span-1">
              <StockDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
