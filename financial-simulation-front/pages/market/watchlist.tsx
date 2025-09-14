import { useState } from "react";
import MarketLayout from "@/layouts/market";
import Watchlist from "@/components/watchlist";
import StockDetails from "@/components/stock-details";
import StockChart from "@/components/stock-chart";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const stockData = {
    symbol: "AAPL",
    price: "145,86",
    change: "+1,34",
    changePercent: "+0,33%",
    previousClose: "144,52",
    open: "143,80",
    high: "146,20",
    dayRange: "143,10 - 146,20",
    marketCap: "2,31T",
    peRatio: "24,7",
    companyName: "Apple",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
  };

  return (
    <MarketLayout>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex justify-end">
          <div className="w-80">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />}
              classNames={{
                inputWrapper: "border-gray-300",
                input: "text-gray-900",
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Watchlist */}
          <div>
            <Watchlist />
          </div>

          {/* Right Column - Stock Details and Chart */}
          <div className="space-y-6">
            <StockDetails {...stockData} />
            <div className="space-y-4">
              <StockChart />
              <div className="flex justify-center">
                <Button
                  style={{ backgroundColor: '#338EF7' }}
                  className="text-white px-8"
                >
                  Key Statistics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketLayout>
  );
}
