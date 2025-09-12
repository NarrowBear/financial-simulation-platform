"use client";

import { Sidebar } from "./sidebar";
import { Watchlist } from "./watchlist";
import { StockChart } from "./stock-chart";
import { StockDetails } from "./stock-details";

export const WatchlistPage = () => {
  return (
    <div className="flex h-full min-h-screen" style={{ backgroundColor: '#F8F8F8' }}>
      {/* 左侧边栏 */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-100">
        <Sidebar />
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* 页面标题区域 */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Market</h1>
                <p className="text-xl text-gray-600 font-medium">Watchlist</p>
              </div>
              <div className="hidden lg:block">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* 左侧：观察列表 */}
            <div className="lg:col-span-1 order-1 lg:order-1">
              <Watchlist />
            </div>

            {/* 右侧：股票详情 */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <StockDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
