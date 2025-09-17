import MainLayout from "@/layouts/main";
import PortfolioSummaryCard from "@/components/portfolio-summary-card";
import QuickActionsCard from "@/components/quick-actions-card";
import PerformanceChartCard from "@/components/performance-chart-card";
import RecentActivityCard from "@/components/recent-activity-card";
import MarketNewsCard from "@/components/market-news-card";

export default function HomePage() {
  return (
    <MainLayout>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Portfolio and Performance */}
        <div className="lg:col-span-2 space-y-6">
          <PortfolioSummaryCard />
          <PerformanceChartCard />
        </div>

        {/* Right Column - Quick Actions and Activity */}
        <div className="lg:col-span-2 space-y-6">
          <QuickActionsCard />
          <RecentActivityCard />
        </div>
      </div>

      {/* Bottom Row - Market News */}
      <div className="mt-6">
        <MarketNewsCard />
      </div>
    </MainLayout>
  );
}
