const PortfolioNews = () => {
  const newsItems = [
    {
      id: '1',
      title: 'Apple Forecasts Strong Revenue Growth for Next Quarter',
      date: 'Nov. 8, 2023'
    },
    {
      id: '2',
      title: 'Amazon Announces Expansion of Its Logistics Network',
      date: 'Nov. 7, 2023'
    },
    {
      id: '3',
      title: 'Tech Stocks Lead Market Rally on Positive Earnings',
      date: 'Nov. 7, 2023'
    },
    {
      id: '4',
      title: 'Apple Forecasts Strong Revenue Growth for Next Quarter',
      date: 'Nov. 2, 2023'
    },
    {
      id: '5',
      title: 'Amazon Announces Expansion of Its Logistics Network',
      date: 'Nov. 3, 2023'
    }
  ];

  return (
    <div className="space-y-6">
      {/* First News Card */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">News</h3>
        <div className="space-y-4">
          {newsItems.slice(0, 3).map((news) => (
            <div key={news.id} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
              <h4 className="font-medium text-white mb-1 line-clamp-2">
                {news.title}
              </h4>
              <div className="text-sm text-gray-400">
                {news.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second News Card */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">News</h3>
        <div className="space-y-4">
          {newsItems.slice(3, 5).map((news) => (
            <div key={news.id} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
              <h4 className="font-medium text-white mb-1 line-clamp-2">
                {news.title}
              </h4>
              <div className="text-sm text-gray-400">
                {news.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioNews;
