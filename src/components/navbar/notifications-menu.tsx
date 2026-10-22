"use client";

import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { recentActivity } from "@/data";

export function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label="Notifications"
        >
          <IconBell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[calc(100vw-1rem)] sm:w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          <Badge variant="secondary">3 new</Badge>
        </div>
        <DropdownMenuSeparator />
        {recentActivity.slice(0, 4).map((a) => (
          <DropdownMenuItem key={a.id} className="items-start gap-3 py-2.5">
            <Avatar className="size-8">
              <AvatarImage src={a.avatar} alt={a.user} />
              <AvatarFallback>{a.user.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 gap-0.5">
              <p className="line-clamp-2 whitespace-normal text-sm leading-snug">
                <span className="font-medium">{a.user}</span> {a.action}{" "}
                <span className="font-medium">{a.target}</span>
              </p>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center text-sm font-medium">
          <Link href="/notifications">View all notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
