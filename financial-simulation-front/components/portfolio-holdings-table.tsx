interface Holding {
  symbol: string;
  company: string;
  quantity: string;
  avgPrice: string;
  lastPrice: string;
  change: string;
  changePercent: string;
  marketValue: string;
  portfolioPercent: string;
  isPositive: boolean;
}

const holdings: Holding[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    quantity: "$15,300",
    avgPrice: "$18.00",
    lastPrice: "$14,300",
    change: "+0.8%",
    changePercent: "+0.8%",
    marketValue: "$240,856",
    portfolioPercent: "+18.4%",
    isPositive: true,
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp",
    quantity: "$15,060",
    avgPrice: "$16.25",
    lastPrice: "$13,825",
    change: "+1.1%",
    changePercent: "+1.1%",
    marketValue: "$145,285",
    portfolioPercent: "+17.5%",
    isPositive: true,
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    quantity: "$14,305",
    avgPrice: "$34.25",
    lastPrice: "$20,054",
    change: "+7.0%",
    changePercent: "+7.0%",
    marketValue: "$264,90",
    portfolioPercent: "+13.8%",
    isPositive: true,
  },
  {
    symbol: "AMZN",
    company: "Amazon.com Inc.",
    quantity: "$18,250",
    avgPrice: "$36.80",
    lastPrice: "$26,559",
    change: "-1.7%",
    changePercent: "-1.7%",
    marketValue: "$40,440",
    portfolioPercent: "+3.10%",
    isPositive: true,
  },
  {
    symbol: "JNJ",
    company: "Johnson & Johnson",
    quantity: "$23,530",
    avgPrice: "$29.90",
    lastPrice: "$28,180",
    change: "+0.8%",
    changePercent: "+0.8%",
    marketValue: "$360,00",
    portfolioPercent: "",
    isPositive: true,
  },
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    quantity: "$1,395",
    avgPrice: "$0.95",
    lastPrice: "$1,340",
    change: "",
    changePercent: "",
    marketValue: "$24,90",
    portfolioPercent: "",
    isPositive: true,
  },
];

export default function PortfolioHoldingsTable() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Holdings</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
            Show All
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Symbol</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Company</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Quantity</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Avg Price</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Last Price</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Change</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Market Value</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">% of Portfolio</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{holding.symbol}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-300">{holding.company}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="font-medium text-white">{holding.quantity}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-gray-400">{holding.avgPrice}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-gray-400">{holding.lastPrice}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-medium ${holding.change ? (holding.isPositive ? 'text-green-400' : 'text-red-400') : 'text-gray-400'}`}>
                    {holding.change || '-'}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="font-medium text-white">{holding.marketValue}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-medium ${holding.portfolioPercent ? (holding.isPositive ? 'text-green-400' : 'text-red-400') : 'text-gray-400'}`}>
                    {holding.portfolioPercent || '-'}
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
