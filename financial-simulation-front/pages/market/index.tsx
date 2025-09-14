import MarketLayout from "@/layouts/market";
import Watchlist from "@/components/watchlist";
import StockDetails from "@/components/stock-details";
import StockChart from "@/components/stock-chart";

export default function MarketOverview() {
  const stockData = {
    symbol: "AAPL",
    price: "172.45",
    change: "▲ 0.98",
    changePercent: "+0.57%",
    previousClose: "171.47",
    open: "170.83",
    high: "173.31",
    marketCap: "2.72T",
    peRatio: "29.5",
    companyName: "Apple Inc.",
    description: "Apple Inc., designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, iPod touch, and other Apple-branded and third-party accessories."
  };

  return (
    <MarketLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Watchlist and Chart */}
        <div className="space-y-6">
          <Watchlist />
          <StockChart />
        </div>

        {/* Right Column - Stock Details */}
        <div>
          <StockDetails {...stockData} />
        </div>
      </div>
    </MarketLayout>
  );
}
