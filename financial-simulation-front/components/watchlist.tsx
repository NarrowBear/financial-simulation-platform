import { Card, CardBody, CardHeader } from "@heroui/card";

interface Stock {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const stocks: Stock[] = [
  {
    symbol: "AAPL",
    price: "145,96",
    change: "+1,34",
    changePercent: "+0,93%",
    isPositive: true,
  },
  {
    symbol: "MSFT",
    price: "296,24",
    change: "+2,58",
    changePercent: "+0,96%",
    isPositive: true,
  },
  {
    symbol: "TSLA",
    price: "280,93",
    change: "-1,84",
    changePercent: "-0,65%",
    isPositive: false,
  },
  {
    symbol: "GOOGL",
    price: "134,36",
    change: "+1,86",
    changePercent: "+0,52%",
    isPositive: true,
  },
  {
    symbol: "AMZN",
    price: "142,43",
    change: "+0,86",
    changePercent: "+9,61%",
    isPositive: true,
  },
];

export default function Watchlist() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Watchlist</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-0">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 pb-3 border-b border-gray-200">
            <div>Symbol</div>
            <div>Price</div>
            <div>Change</div>
            <div>% Change</div>
          </div>
          
          {/* Stock Rows */}
          {stocks.map((stock, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 py-3 text-sm border-b border-gray-100 last:border-b-0">
              <div className="font-medium text-gray-900">{stock.symbol}</div>
              <div className="text-gray-700">{stock.price}</div>
              <div className={`font-medium ${stock.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change}
              </div>
              <div className={`font-medium ${stock.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stock.changePercent}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
