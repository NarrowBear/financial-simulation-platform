import { useState } from "react";

interface TopMoverStock {
  symbol: string;
  company: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  isPositive: boolean;
}

const gainersData: TopMoverStock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    price: "$165.23",
    change: "+2.85",
    changePercent: "+1.76%",
    volume: "98,432,100",
    isPositive: true,
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corporat.",
    price: "$286.71",
    change: "+5.39",
    changePercent: "+2.21%",
    volume: "25,765,400",
    isPositive: true,
  },
  {
    symbol: "AMZN",
    company: "Amazon.com, inc.",
    price: "$129.69",
    change: "+2.81",
    changePercent: "+2.55%",
    volume: "51,967,200",
    isPositive: true,
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corporation",
    price: "$245.88",
    change: "+6.12",
    changePercent: "+1.48%",
    volume: "38,091,100",
    isPositive: true,
  },
  {
    symbol: "FB",
    company: "Meta Platforms, Inc.",
    price: "$211.15",
    change: "+3.07",
    changePercent: "+3.58%",
    volume: "16,245,800",
    isPositive: true,
  },
  {
    symbol: "TSLA",
    company: "Tesla, Inc.",
    price: "$181.60",
    change: "+4.41",
    changePercent: "+3.58%",
    volume: "22,876,300",
    isPositive: true,
  },
  {
    symbol: "GOOGL",
    company: "Alphabet inc.",
    price: "$142.16",
    change: "+3.58",
    changePercent: "+3.58%",
    volume: "1,987,600",
    isPositive: true,
  },
  {
    symbol: "JPM",
    company: "JPMorgan Chase & Co.",
    price: "$152.34",
    change: "+2.65",
    changePercent: "+1.77%",
    volume: "13,654,700",
    isPositive: true,
  },
];

const losersData: TopMoverStock[] = [
  {
    symbol: "WMT",
    company: "Walmart Inc.",
    price: "$145.23",
    change: "-2.85",
    changePercent: "-1.76%",
    volume: "18,432,100",
    isPositive: false,
  },
  {
    symbol: "JNJ",
    company: "Johnson & Johnson",
    price: "$156.71",
    change: "-3.39",
    changePercent: "-2.21%",
    volume: "15,765,400",
    isPositive: false,
  },
  {
    symbol: "PG",
    company: "Procter & Gamble",
    price: "$139.69",
    change: "-2.81",
    changePercent: "-2.55%",
    volume: "11,967,200",
    isPositive: false,
  },
  {
    symbol: "KO",
    company: "Coca-Cola Company",
    price: "$55.88",
    change: "-1.12",
    changePercent: "-1.48%",
    volume: "8,091,100",
    isPositive: false,
  },
  {
    symbol: "PFE",
    company: "Pfizer Inc.",
    price: "$31.15",
    change: "-1.07",
    changePercent: "-3.58%",
    volume: "6,245,800",
    isPositive: false,
  },
  {
    symbol: "VZ",
    company: "Verizon Communications",
    price: "$41.60",
    change: "-1.41",
    changePercent: "-3.58%",
    volume: "12,876,300",
    isPositive: false,
  },
  {
    symbol: "T",
    company: "AT&T Inc.",
    price: "$22.16",
    change: "-0.58",
    changePercent: "-3.58%",
    volume: "1,987,600",
    isPositive: false,
  },
  {
    symbol: "XOM",
    company: "Exxon Mobil Corporation",
    price: "$102.34",
    change: "-2.65",
    changePercent: "-1.77%",
    volume: "13,654,700",
    isPositive: false,
  },
];

const mostActiveData: TopMoverStock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    price: "$165.23",
    change: "+2.85",
    changePercent: "+1.76%",
    volume: "98,432,100",
    isPositive: true,
  },
  {
    symbol: "TSLA",
    company: "Tesla, Inc.",
    price: "$181.60",
    change: "+4.41",
    changePercent: "+3.58%",
    volume: "87,876,300",
    isPositive: true,
  },
  {
    symbol: "AMZN",
    company: "Amazon.com, inc.",
    price: "$129.69",
    change: "+2.81",
    changePercent: "+2.55%",
    volume: "71,967,200",
    isPositive: true,
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corporation",
    price: "$245.88",
    change: "+6.12",
    changePercent: "+1.48%",
    volume: "68,091,100",
    isPositive: true,
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corporat.",
    price: "$286.71",
    change: "+5.39",
    changePercent: "+2.21%",
    volume: "55,765,400",
    isPositive: true,
  },
  {
    symbol: "GOOGL",
    company: "Alphabet inc.",
    price: "$142.16",
    change: "+3.58",
    changePercent: "+3.58%",
    volume: "41,987,600",
    isPositive: true,
  },
  {
    symbol: "FB",
    company: "Meta Platforms, Inc.",
    price: "$211.15",
    change: "+3.07",
    changePercent: "+3.58%",
    volume: "36,245,800",
    isPositive: true,
  },
  {
    symbol: "JPM",
    company: "JPMorgan Chase & Co.",
    price: "$152.34",
    change: "+2.65",
    changePercent: "+1.77%",
    volume: "33,654,700",
    isPositive: true,
  },
];

const tabData = {
  gainers: gainersData,
  losers: losersData,
  mostActive: mostActiveData,
};

export default function TopMoversTable() {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers' | 'mostActive'>('gainers');
  const currentData = tabData[activeTab];

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8 px-6">
          {[
            { key: 'gainers', label: 'Gainers' },
            { key: 'losers', label: 'Losers' },
            { key: 'mostActive', label: 'Most Active' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'gainers' | 'losers' | 'mostActive')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Symbol</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Company Name</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Price</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Change</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">% Change</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Volume</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((stock, index) => (
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
                    {stock.change}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-medium ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.changePercent}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{stock.volume}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
