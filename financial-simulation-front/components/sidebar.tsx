"use client";

import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: "📊",
      isActive: true,
    },
    {
      title: "My Portfolio",
      href: "/portfolio",
      icon: "📁",
      isActive: false,
    },
    {
      title: "Order History",
      href: "/orders",
      icon: "📋",
      isActive: false,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: "📈",
      isActive: false,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "⚙️",
      isActive: false,
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
