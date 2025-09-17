const PortfolioOverviewCards = () => {
  const cards = [
    {
      title: "Portfolio Value",
      value: "$120,500",
      icon: "💰",
      color: "text-white"
    },
    {
      title: "Cash",
      value: "$15,200",
      icon: "💵",
      color: "text-white"
    },
    {
      title: "Today's Return",
      value: "+1,320",
      icon: "📈",
      color: "text-green-400"
    },
    {
      title: "Performance",
      value: "$8.375",
      icon: "📊",
      color: "text-green-400",
      hasChart: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">{card.icon}</div>
            {card.hasChart && (
              <div className="w-16 h-8">
                <svg width="64" height="32" viewBox="0 0 64 32" className="w-full h-full">
                  <polyline
                    points="2,28 8,24 14,26 20,22 26,20 32,23 38,21 44,19 50,17 56,15 62,13"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-400 mb-1">{card.title}</div>
          <div className={`text-2xl font-bold ${card.color}`}>
            {card.value}
          </div>
          {card.hasChart && (
            <div className="text-xs text-gray-500 mt-2">Advcinra</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PortfolioOverviewCards;
