const Positions = () => {
  const positions = [
    { symbol: "AAPL", marketValue: "$4,850.00", pnl: "120.0", size: "200" },
    { symbol: "MSFT", marketValue: "$3,336.00", pnl: "-330.0", size: "100" },
    { symbol: "GOOGL", marketValue: "$2,150.00", pnl: "85.5", size: "50" },
    { symbol: "AMZN", marketValue: "$1,800.00", pnl: "-45.2", size: "25" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Positions</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 text-gray-400">Position</th>
              <th className="text-left py-2 text-gray-400">Market Value</th>
              <th className="text-left py-2 text-gray-400">P&L</th>
              <th className="text-left py-2 text-gray-400">Size</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-2 text-white">{position.symbol}</td>
                <td className="py-2 text-white">{position.marketValue}</td>
                <td className={`py-2 ${parseFloat(position.pnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {position.pnl}
                </td>
                <td className="py-2 text-white">{position.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
