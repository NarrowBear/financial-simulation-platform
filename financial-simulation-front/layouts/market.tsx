import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  ChartBarIcon, 
  ListBulletIcon, 
  BuildingOfficeIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";

import { Head } from "./head";
import { Navbar } from "@/components/navbar";

interface MarketLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    label: "Overview",
    href: "/market",
    icon: ChartBarIcon,
  },
  {
    label: "Watchlist",
    href: "/market/watchlist",
    icon: ListBulletIcon,
  },
  {
    label: "Sectors",
    href: "/market/sectors",
    icon: BuildingOfficeIcon,
  },
  {
    label: "Screener",
    href: "/market/screener",
    icon: FunnelIcon,
  },
  {
    label: "Top Movers",
    href: "/market/top-movers",
    icon: ArrowTrendingUpIcon,
  },
  {
    label: "Calendar",
    href: "/market/calendar",
    icon: CalendarIcon,
  },
];

export default function MarketLayout({ children }: MarketLayoutProps) {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className="relative flex flex-col h-screen bg-gray-50">
      <Head />
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
