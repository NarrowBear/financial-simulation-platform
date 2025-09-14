import { Card, CardBody, CardHeader } from "@heroui/card";

interface NewsItem {
  title: string;
  date?: string;
}

const newsItems: NewsItem[] = [
  { title: "Headlines on Financial Market" },
  { title: "Investors Eye Key Economic Indicators" },
  { title: "Tech Stocks Rally Amid Strong Earnings" },
  { title: "Global Markets React to Policy Changes", date: "MAY 24" },
];

export default function LatestNews() {
  return (
    <Card className="w-full">
      <CardHeader className="text-white rounded-t-lg" style={{ backgroundColor: '#338EF7' }}>
        <h3 className="text-lg font-semibold text-white">Latest News</h3>
      </CardHeader>
      <CardBody className="pt-4">
        <div className="space-y-3">
          {newsItems.map((item, index) => (
            <div key={index} className="py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-start gap-2">
                {item.date && (
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                    {item.date} -
                  </span>
                )}
                <p className="text-sm text-gray-900">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
