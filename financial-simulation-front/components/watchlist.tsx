"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const stocks: Stock[] = [
  { symbol: "AAPL", name: "Apple inc.", price: 145.96, change: 1.34, changePercent: 0.93 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 296.24, change: 2.58, changePercent: 0.96 },
  { symbol: "TSLA", name: "Tesla inc.", price: 280.93, change: -1.84, changePercent: -0.65 },
  { symbol: "GOOGL", name: "Alphabet inc.", price: 134.36, change: 1.86, changePercent: 0.52 },
  { symbol: "AMZN", name: "Amazon com inc.", price: 142.43, change: 0.86, changePercent: 9.61 },
];

export const Watchlist = () => {
  return (
    <Card className="w-full shadow-xl rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl" style={{ backgroundColor: '#FFFFFF' }}>
      <CardHeader className="pb-6 px-8 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Watchlist</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="overflow-hidden rounded-xl">
          <Table aria-label="Stock watchlist" className="w-full">
            <TableHeader>
              <TableColumn className="text-xs font-semibold text-gray-500 pb-4 uppercase tracking-wider">Symbol</TableColumn>
              <TableColumn className="text-xs font-semibold text-gray-500 pb-4 uppercase tracking-wider text-right hidden sm:table-cell">Price</TableColumn>
              <TableColumn className="text-xs font-semibold text-gray-500 pb-4 uppercase tracking-wider text-right">Change</TableColumn>
              <TableColumn className="text-xs font-semibold text-gray-500 pb-4 uppercase tracking-wider text-right">% Change</TableColumn>
            </TableHeader>
            <TableBody>
              {stocks.map((stock, index) => (
                <TableRow 
                  key={stock.symbol} 
                  className={`hover:bg-gray-50 transition-colors duration-200 ${index !== stocks.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <TableCell className="py-4 sm:py-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-bold text-gray-600">{stock.symbol.charAt(0)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-gray-900 text-base sm:text-lg truncate">{stock.symbol}</div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-tight truncate">{stock.name}</div>
                        <div className="sm:hidden text-sm font-bold text-gray-900 mt-1">${stock.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 sm:py-6 text-right hidden sm:table-cell">
                    <div className="font-bold text-gray-900 text-base sm:text-lg">${stock.price.toFixed(2)}</div>
                  </TableCell>
                  <TableCell className="py-4 sm:py-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className={`text-base sm:text-lg ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                        {stock.change > 0 ? "▲" : "▼"}
                      </span>
                      <span className={`font-bold text-base sm:text-lg ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 sm:py-6 text-right">
                    <span className={`font-bold text-base sm:text-lg ${stock.changePercent > 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
