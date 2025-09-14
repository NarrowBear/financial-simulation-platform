import { Card, CardBody, CardHeader } from "@heroui/card";

interface MarketData {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const marketData: MarketData[] = [
  {
    name: "S&P 500",
    value: "4,274.51",
    change: "-32",
    changePercent: "-0.83%",
    isPositive: false,
  },
  {
    name: "Dow Jones",
    value: "33,912.44",
    change: "+338",
    changePercent: "-1.01%",
    isPositive: false,
  },
  {
    name: "Nasdaq",
    value: "13,418.78",
    change: "-29.09",
    changePercent: "+0.22%",
    isPositive: true,
  },
];

export default function MarketOverview() {
  return (
    <Card className="w-full">
      <CardHeader className="text-white rounded-t-lg" style={{ backgroundColor: '#338EF7' }}>
        <h3 className="text-lg font-semibold text-white">Market Overview</h3>
      </CardHeader>
      <CardBody className="pt-4">
        <div className="space-y-4">
          {marketData.map((market) => (
            <div key={market.name} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-600">
                    {market.name}
                  </span>
                  <div className="w-16 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <svg width="48" height="16" viewBox="0 0 48 16" className="w-12 h-4">
                      <path
                        d="M2 12 L8 8 L14 10 L20 6 L26 4 L32 7 L38 5 L44 3"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {market.value}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${market.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {market.change}
                </div>
                <div className={`text-sm ${market.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {market.changePercent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
