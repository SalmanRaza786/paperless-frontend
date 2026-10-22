"use client";

import { useAuth } from "@/context/auth-context";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { overviewStats } from "@/data";
import {
  IconBuildingStore,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";

const PLAN_NAMES: Record<string, string> = {
  free_trial: "14-Day Free Evaluation",
  basic: "Basic Retail Plan",
  standard: "Standard Wholesale Plan",
  enterprise: "Enterprise Plan",
};

export default function DashboardPage() {
  const { user, tenant } = useAuth();

  const greetingName = user?.full_name || "Merchant";
  const businessName = tenant?.name || (user?.is_superadmin ? "Platform Management" : "My Business");
  const planDisplay = tenant?.plan_tier ? (PLAN_NAMES[tenant.plan_tier] || tenant.plan_tier) : "Free Evaluation";

  // If logged in under any business tenant (or regular user), metrics start clean at zero
  const isBusiness = Boolean(tenant || !user?.is_superadmin);

  const displayStats = isBusiness
    ? [
        {
          label: "Total Revenue",
          value: "Rs. 0",
          change: 0,
          trend: "up" as const,
          hint: "First billing cycle",
        },
        {
          label: "New Customers",
          value: "0",
          change: 0,
          trend: "up" as const,
          hint: "No customers yet",
        },
        {
          label: "Active Accounts",
          value: "0",
          change: 0,
          trend: "up" as const,
          hint: "0 active khata accounts",
        },
        {
          label: "Churn Rate",
          value: "0.0%",
          change: 0,
          trend: "down" as const,
          hint: "Zero churn",
        },
      ]
    : overviewStats;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title={`Welcome back, ${greetingName} 👋`}
          description={`Here's what's happening with ${businessName} today.`}
        />

        {tenant && (
          <div className="flex items-center gap-2 rounded-xl border bg-card/60 p-2.5 px-3.5 shadow-xs shrink-0">
            <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <IconBuildingStore className="size-4" />
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">{tenant.name}</span>
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-primary/30 text-primary bg-primary/5">
                  {tenant.role_name || "Owner"}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                <IconShieldCheck className="size-3 text-emerald-500" />
                <span>{planDisplay}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>
    </div>
  );
}
