"use client";

import * as React from "react";
import Link from "next/link";
import { IconShieldLock, IconArrowLeft } from "@tabler/icons-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Verifying access rights…</div>;
  }

  // Strictly enforce super-admin privilege for all /admin routes
  if (!user?.is_superadmin) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-destructive/30 shadow-lg">
          <CardHeader className="pb-3">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <IconShieldLock className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl font-bold">Access Restricted</CardTitle>
            <CardDescription className="text-sm">
              Super Administrator privileges are required to access this area.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <p className="text-xs text-muted-foreground">
              Your account does not have platform-level administrative rights to view or manage subscription plans and business registrations.
            </p>
            <Button asChild className="w-full gap-2">
              <Link href="/dashboard">
                <IconArrowLeft className="h-4 w-4" />
                Return to Business Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
