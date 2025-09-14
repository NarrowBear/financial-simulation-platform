import { Card, CardBody, CardHeader } from "@heroui/card";

export default function PortfolioSummary() {
  const totalValue = "$125,430.25";
  const dailyGain = "+$3,254.17";
  const dailyGainPercent = "+2.69%";

  return (
    <Card className="w-full">
      <CardHeader className="text-white rounded-t-lg" style={{ backgroundColor: '#338EF7' }}>
        <h3 className="text-lg font-semibold text-white">Portfolio Summary</h3>
      </CardHeader>
      <CardBody className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {totalValue}
            </div>
            <div className="text-green-600 font-medium">
              {dailyGain} {dailyGainPercent}
            </div>
          </div>
          <div className="w-24 h-24 relative">
            {/* Donut Chart */}
            <svg width="96" height="96" className="w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="36"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="8"
                strokeDasharray="140 86"
                strokeDashoffset="0"
                transform="rotate(-90 48 48)"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray="80 146"
                strokeDashoffset="-140"
                transform="rotate(-90 48 48)"
              />
            </svg>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
