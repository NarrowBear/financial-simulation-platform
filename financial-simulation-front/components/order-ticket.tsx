const OrderTicket = () => {
  const orderData = [
    { cost: "174.14", price: "174.14", size: "100" },
    { cost: "174.14", price: "174.14", size: "100" },
    { cost: "174.14", price: "174.14", size: "100" },
    { cost: "174.14", price: "174.14", size: "100" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Order Ticket</h3>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div className="text-sm text-gray-400 mb-2">Estimated Cost</div>
        <div className="text-2xl font-bold text-white">$17,412.00</div>
        
        <div className="text-sm text-gray-400 mb-2">Fee</div>
        <div className="text-lg font-semibold text-white">$1.00</div>

        <div className="flex items-center space-x-2 pt-4">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Buying Power</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Order Table */}
        <div className="mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Exhausted Cost</th>
                <th className="text-left py-2 text-gray-400">Price</th>
                <th className="text-left py-2 text-gray-400">Current Size</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index} className="border-b border-gray-700 last:border-b-0">
                  <td className="py-2 text-white">{order.cost}</td>
                  <td className="py-2 text-red-400">{order.price}</td>
                  <td className="py-2 text-white">{order.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTicket;
