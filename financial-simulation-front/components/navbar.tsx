import { useState } from "react";
import { useRouter } from "next/router";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import AuthModal from "@/components/auth-modal";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { UserIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const router = useRouter();
  const currentPath = router.asPath;

  const handleOpenAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="full" position="sticky" className="shadow-lg" style={{ backgroundColor: '#fff' }}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Logo size={120} className="text-coral-500" />
            <p className="font-bold text-coral-500 text-xl">Averium</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-6 justify-start ml-8">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "transition-colors",
                  (item.label === "Home" && currentPath === "/") || 
                  (item.label === "Market" && currentPath.startsWith("/market"))
                    ? "text-blue-600 font-semibold" 
                    : "text-gray-700 hover:text-blue-600 font-normal"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "border border-gray-300",
              input: "text-gray-900 placeholder:text-gray-500",
            }}
            style={{ backgroundColor: '#f9fafb' }}
            placeholder="Search--"
            type="search"
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleOpenAuthModal("login")}
            className="text-gray-700 hover:text-blue-600"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            size="sm"
            onClick={() => handleOpenAuthModal("register")}
            style={{ backgroundColor: '#338EF7' }}
            className="text-white"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <div 
          className="w-8 h-8 bg-transparent border-2 border-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-colors"
          onClick={() => handleOpenAuthModal("login")}
        >
          <UserIcon className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </div>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        
        {/* Mobile Auth Buttons */}
        <div className="mx-4 mt-4 flex flex-col gap-3">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => handleOpenAuthModal("login")}
            className="text-gray-700 hover:text-blue-600 justify-start"
          >
            Sign In
          </Button>
          <Button
            size="lg"
            onClick={() => handleOpenAuthModal("register")}
            style={{ backgroundColor: '#338EF7' }}
            className="text-white justify-start"
          >
            Sign Up
          </Button>
        </div>
      </NavbarMenu>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </HeroUINavbar>
  );
};
