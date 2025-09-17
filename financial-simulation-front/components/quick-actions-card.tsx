import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  PlusIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

const QuickActionsCard = () => {
  const actions = [
    {
      title: "Buy Stock",
      icon: ArrowUpIcon,
      color: "bg-green-500 hover:bg-green-600",
      description: "Purchase shares"
    },
    {
      title: "Sell Stock",
      icon: ArrowDownIcon,
      color: "bg-red-500 hover:bg-red-600",
      description: "Sell shares"
    },
    {
      title: "Market Analysis",
      icon: ChartBarIcon,
      color: "bg-blue-500 hover:bg-blue-600",
      description: "View charts"
    },
    {
      title: "Deposit Funds",
      icon: CurrencyDollarIcon,
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Add money"
    },
    {
      title: "Add to Watchlist",
      icon: PlusIcon,
      color: "bg-orange-500 hover:bg-orange-600",
      description: "Track stocks"
    },
    {
      title: "Refresh Data",
      icon: ArrowPathIcon,
      color: "bg-gray-500 hover:bg-gray-600",
      description: "Update prices"
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`${action.color} text-white rounded-lg p-4 transition-colors duration-200 hover:shadow-md`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionsCard;
