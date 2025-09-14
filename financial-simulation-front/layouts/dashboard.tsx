import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { 
  ChartBarIcon, 
  BriefcaseIcon, 
  ListBulletIcon, 
  Cog6ToothIcon,
  UserIcon
} from "@heroicons/react/24/outline";

import { Head } from "./head";
import { Navbar } from "@/components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: ChartBarIcon,
    isActive: true,
  },
  {
    label: "My Portfolio",
    href: "/portfolio",
    icon: BriefcaseIcon,
    isActive: false,
  },
  {
    label: "Order History",
    href: "/orders",
    icon: ListBulletIcon,
    isActive: false,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: ChartBarIcon,
    isActive: false,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
    isActive: false,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex h-screen bg-gray-50">
      <Head />
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">fin</span>
            </div>
            <span className="font-bold text-xl">fin</span>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  as={NextLink}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.isActive 
                      ? 'bg-gray-100 text-blue-600 font-medium' 
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
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
