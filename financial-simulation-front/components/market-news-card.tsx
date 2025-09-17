interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  time: string;
  category: string;
  impact: 'positive' | 'negative' | 'neutral';
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Federal Reserve Holds Interest Rates Steady',
    summary: 'The Fed maintains current rates amid economic uncertainty, signaling cautious approach to monetary policy.',
    source: 'Financial Times',
    time: '2 hours ago',
    category: 'Monetary Policy',
    impact: 'positive'
  },
  {
    id: '2',
    title: 'Tech Stocks Rally on Strong Earnings Reports',
    summary: 'Major technology companies report better-than-expected Q4 results, driving market optimism.',
    source: 'Bloomberg',
    time: '4 hours ago',
    category: 'Earnings',
    impact: 'positive'
  },
  {
    id: '3',
    title: 'Energy Sector Faces Headwinds',
    summary: 'Oil prices decline as global demand concerns persist, affecting energy company valuations.',
    source: 'Reuters',
    time: '6 hours ago',
    category: 'Energy',
    impact: 'negative'
  },
  {
    id: '4',
    title: 'Cryptocurrency Market Shows Volatility',
    summary: 'Bitcoin and other digital assets experience significant price swings amid regulatory uncertainty.',
    source: 'CoinDesk',
    time: '8 hours ago',
    category: 'Crypto',
    impact: 'neutral'
  }
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'positive':
      return 'text-green-600 bg-green-100';
    case 'negative':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const MarketNewsCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Market News</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {newsItems.map((news) => (
          <div key={news.id} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(news.impact)}`}>
                {news.impact}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white mb-1 line-clamp-2">
                  {news.title}
                </h4>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                  {news.summary}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                  <span>•</span>
                  <span className="text-blue-400">{news.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketNewsCard;
