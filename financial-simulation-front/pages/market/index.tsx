import MainLayout from "@/layouts/main";
import MarketOverview from "@/components/market-overview";
import WatchlistChart from "@/components/watchlist-chart";
import Watchlist from "@/components/watchlist";
import StockDetailsCard from "@/components/stock-details-card";

export default function MarketPage() {
  return (
    <MainLayout showSubNav={true}>
      {/* Market Overview Cards */}
      <MarketOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Watchlist Chart and Table */}
        <div className="lg:col-span-2 space-y-6">
          <WatchlistChart />
          <Watchlist />
        </div>

        {/* Right Column - Stock Details */}
        <div className="lg:col-span-1">
          <StockDetailsCard />
        </div>
      </div>
    </MainLayout>
  );
}
