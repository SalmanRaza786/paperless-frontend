import {
  IconLayoutDashboard,
  IconSparkles,
  IconRocket,
  IconWorld,
  IconBuildingStore,
  IconReceipt2,
  IconUsers,
  IconShieldLock,
  type Icon,
} from "@tabler/icons-react";

export type Workspace = {
  name: string;
  plan: string;
  icon: Icon;
};

export const workspaces: Workspace[] = [
  { name: "Paperless OS", plan: "Enterprise", icon: IconSparkles },
  { name: "Lahore Central", plan: "Main Warehouse", icon: IconRocket },
  { name: "Karachi Hub", plan: "Distribution Hub", icon: IconWorld },
];

export type NavChild = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url?: string;
  icon?: Icon;
  badge?: string;
  items?: NavChild[];
  permissions?: string[]; // Allowed permissions (e.g. ["users:view", "users:manage"])
  roles?: string[]; // Allowed tenant roles (e.g. ["Admin"])
  superadminOnly?: boolean;
};

export type SidebarGroup = {
  label: string;
  items: NavItem[];
  superadminOnly?: boolean;
};

/**
 * Dedicated Sidebar Navigation Configuration.
 * Manage all sidebar tabs, groups, and sub-menus here independently.
 */
export const sidebarNavigation: SidebarGroup[] = [
  {
    label: "Dashboards",
    items: [
      { title: "Overview", url: "/dashboard", icon: IconLayoutDashboard },
    ],
  },
  {
    label: "Organization",
    items: [
      {
        title: "Shops & Branches",
        url: "/branches",
        icon: IconBuildingStore,
        permissions: ["branches:view", "branches:create", "branches:edit", "branches:delete"],
        roles: ["Admin"],
      },
      {
        title: "Users",
        url: "/team",
        icon: IconUsers,
        permissions: ["users:view", "users:create", "users:edit", "users:delete"],
        roles: ["Admin"],
      },
      {
        title: "Roles & Permissions",
        url: "/roles",
        icon: IconShieldLock,
        permissions: ["roles:view", "roles:create", "roles:edit", "roles:delete"],
        roles: ["Admin"],
      },
    ],
  },

  {
    label: "Super Admin",
    superadminOnly: true,
    items: [
      { title: "Businesses", url: "/admin/tenants", icon: IconBuildingStore },
      { title: "Subscription Plans", url: "/admin/plans", icon: IconReceipt2 },
    ],
  },
];


