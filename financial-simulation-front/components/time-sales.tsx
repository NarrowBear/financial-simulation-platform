const TimeSales = () => {
  const sales = [
    { time: "13:64:40", price: "174.10", size: "200" },
    { time: "13:64:35", price: "174.15", size: "150" },
    { time: "13:64:30", price: "174.05", size: "300" },
    { time: "13:64:25", price: "174.20", size: "100" },
    { time: "13:64:20", price: "174.00", size: "250" },
    { time: "13:64:15", price: "174.25", size: "180" },
    { time: "13:64:10", price: "174.12", size: "220" },
    { time: "13:64:05", price: "174.18", size: "170" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Time & Sales</h3>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 text-gray-400">Time</th>
              <th className="text-left py-2 text-gray-400">Price</th>
              <th className="text-left py-2 text-gray-400">Size</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-2 text-gray-300">{sale.time}</td>
                <td className="py-2 text-green-400">{sale.price}</td>
                <td className="py-2 text-white">{sale.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSales;
