/**
 * Dedicated Navbar (Top Navigation) Configuration.
 * Manage search settings, user profile navigation, notifications, and topbar controls independently.
 */

export interface NavbarUserMenuItem {
  title: string;
  url: string;
  iconName?: string;
  badge?: string;
}

export const navbarConfig = {
  search: {
    placeholder: "Search…",
    hotkey: "K",
    enabled: true,
  },
  notifications: {
    enabled: true,
    maxDisplay: 4,
  },
  userMenu: [
    { title: "Profile", url: "/profile", icon: "user" },
    { title: "Settings", url: "/settings", icon: "settings" },
    { title: "Billing", url: "/settings", icon: "billing" },
  ],
} as const;
