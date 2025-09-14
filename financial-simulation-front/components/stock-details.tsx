import { Card, CardBody, CardHeader } from "@heroui/card";

interface StockDetailsProps {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  previousClose: string;
  open: string;
  high: string;
  dayRange: string;
  marketCap: string;
  peRatio: string;
  companyName: string;
  description: string;
}

export default function StockDetails({
  symbol,
  price,
  change,
  changePercent,
  previousClose,
  open,
  high,
  dayRange,
  marketCap,
  peRatio,
  companyName,
  description,
}: StockDetailsProps) {
  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <div className="space-y-6">
          {/* Stock Header with Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍎</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{companyName} ({symbol})</h1>
              <div className="text-3xl font-bold text-gray-900 mt-1">{price}</div>
              <div className="text-green-600 font-medium text-lg">
                {change} ({changePercent})
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Previous Close</span>
                <span className="font-medium">{previousClose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Open</span>
                <span className="font-medium">{open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High</span>
                <span className="font-medium">{high}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day's Range</span>
                <span className="font-medium">{dayRange}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-medium">{marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">P/E Ratio</span>
                <span className="font-medium">{peRatio}</span>
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{companyName}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
