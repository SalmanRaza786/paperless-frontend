"use client";

import { workspaces } from "@/config/nav";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const active = workspaces[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="select-none cursor-default hover:bg-transparent active:bg-transparent"
        >
          <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <active.icon className="size-5" />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold tracking-tight">
              {active.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {active.plan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
