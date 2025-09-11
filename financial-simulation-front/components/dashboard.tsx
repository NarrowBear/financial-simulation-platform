"use client";

import { Sidebar } from "./sidebar";
import { MarketOverview } from "./market-overview";
import { PortfolioSummary } from "./portfolio-summary";
import { QuickTrade } from "./quick-trade";
import { Orders } from "./orders";
import { LatestNews } from "./latest-news";
import { UserInfo } from "./user-info";

export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧边栏 */}
      <div className="w-64 bg-white shadow-sm">
        <Sidebar />
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* 用户信息 */}
          <UserInfo />
          
          {/* 顶部行 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <MarketOverview />
            <PortfolioSummary />
          </div>

          {/* 中间行 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <QuickTrade />
            <QuickTrade />
            <Orders />
          </div>

          {/* 底部行 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LatestNews />
            <LatestNews />
          </div>
        </div>
      </div>
    </div>
  );
};
