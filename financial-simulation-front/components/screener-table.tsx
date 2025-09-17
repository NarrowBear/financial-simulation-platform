interface ScreenerStock {
  symbol: string;
  company: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
  pe: string;
  weekHighLow: string;
  isPositive: boolean;
}

const screenerStocks: ScreenerStock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    price: "$11.18",
    change: "+0.1%",
    changePercent: "+0.1%",
    volume: "3560T",
    marketCap: "308,632.8",
    pe: "27.57",
    weekHighLow: "3.56T",
    isPositive: true,
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp",
    price: "$18.43",
    change: "+0.3%",
    changePercent: "+0.3%",
    volume: "198,700",
    marketCap: "287,292 M",
    pe: "27.57",
    weekHighLow: "6.545",
    isPositive: true,
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    price: "$10.48",
    change: "-0.6%",
    changePercent: "-0.6%",
    volume: "179,981",
    marketCap: "233.4183M",
    pe: "10.18",
    weekHighLow: "10.18",
    isPositive: false,
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corp",
    price: "$21.99",
    change: "+0.3%",
    changePercent: "+0.3%",
    volume: "109,477",
    marketCap: "221,799 M",
    pe: "17.89",
    weekHighLow: "4,253",
    isPositive: true,
  },
  {
    symbol: "META",
    company: "Meta Platforms",
    price: "$19.71",
    change: "+0.5%",
    changePercent: "+0.5%",
    volume: "35,750",
    marketCap: "174,948 M",
    pe: "23.5M",
    weekHighLow: "38.7",
    isPositive: true,
  },
];

export default function ScreenerTable() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-blue-400">Technology</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Symbol</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Company</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Price</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Change %</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Volume</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Market Cap</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">P/E</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">52W HIL</th>
            </tr>
          </thead>
          <tbody>
            {screenerStocks.map((stock, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{stock.symbol}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-300">{stock.company}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="font-medium text-white">{stock.price}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-medium ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.changePercent}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{stock.volume}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{stock.marketCap}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{stock.pe}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{stock.weekHighLow}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
