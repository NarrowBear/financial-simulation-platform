const OpenOrders = () => {
  const orders = [
    { orderId: "1103", symbol: "AAPL", side: "Buy", quantity: "150" },
    { orderId: "1104", symbol: "MSFT", side: "Sell", quantity: "100" },
    { orderId: "1105", symbol: "GOOGL", side: "Buy", quantity: "50" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Open Orders</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 text-gray-400">Order ID</th>
              <th className="text-left py-2 text-gray-400">Symbol</th>
              <th className="text-left py-2 text-gray-400">Side</th>
              <th className="text-left py-2 text-gray-400">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
                <td className="py-2 text-white">{order.orderId}</td>
                <td className="py-2 text-white">{order.symbol}</td>
                <td className={`py-2 ${order.side === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>
                  {order.side}
                </td>
                <td className="py-2 text-white">{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpenOrders;
