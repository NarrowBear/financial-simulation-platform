export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Averium",
  description: "Advanced financial simulation and trading platform.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Market",
      href: "/market",
    },
    {
      label: "Portfolio",
      href: "/portfolio",
    },
    {
      label: "Trade",
      href: "/trade",
    },
    {
      label: "Education",
      href: "/education",
    },
    {
      label: "Support",
      href: "/support",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "My Portfolio",
      href: "/portfolio",
    },
    {
      label: "Order History",
      href: "/orders",
    },
    {
      label: "Reports",
      href: "/reports",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Support",
      href: "/support",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
