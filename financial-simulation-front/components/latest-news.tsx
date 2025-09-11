"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";

interface NewsItem {
  title: string;
  timeAgo: string;
}

const newsItems: NewsItem[] = [
  {
    title: "Fed expected to raise interest rates",
    timeAgo: "2h ago",
  },
  {
    title: "Tech stocks rally as market rebounds",
    timeAgo: "4h ago",
  },
  {
    title: "Global all prices decline amid slowdown",
    timeAgo: "5h ago",
  },
];

export const LatestNews = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Latest News</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-3">
          {newsItems.map((item, index) => (
            <div key={index} className="py-2 border-b border-gray-100 last:border-b-0">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {item.title}
              </div>
              <div className="text-xs text-gray-500">{item.timeAgo}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
