/**
 * Central navigation export.
 * Re-exports dedicated sidebar and navbar configurations.
 */
export * from "./sidebar";
export * from "./navbar";

// Aliases for backward compatibility
export { sidebarNavigation as navGroups } from "./sidebar";
export type { SidebarGroup as NavGroup } from "./sidebar";
