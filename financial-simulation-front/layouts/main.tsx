import Link from "next/link";
import { useRouter } from "next/router";
import { 
  MagnifyingGlassIcon,
  SunIcon,
  UserIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

import { Head } from "./head";
import { Logo } from "@/components/icons";

interface MainLayoutProps {
  children: React.ReactNode;
  showSubNav?: boolean;
  subNavItems?: Array<{ label: string; href: string }>;
}

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Market", href: "/market" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Trade", href: "/trade" },
  { label: "Education", href: "/education" },
  { label: "Support", href: "/support" },
];

const defaultSubNavItems = [
  { label: "Watchlist", href: "/market" },
  { label: "Sectors", href: "/market/sectors" },
  { label: "Screener", href: "/market/screener" },
  { label: "Top Movers", href: "/market/top-movers" },
];

export default function MainLayout({ 
  children, 
  showSubNav = false, 
  subNavItems = defaultSubNavItems 
}: MainLayoutProps) {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className="min-h-screen bg-gray-900">
      <Head />
      
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Logo size={32} className="text-coral-400" />
                <span className="text-xl font-semibold text-white">Averium</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                {mainNavItems.map((item) => {
                  // Check if current path matches the main nav item or any of its sub-pages
                  const isActive = currentPath === item.href || 
                    (item.href === '/market' && currentPath.startsWith('/market'));
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`transition-colors ${
                        isActive 
                          ? 'text-white border-b-2 border-blue-400 pb-1' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-4">
              <MagnifyingGlassIcon className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
              <SunIcon className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
              <UserIcon className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation Tabs (only for Market pages) */}
      {showSubNav && (
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {subNavItems.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      isActive 
                        ? 'border-blue-400 text-blue-400' 
                        : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-[90%] mx-auto py-6">
        {children}
      </main>
    </div>
  );
}
