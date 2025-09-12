"use client";

import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  
  const menuItems = [
    {
      title: "Overview",
      href: "/market",
      icon: "📊",
      isActive: pathname === "/market",
    },
    {
      title: "Watchlist",
      href: "/market/watchlist",
      icon: "📈",
      isActive: pathname === "/market/watchlist",
    },
    {
      title: "Sectors",
      href: "/market/sectors",
      icon: "🏢",
      isActive: pathname === "/market/sectors",
    },
    {
      title: "Screener",
      href: "/market/screener",
      icon: "🔍",
      isActive: pathname === "/market/screener",
    },
    {
      title: "Top Movers",
      href: "/market/top-movers",
      icon: "📈",
      isActive: pathname === "/market/top-movers",
    },
    {
      title: "Calendar",
      href: "/market/calendar",
      icon: "📅",
      isActive: pathname === "/market/calendar",
    },
  ];

  return (
    <Card className={clsx("w-64 h-full", className)}>
      <CardBody className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              as={NextLink}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                item.isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      </CardBody>
    </Card>
  );
};
