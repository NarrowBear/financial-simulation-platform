import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function QuickTrade() {
  return (
    <Card className="w-full">
      <CardHeader className="text-white rounded-t-lg" style={{ backgroundColor: '#338EF7' }}>
        <h3 className="text-lg font-semibold text-white">Quick Trade</h3>
      </CardHeader>
      <CardBody className="pt-4 space-y-4">
        {/* Symbol Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
          <Input
            placeholder="AAPL"
            className="w-full"
          />
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <Input
            placeholder="10"
            type="number"
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-1 text-white"
            style={{ backgroundColor: '#338EF7' }}
          >
            Buy
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Sell
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
