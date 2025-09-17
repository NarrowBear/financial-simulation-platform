interface CompanyData {
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

const companiesData: CompanyData[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    price: "$11.18",
    change: "+0.1%",
    changePercent: "+0.1%",
    volume: "356.60T",
    marketCap: "308.63Z B",
    pe: "2.07 T",
    weekHighLow: "3.56 T",
    isPositive: true,
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp",
    price: "$18.43",
    change: "+0.3%",
    changePercent: "+0.3%",
    volume: "169,780",
    marketCap: "287,292 M",
    pe: "2.30 B",
    weekHighLow: "6.54 B",
    isPositive: true,
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    price: "$10.48",
    change: "-0.6%",
    changePercent: "-0.6%",
    volume: "179,912",
    marketCap: "233,4183 M",
    pe: "30.13 E",
    weekHighLow: "10.12 B",
    isPositive: false,
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corp",
    price: "$21.99",
    change: "+0.3%",
    changePercent: "+0.3%",
    volume: "107.94T",
    marketCap: "221.799 M",
    pe: "151.0C",
    weekHighLow: "3.25 B",
    isPositive: true,
  },
  {
    symbol: "META",
    company: "Meta Platforms",
    price: "$18.71",
    change: "+0.5%",
    changePercent: "+0.5%",
    volume: "36.750",
    marketCap: "174,948 M",
    pe: "23.5 M",
    weekHighLow: "33.7 L",
    isPositive: true,
  },
];

export default function SectorsTable() {
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
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">52W IHL7</th>
            </tr>
          </thead>
          <tbody>
            {companiesData.map((company, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{company.symbol}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-300">{company.company}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="font-medium text-white">{company.price}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className={`font-medium ${company.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {company.changePercent}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{company.volume}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{company.marketCap}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{company.pe}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="text-sm text-gray-400">{company.weekHighLow}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
