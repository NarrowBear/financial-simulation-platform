import MainLayout from "@/layouts/main";
import PortfolioOverviewCards from "@/components/portfolio-overview-cards";
import PortfolioBreakdown from "@/components/portfolio-breakdown";
import PortfolioPerformanceMetrics from "@/components/portfolio-performance-metrics";
import PortfolioNews from "@/components/portfolio-news";
import PortfolioHoldingsTable from "@/components/portfolio-holdings-table";

export default function PortfolioPage() {
  return (
    <MainLayout>
      {/* Portfolio Overview Cards */}
      <PortfolioOverviewCards />

      {/* Middle Row - Holdings Breakdown and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Holdings Breakdown */}
        <div className="lg:col-span-1">
          <PortfolioBreakdown />
        </div>

        {/* Performance Metrics */}
        <div className="lg:col-span-1">
          <PortfolioPerformanceMetrics />
        </div>

        {/* News Feed */}
        <div className="lg:col-span-1">
          <PortfolioNews />
        </div>
      </div>

      {/* Bottom Section - Holdings Table */}
      <PortfolioHoldingsTable />
    </MainLayout>
  );
}
