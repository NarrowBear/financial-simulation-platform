interface Stock {
  symbol: string;
  company: string;
  lastPrice: string;
  change: string;
  changePercent: string;
  weekHigh: string;
  weekLow: string;
  isPositive: boolean;
}

const stocks: Stock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    lastPrice: "343.89",
    change: "+0.50%",
    changePercent: "+0.51%",
    weekHigh: "54,350",
    weekLow: "64,780",
    isPositive: true,
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp",
    lastPrice: "349.88",
    change: "+0.35%",
    changePercent: "+1.07%",
    weekHigh: "55,120",
    weekLow: "55,150",
    isPositive: true,
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    lastPrice: "391.88",
    change: "+0.040",
    changePercent: "+1.17%",
    weekHigh: "14,330",
    weekLow: "43,245",
    isPositive: true,
  },
  {
    symbol: "AMZN",
    company: "Amazon.com Inc.",
    lastPrice: "363.17",
    change: "-0.52%",
    changePercent: "-0.30%",
    weekHigh: "106,960",
    weekLow: "151,130",
    isPositive: false,
  },
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    lastPrice: "344.58",
    change: "+01.45",
    changePercent: "+3.04%",
    weekHigh: "358.10",
    weekLow: "330.20",
    isPositive: true,
  },
];

export default function Watchlist() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Symbol</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Company</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Last Price</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Change</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">% Change</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">52 Week High:Low</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{stock.symbol}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-300">{stock.company}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="font-medium text-white">{stock.lastPrice}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-medium ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-medium ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.changePercent}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">
                    {stock.weekHigh} - {stock.weekLow}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
