"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconBuildingStore,
  IconReceipt2,
  IconBox,
  IconUsers,
  IconBrandWhatsapp,
  IconShieldCheck,
  IconArrowRight,
  IconCheck,
  IconSparkles,
  IconTruckDelivery,
  IconCalculator,
  IconDeviceDesktop,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { planService, PublicPlan } from "@/services/plan.service";

const DEFAULT_LANDING_PLANS: PublicPlan[] = [
  {
    id: 1,
    slug: "free_trial",
    name: "Free Trial",
    badge_label: "Evaluation",
    description: "14 days unrestricted evaluation for any business.",
    price_monthly: 0,
    price_yearly: 0,
    trial_days: 14,
    is_highlighted: false,
    sort_order: 1,
    features: [
      "1 Shop / Branch",
      "2 Staff User Accounts",
      "Complete Thermal POS & Barcode",
      "Customer Khata Ledger",
    ],
  },
  {
    id: 2,
    slug: "basic",
    name: "Basic Plan",
    badge_label: "Small Retail",
    description: "Ideal for single retail shops, marts, and pharmacies.",
    price_monthly: 3500,
    price_yearly: 2800,
    trial_days: 14,
    is_highlighted: false,
    sort_order: 2,
    features: [
      "1 Shop / Branch",
      "3 Staff User Accounts",
      "Unlimited Invoices & Products",
      "WhatsApp Invoice Delivery",
    ],
  },
  {
    id: 3,
    slug: "standard",
    name: "Standard Plan",
    badge_label: "Wholesale & Distribution",
    description: "For wholesale dealers, stockists, and multi-godown traders.",
    price_monthly: 7500,
    price_yearly: 6000,
    trial_days: 14,
    is_highlighted: true,
    sort_order: 3,
    features: [
      "2 Warehouses / Godowns",
      "10 Staff User Accounts",
      "Multi-Tier Wholesale Pricing",
      "Full Khata with Aging Reports",
      "Salesman Order Route Dispatch",
    ],
  },
  {
    id: 4,
    slug: "enterprise",
    name: "Enterprise",
    badge_label: "Large Enterprises",
    description: "For retail supermarket chains and national distributors.",
    price_monthly: 15000,
    price_yearly: 12000,
    trial_days: 14,
    is_highlighted: false,
    sort_order: 4,
    features: [
      "Unlimited Branches & Godowns",
      "Unlimited Staff Accounts",
      "FBR Digital Tax Integration",
      "Dedicated 24/7 Account Manager",
    ],
  },
];

export default function LandingHomePage() {
  const { isAuthenticated } = useAuth();
  const [plans, setPlans] = React.useState<PublicPlan[]>(DEFAULT_LANDING_PLANS);

  React.useEffect(() => {
    planService
      .getPublicPlans()
      .then((data) => {
        if (data && data.length > 0) {
          setPlans(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load public plans:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                <IconBuildingStore className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-tight">
                  Paperless OS
                </span>
                <span className="text-[10px] text-muted-foreground font-medium -mt-1">
                  Business OS for Pakistan
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#solutions" className="hover:text-foreground transition-colors">
              Wholesale & Retail
            </a>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing Plans
            </Link>
            <a href="#trust" className="hover:text-foreground transition-colors">
              Why Us
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <Button asChild size="sm" className="bg-primary text-primary-foreground font-medium shadow-sm">
                <Link href="/dashboard">
                  Dashboard <IconArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="font-medium">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary text-primary-foreground font-medium shadow-sm">
                  <Link href="/pricing">
                    Start Free Trial <IconArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b bg-radial from-primary/5 via-background to-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-6 shadow-xs">
            <IconSparkles className="size-3.5" />
            Designed specifically for Pakistani Distributors, Wholesalers & Retailers
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading max-w-4xl mx-auto leading-tight">
            Transform Your Trading Business into a Modern,{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              Paperless Engine
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            High-speed Urdu & English thermal POS, multi-warehouse stock tracking, WhatsApp invoicing,
            customer khata ledger with aging analysis, and FBR-ready billing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isAuthenticated ? (
              <Button asChild size="lg" className="w-full sm:w-auto h-11 px-8 text-base bg-primary text-primary-foreground font-semibold shadow-md">
                <Link href="/dashboard">
                  Open Business Dashboard
                  <IconArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="w-full sm:w-auto h-11 px-8 text-base bg-primary text-primary-foreground font-semibold shadow-md">
                <Link href="/pricing">
                  Start 14-Day Free Trial
                  <IconArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-11 px-6 text-base">
              <Link href="/pricing">View Pricing Plans (PKR)</Link>
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <IconCheck className="size-3.5 text-emerald-500" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <IconCheck className="size-3.5 text-emerald-500" /> Instant Email OTP Setup
            </span>
            <span className="flex items-center gap-1.5">
              <IconCheck className="size-3.5 text-emerald-500" /> Cancel Anytime
            </span>
          </div>

          {/* Quick Mock Dashboard Snapshot */}
          <div className="mt-12 max-w-4xl mx-auto rounded-2xl border bg-card/60 p-4 shadow-xl backdrop-blur-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-4 rounded-xl bg-background border">
                <span className="text-xs text-muted-foreground font-medium">Today&apos;s Sales</span>
                <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  Rs. 485,250
                </p>
                <span className="text-[11px] text-muted-foreground">142 Invoices Generated</span>
              </div>
              <div className="p-4 rounded-xl bg-background border">
                <span className="text-xs text-muted-foreground font-medium">Customer Receivables (Khata)</span>
                <p className="text-2xl font-bold font-mono text-foreground mt-1">
                  Rs. 1,240,000
                </p>
                <span className="text-[11px] text-blue-600 dark:text-blue-400">18 WhatsApp reminders sent</span>
              </div>
              <div className="p-4 rounded-xl bg-background border">
                <span className="text-xs text-muted-foreground font-medium">Low Stock Alerts</span>
                <p className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
                  7 Items
                </p>
                <span className="text-[11px] text-muted-foreground">Auto-purchase draft ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section id="features" className="py-20 border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="outline" className="mb-3">
              Comprehensive Modules
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl">
              Everything Pakistani Businesses Need to Scale
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              Engineered specifically for local trade workflows, multiple godowns, and wholesale credit cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-5 border bg-card/50 hover:border-primary/50 transition-colors">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <IconReceipt2 className="size-5" />
              </div>
              <h3 className="text-lg font-semibold font-heading">High-Speed POS & Thermal Receipts</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Lightning-fast checkout with barcode scanner support, 80mm & 58mm thermal printing in Urdu & English, and WhatsApp invoice delivery.
              </p>
            </Card>

            <Card className="p-5 border bg-card/50 hover:border-primary/50 transition-colors">
              <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <IconBox className="size-5" />
              </div>
              <h3 className="text-lg font-semibold font-heading">Multi-Warehouse & Godown Stock</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Track inventory across multiple shops and godowns in real-time. Serial number, batch number, and expiry date management with inter-branch transfers.
              </p>
            </Card>

            <Card className="p-5 border bg-card/50 hover:border-primary/50 transition-colors">
              <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <IconCalculator className="size-5" />
              </div>
              <h3 className="text-lg font-semibold font-heading">Digital Khata & Party Ledgers</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Full customer and vendor ledger with debit/credit balance, credit limits, 30/60/90 days aging analysis, and 1-click WhatsApp payment reminders.
              </p>
            </Card>

            <Card className="p-5 border bg-card/50 hover:border-primary/50 transition-colors">
              <div className="size-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <IconTruckDelivery className="size-5" />
              </div>
              <h3 className="text-lg font-semibold font-heading">Wholesale Pricing & Dispatch</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Multi-tier pricing (Wholesale, Retail, Special Customer rate), salesman delivery routes, loading sheet generation, and order booking app integration.
              </p>
            </Card>

            <Card className="p-5 border bg-card/50 hover:border-primary/50 transition-colors">
              <div className="size-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <IconShieldCheck className="size-5" />
              </div>
              <h3 className="text-lg font-semibold font-heading">FBR Digital Tax Compliance</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                NTN, STRN, standard sales tax, further tax (3%), and digital invoicing ready for integration with Pakistani taxation systems.
              </p>
            </Card>

            <Card className="p-5 border bg-card/50 hover:border-primary/50 transition-colors">
              <div className="size-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <IconUsers className="size-5" />
              </div>
              <h3 className="text-lg font-semibold font-heading">Staff RBAC & Audit Trails</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Granular permissions for Cashier, Salesman, Accountant, and Warehouse Manager. Every invoice modification and discount is logged securely.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Interactive Pricing Plans */}
      <section id="pricing" className="py-20 border-b bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="outline" className="mb-3">
              Transparent PKR Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl">
              Choose the Perfect Plan for Your Business
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              All plans include a 14-day full feature trial. No credit card required to start.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const isHighlight = plan.is_highlighted;
              const isBasic = plan.slug === "basic";
              const isEnterprise = plan.slug === "enterprise";
              const isFreeTrial = plan.price_monthly === 0;

              // Color accents
              const badgeClass = isBasic
                ? "text-emerald-600 dark:text-emerald-400"
                : isEnterprise
                ? "text-purple-600 dark:text-purple-400"
                : isHighlight
                ? "text-primary"
                : "text-muted-foreground";

              const checkClass = isBasic
                ? "text-emerald-500"
                : isEnterprise
                ? "text-purple-500"
                : "text-primary";

              const ctaButtonClass = isHighlight
                ? "w-full mt-6 bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                : "w-full mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/80";

              const ctaText = isFreeTrial
                ? "Start Free Trial"
                : `Select ${plan.name.replace(/ Plan$/, "")}`;

              const defaultBadgeLabel = isFreeTrial
                ? "Evaluation"
                : isBasic
                ? "Small Retail"
                : isHighlight
                ? "Wholesale & Distribution"
                : isEnterprise
                ? "Large Enterprises"
                : plan.badge_label || "Business Plan";

              const topPillBadge = isHighlight ? (plan.badge_label || "Wholesalers") : null;

              return (
                <Card
                  key={plan.id || plan.slug}
                  className={cn(
                    "flex flex-col justify-between p-6 border bg-card transition-all",
                    isHighlight &&
                      "border-2 border-primary relative shadow-lg ring-1 ring-primary/20"
                  )}
                >
                  {topPillBadge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                      {topPillBadge}
                    </div>
                  )}

                  <div>
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wider",
                        badgeClass
                      )}
                    >
                      {defaultBadgeLabel}
                    </span>
                    <h3 className="text-xl font-bold font-heading mt-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">
                      {plan.description || "Comprehensive solution for your business operations."}
                    </p>

                    <div className="my-6">
                      <span className="text-3xl font-bold font-mono">
                        Rs. {plan.price_monthly.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {isFreeTrial
                          ? ` / ${plan.trial_days || 14} days`
                          : " / month"}
                      </span>
                    </div>

                    {/* DYNAMIC BULLETED FEATURES LIST */}
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {(plan.features || []).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <IconCheck
                            className={cn("size-3.5 shrink-0", checkClass)}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className={ctaButtonClass}>
                    <Link href={`/register?plan=${plan.slug}`}>{ctaText}</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Trust & Markets Section */}
      <section id="trust" className="py-16 border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Built for Major Commercial Markets Across Pakistan
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-muted-foreground/80">
            <span className="px-3 py-1.5 rounded-lg bg-muted/50 border">Shah Alam Market, Lahore</span>
            <span className="px-3 py-1.5 rounded-lg bg-muted/50 border">Bolton Market, Karachi</span>
            <span className="px-3 py-1.5 rounded-lg bg-muted/50 border">Raja Bazaar, Rawalpindi</span>
            <span className="px-3 py-1.5 rounded-lg bg-muted/50 border">Karkhano Market, Peshawar</span>
            <span className="px-3 py-1.5 rounded-lg bg-muted/50 border">Ghanta Ghar Bazaar, Faisalabad</span>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="mt-auto py-10 bg-muted/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconBuildingStore className="size-4 text-primary" />
            <span className="font-semibold text-foreground">Paperless Business OS</span>
            <span>· Cloud Multi-Tenant Platform for Pakistan</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-foreground">
              Login
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Register Business
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing Plans
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
