import Link from "next/link";
import { IconBuildingStore, IconSparkles } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      {/* Left Column: Interactive Form Stage */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <IconBuildingStore className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                Paperless OS
              </span>
              <span className="text-[10px] text-muted-foreground font-medium -mt-1">
                Business OS for Pakistan
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            ← Back to Website
          </Link>
        </header>

        {/* Center Container for Forms */}
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-lg">{children}</div>
        </div>

        {/* Bottom subtle copyright */}
        <footer className="text-xs text-muted-foreground pt-4">
          © {new Date().getFullYear()} Paperless Business OS · All rights reserved.
        </footer>
      </div>

      {/* Right Column: High-Impact Visual Banner */}
      <div className="relative hidden overflow-hidden bg-zinc-950 lg:flex flex-col justify-between p-12 text-white">
        {/* Ambient Gradients */}
        <div
          className="absolute inset-0 opacity-90 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 120% at 100% 0%, var(--primary, #3b82f6) 0%, transparent 50%), radial-gradient(120% 120% at 0% 100%, #10b981 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px] pointer-events-none" />

        {/* Top Banner Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <Badge
            variant="outline"
            className="text-xs font-medium text-white/90 border-white/20 bg-white/10 backdrop-blur-md px-3 py-1"
          >
            <IconSparkles className="size-3.5 mr-1.5 text-amber-300" />
            Next-Gen Cloud ERP & POS
          </Badge>
          <span className="text-xs text-white/60 font-mono">
            Shah Alam · Bolton Market · Raja Bazaar
          </span>
        </div>

        {/* Middle Testimonial / Proposition */}
        <div className="relative z-10 my-auto py-12 space-y-6">
          <blockquote className="space-y-4">
            <p className="text-2xl sm:text-3xl font-semibold leading-snug tracking-tight text-white/95">
              “Paperless OS has completely transformed our wholesale and retail operations. Real-time godown stock tracking, Urdu thermal receipts, and instant WhatsApp billing saved us hours every single day.”
            </p>
            <footer className="text-sm text-white/70">
              <strong className="text-white font-medium">Haji Tariq Mahmood</strong> — Central Traders, Wholesale Market Lahore
            </footer>
          </blockquote>

          {/* Quick Feature Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-[11px] rounded-full bg-white/10 px-3 py-1 border border-white/15 text-white/90 backdrop-blur-xs">
              ⚡ Thermal POS (Urdu & English)
            </span>
            <span className="text-[11px] rounded-full bg-white/10 px-3 py-1 border border-white/15 text-white/90 backdrop-blur-xs">
              📦 Multi-Godown Stock Transfers
            </span>
            <span className="text-[11px] rounded-full bg-white/10 px-3 py-1 border border-white/15 text-white/90 backdrop-blur-xs">
              📱 WhatsApp Invoices & Khata
            </span>
            <span className="text-[11px] rounded-full bg-white/10 px-3 py-1 border border-white/15 text-white/90 backdrop-blur-xs">
              🛡️ FBR Digital Tax Ready
            </span>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm text-white/70">
          <div>
            <div className="text-2xl font-bold text-white tabular-nums font-mono">
              Rs. 500M+
            </div>
            <div className="text-xs text-white/60 mt-0.5">Invoices Processed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white tabular-nums font-mono">
              15,000+
            </div>
            <div className="text-xs text-white/60 mt-0.5">Wholesale Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white tabular-nums font-mono">
              99.9%
            </div>
            <div className="text-xs text-white/60 mt-0.5">POS Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}
