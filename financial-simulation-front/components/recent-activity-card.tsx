interface Activity {
  id: string;
  type: 'buy' | 'sell' | 'dividend' | 'deposit';
  symbol: string;
  quantity: number;
  price: string;
  total: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'buy',
    symbol: 'AAPL',
    quantity: 10,
    price: '$343.89',
    total: '$3,438.90',
    time: '2 hours ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'sell',
    symbol: 'TSLA',
    quantity: 5,
    price: '$344.58',
    total: '$1,722.90',
    time: '4 hours ago',
    status: 'completed'
  },
  {
    id: '3',
    type: 'dividend',
    symbol: 'MSFT',
    quantity: 0,
    price: '$0.75',
    total: '$37.50',
    time: '1 day ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'buy',
    symbol: 'GOOGL',
    quantity: 3,
    price: '$391.88',
    total: '$1,175.64',
    time: '2 days ago',
    status: 'completed'
  },
  {
    id: '5',
    type: 'deposit',
    symbol: 'CASH',
    quantity: 0,
    price: '$0.00',
    total: '$5,000.00',
    time: '3 days ago',
    status: 'completed'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'buy':
      return '📈';
    case 'sell':
      return '📉';
    case 'dividend':
      return '💰';
    case 'deposit':
      return '💳';
    default:
      return '📊';
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'buy':
      return 'text-green-600 bg-green-100';
    case 'sell':
      return 'text-red-600 bg-red-100';
    case 'dividend':
      return 'text-blue-600 bg-blue-100';
    case 'deposit':
      return 'text-purple-600 bg-purple-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const RecentActivityCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-white">
                  {activity.type === 'buy' ? 'Bought' : 
                   activity.type === 'sell' ? 'Sold' :
                   activity.type === 'dividend' ? 'Dividend' : 'Deposited'}
                </span>
                {activity.symbol !== 'CASH' && (
                  <span className="text-sm font-medium text-gray-400">{activity.symbol}</span>
                )}
                {activity.quantity > 0 && (
                  <span className="text-sm text-gray-400">({activity.quantity} shares)</span>
                )}
              </div>
              <div className="text-sm text-gray-400">{activity.time}</div>
            </div>

            <div className="text-right">
              <div className="font-medium text-white">{activity.total}</div>
              {activity.price !== '$0.00' && activity.symbol !== 'CASH' && (
                <div className="text-sm text-gray-400">@ {activity.price}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
