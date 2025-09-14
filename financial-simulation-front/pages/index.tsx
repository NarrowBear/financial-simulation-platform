import DefaultLayout from "@/layouts/default";
import MarketOverview from "@/components/market-overview";
import PortfolioSummary from "@/components/portfolio-summary";
import QuickTrade from "@/components/quick-trade";
import OrdersTable from "@/components/orders-table";
import LatestNews from "@/components/latest-news";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
        {/* Left Column */}
        <div className="space-y-6">
          <MarketOverview />
          <PortfolioSummary />
          <OrdersTable />
          <LatestNews />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickTrade />
          <LatestNews />
        </div>
      </div>
    </DefaultLayout>
  );
}
