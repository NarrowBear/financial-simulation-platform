const SectorNewsCard = () => {
  const newsItems = [
    {
      id: '1',
      title: 'Tech Stocks Surge Amid Strong Earnings Reports',
      time: '2 hours ago'
    },
    {
      id: '2',
      title: 'Semiconductor Industry Expected to Grow',
      time: '4 hours ago'
    },
    {
      id: '3',
      title: 'Cloud Computing Market Continues Expand',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Sector News</h3>
      
      <div className="space-y-4">
        {newsItems.map((news) => (
          <div key={news.id} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
            <h4 className="font-medium text-white mb-2 line-clamp-2">
              {news.title}
            </h4>
            <div className="text-sm text-gray-400">
              {news.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorNewsCard;
