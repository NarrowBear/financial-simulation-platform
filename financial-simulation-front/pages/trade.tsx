import MainLayout from "@/layouts/main";
import QuickTrade from "@/components/quick-trade";
import QuickChart from "@/components/quick-chart";
import OrderTicket from "@/components/order-ticket";
import Alerts from "@/components/alerts";
import OpenOrders from "@/components/open-orders";
import TradeHistory from "@/components/trade-history";
import Positions from "@/components/positions";
import TimeSales from "@/components/time-sales";

export default function TradePage() {
  return (
    <MainLayout>
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <QuickTrade />
        <QuickChart />
        <div className="space-y-6">
          <OrderTicket />
          <Alerts />
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <OpenOrders />
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Chart Tagim</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-gray-400">Symbol</th>
                  <th className="text-left py-2 text-gray-400">Side</th>
                  <th className="text-left py-2 text-gray-400">Quantity</th>
                  <th className="text-left py-2 text-gray-400">Price</th>
                  <th className="text-left py-2 text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                  <td className="py-2 text-white">AAPL</td>
                  <td className="py-2 text-green-400">Buy</td>
                  <td className="py-2 text-white">150</td>
                  <td className="py-2 text-white">173.50</td>
                  <td className="py-2 text-white">Open</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <TimeSales />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OpenOrders />
        <TradeHistory />
        <Positions />
      </div>
    </MainLayout>
  );
}
