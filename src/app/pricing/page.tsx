"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconCheck,
  IconSparkles,
  IconBuildingStore,
  IconArrowRight,
  IconArrowLeft,
  IconHelpCircle,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { planService, PublicPlan } from "@/services/plan.service";

const DEFAULT_TIERS: PublicPlan[] = [
  {
    id: 1,
    slug: "free_trial",
    name: "Free Trial",
    badge_label: "14-Day Evaluation",
    description: "Full-feature evaluation for any Pakistani business.",
    price_monthly: 0,
    price_yearly: 0,
    trial_days: 14,
    is_highlighted: false,
    sort_order: 1,
    features: [
      "1 Shop / Branch location",
      "2 Staff user accounts",
      "Complete Thermal POS & barcode scanning",
      "Real-time Inventory tracking",
      "Customer & Supplier Khata ledger",
      "No credit card required",
    ],
  },
  {
    id: 2,
    slug: "basic",
    name: "Basic Retail",
    badge_label: "Small Retailers",
    description: "For single retail shops, marts, and pharmacies.",
    price_monthly: 3500,
    price_yearly: 2800,
    trial_days: 14,
    is_highlighted: false,
    sort_order: 2,
    features: [
      "1 Shop / Branch location",
      "3 Staff user accounts (Cashier, Admin)",
      "Unlimited sales invoices & products",
      "WhatsApp digital receipt delivery",
      "Standard expense & cash register tracking",
      "Standard customer khata balance",
      "Email & WhatsApp support",
    ],
  },
  {
    id: 3,
    slug: "standard",
    name: "Standard Wholesale",
    badge_label: "Most Popular",
    description: "For wholesale dealers, stockists, and distributors.",
    price_monthly: 7500,
    price_yearly: 6000,
    trial_days: 14,
    is_highlighted: true,
    sort_order: 3,
    features: [
      "2 Warehouses / Godowns included",
      "10 Staff user accounts with RBAC roles",
      "Multi-tier wholesale & retail pricing lists",
      "Salesman order booking & route dispatch",
      "Complete khata with 30/60/90 days aging analysis",
      "Batch, serial number & expiry date tracking",
      "Inter-warehouse stock transfer slips",
      "Priority phone & WhatsApp support",
    ],
  },
  {
    id: 4,
    slug: "enterprise",
    name: "Enterprise",
    badge_label: "Large Chains",
    description: "For retail chains, supermarkets, and large stockists.",
    price_monthly: 15000,
    price_yearly: 12000,
    trial_days: 14,
    is_highlighted: false,
    sort_order: 4,
    features: [
      "Unlimited branch shops & warehouses",
      "Unlimited staff user accounts & custom permissions",
      "FBR digital tax & POS integration (NTN/STRN)",
      "Centralized multi-branch inventory & consolidated ledgers",
      "Automated WhatsApp bulk customer payment reminders",
      "Dedicated account manager & on-site training",
      "Custom reporting & API access",
    ],
  },
];

const faqs = [
  {
    q: "Kya 14-day free trial ke liye credit card zaroori hai?",
    a: "Nahi, bilkul nahi! Aap baghair kisi credit card ya payment ke foran apna business register kar ke 14 days ke liye mukammal features istemal kar sakte hain.",
  },
  {
    q: "Kya mein bad mein apna plan change kar sakta hun?",
    a: "Jee haan, aap kabhi bhi apne portal ki settings se apna plan upgrade ya downgrade kar sakte hain. Aap ka stock aur khata data bilkul mehfooz rehta hai.",
  },
  {
    q: "Kya ye Pakistani thermal printers aur barcode scanners ke sath kaam karta hai?",
    a: "Jee haan, Paperless OS tamam standard 80mm aur 58mm thermal printers (USB, Bluetooth, Wi-Fi) aur USB/Wireless 1D/2D barcode scanners ko support karta hai.",
  },
  {
    q: "Customer Khata aur WhatsApp invoice delivery kaise kaam karti hai?",
    a: "Jab aap koi invoice generate karte hain, to system automatically customer ke khata mein udhaar/vasooli record kar deta hai aur 1-click se unke mobile par WhatsApp bill aur payment reminder bhej deta hai.",
  },
  {
    q: "FBR POS integration kis plan mein shamil hai?",
    a: "FBR digital tax invoicing aur Tier-1 retailer integration Enterprise plan mein shamil hai, jahan aap ke NTN aur STRN ke mutabiq direct tax verification hoti hai.",
  },
];

import { useAuth } from "@/context/auth-context";

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<PublicPlan[]>(DEFAULT_TIERS);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    planService
      .getPublicPlans()
      .then((data) => {
        if (data && data.length > 0) {
          setPlans(data);
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_TIERS
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

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-foreground font-semibold">
              Pricing Plans
            </Link>
          </nav>

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
                  <Link href="/register?plan=free_trial">
                    Start Free Trial <IconArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Title */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <IconSparkles className="size-3.5" /> Simple, Transparent PKR Pricing
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight font-heading sm:text-5xl">
              Select Your Plan to Register Your Business
            </h1>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground">
              Choose the tier that matches your trade scale. After selecting a plan, you will complete your business registration with Email OTP verification.
            </p>

            {/* Monthly / Yearly Switch */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Label
                htmlFor="billing"
                className={cn(
                  "text-sm cursor-pointer",
                  !yearly ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                Monthly Billing
              </Label>
              <Switch
                id="billing"
                checked={yearly}
                onCheckedChange={setYearly}
              />
              <Label
                htmlFor="billing"
                className={cn(
                  "text-sm cursor-pointer",
                  yearly ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                Yearly Billing
              </Label>
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
              >
                Save 20%
              </Badge>
            </div>
          </div>

          {/* Dynamic Tier Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {plans.map((tier) => {
              const price = yearly ? tier.price_yearly : tier.price_monthly;
              const ctaText =
                tier.price_monthly === 0
                  ? "Start 14-Day Free Trial"
                  : `Choose ${tier.name}`;

              return (
                <Card
                  key={tier.id || tier.slug}
                  className={cn(
                    "relative flex flex-col justify-between border bg-card/60 backdrop-blur-xs transition-all",
                    tier.is_highlighted &&
                      "border-2 border-primary shadow-xl ring-2 ring-primary/20 lg:-mt-2 lg:mb-2 bg-card"
                  )}
                >
                  {tier.is_highlighted && (
                    <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 bg-primary text-primary-foreground font-semibold px-3 py-0.5 text-xs shadow-sm">
                      {tier.badge_label || "Most Popular"}
                    </Badge>
                  )}

                  <div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold font-heading">
                          {tier.name}
                        </CardTitle>
                        {!tier.is_highlighted && tier.badge_label && (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">
                            {tier.badge_label}
                          </Badge>
                        )}
                      </div>
                      {tier.description && (
                        <CardDescription className="text-xs mt-1">
                          {tier.description}
                        </CardDescription>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-5">
                      <div className="flex items-baseline gap-1 py-1 border-b">
                        <span className="text-3xl font-extrabold tracking-tight font-mono">
                          Rs. {price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tier.price_monthly === 0 ? ` / ${tier.trial_days || 14} days` : "/month"}
                        </span>
                      </div>

                      <ul className="space-y-2.5 text-xs">
                        {tier.features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <IconCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                            <span className="leading-tight text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>

                  <CardFooter className="pt-4 border-t bg-muted/20">
                    <Button
                      asChild
                      className={cn(
                        "w-full font-semibold",
                        tier.is_highlighted
                          ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      <Link href={`/register?plan=${tier.slug}`}>
                        {ctaText} <IconArrowRight className="size-4 ml-1.5" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* FAQs Accordion */}
          <div className="mx-auto w-full max-w-3xl space-y-6 pt-10">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight font-heading">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-muted-foreground">
                Common questions about pricing, Pakistan trade features, and subscription.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-sm font-semibold text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="py-8 border-t bg-muted/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconBuildingStore className="size-4 text-primary" />
            <span className="font-semibold text-foreground">Paperless Business OS</span>
            <span>· Cloud Multi-Tenant Platform for Pakistan</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/login" className="hover:text-foreground">
              Login
            </Link>
            <Link href="/register" className="hover:text-foreground">
              Register Business
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
