export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Unity Giving",
  description: "Collective Compassion, Unified Giving.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Explore",
      href: "/explore",
    },
    {
      label: "Profile",
      href: "/user-profile",
    },
  ],
  navMenuItems: [
    {
      label: "Create Campaign",
      href: "/campaign",
    },
    {
      label: "Profile",
      href: "/user-profile",
    },
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Settings",
      href: "/user-profile",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Briankim254",
    twitter: "#",
    docs: "https://nextui.org",
    discord: "#",
    campaign: "/campaign",
  },
};
