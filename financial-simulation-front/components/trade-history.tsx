const TradeHistory = () => {
  const trades = [
    { date: "04/23/2024", symbol: "AAPL", price: "100", profit: "120.00" },
    { date: "04/23/2024", symbol: "AAPL", price: "100", profit: "174.00" },
    { date: "04/22/2024", symbol: "MSFT", price: "150", profit: "200.00" },
    { date: "04/21/2024", symbol: "GOOGL", price: "75", profit: "85.50" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Trade History</h3>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 text-gray-400">Date</th>
              <th className="text-left py-2 text-gray-400">Symbol</th>
              <th className="text-left py-2 text-gray-400">Price</th>
              <th className="text-left py-2 text-gray-400">Profit</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-2 text-gray-300">{trade.date}</td>
                <td className="py-2 text-white">{trade.symbol}</td>
                <td className="py-2 text-white">{trade.price}</td>
                <td className="py-2 text-green-400">{trade.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
