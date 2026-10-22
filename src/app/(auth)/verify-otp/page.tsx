"use client";

import * as React from "react";
import { useState, useEffect, useRef, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconShieldLock,
  IconMail,
  IconRefresh,
  IconCheck,
  IconSparkles,
  IconAlertCircle,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";

const LENGTH = 6;

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const [verificationId, setVerificationId] = useState<number | null>(null);
  const [destinationEmail, setDestinationEmail] = useState<string>("");
  const [debugOtp, setDebugOtp] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Resend Cooldown Timer
  const [cooldown, setCooldown] = useState<number>(60);
  const [isResending, setIsResending] = useState<boolean>(false);

  useEffect(() => {
    // 1. Get from URL search params
    const vidParam = searchParams.get("vid");
    const emailParam = searchParams.get("email");

    if (vidParam) {
      setVerificationId(Number(vidParam));
    } else if (typeof window !== "undefined") {
      const storedVid = sessionStorage.getItem("paperless_pending_vid");
      if (storedVid) setVerificationId(Number(storedVid));
    }

    if (emailParam) {
      setDestinationEmail(decodeURIComponent(emailParam));
    } else if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("paperless_pending_email");
      if (storedEmail) setDestinationEmail(storedEmail);
    }

    // Check debug otp
    if (typeof window !== "undefined") {
      const storedDebug = sessionStorage.getItem("paperless_debug_otp");
      if (storedDebug) setDebugOtp(storedDebug);
    }
  }, [searchParams]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const code = digits.join("");
  const complete = code.length === LENGTH;

  function setAt(i: number, value: string) {
    setDigits((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function handleChange(i: number, raw: string) {
    if (otpError) setOtpError(null);
    const value = raw.replace(/\D/g, "");
    if (!value) {
      setAt(i, "");
      return;
    }

    // Support pasting full 6-digit code
    if (value.length > 1) {
      const chars = value.slice(0, LENGTH).split("");
      setDigits((prev) => {
        const next = [...prev];
        chars.forEach((c, k) => {
          if (k < LENGTH) next[k] = c;
        });
        return next;
      });
      const last = Math.min(chars.length - 1, LENGTH - 1);
      inputs.current[last]?.focus();
      return;
    }

    setAt(i, value);
    if (i < LENGTH - 1) {
      inputs.current[i + 1]?.focus();
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  }

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!complete) {
      setOtpError("6-digit verification code is required. Please fill all digits.");
      const firstEmpty = digits.findIndex((d) => !d);
      if (firstEmpty !== -1) {
        inputs.current[firstEmpty]?.focus();
      }
      return;
    }
    if (!verificationId) {
      setOtpError("Missing verification session. Please restart registration.");
      return;
    }

    setOtpError(null);
    startTransition(async () => {
      try {
        const res = await authService.verifyRegistrationOtp({
          verification_id: verificationId,
          otp_code: code,
        });

        toast.success(`Welcome to Paperless OS, ${res.user.full_name}!`);

        // Clear pending registration state
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("paperless_pending_vid");
          sessionStorage.removeItem("paperless_pending_email");
          sessionStorage.removeItem("paperless_debug_otp");
        }

        // Navigate to dashboard
        window.location.href = "/dashboard";
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Invalid or expired verification code. Please check and try again.";
        setOtpError(errorMsg);
        toast.error(errorMsg);
      }
    });
  };

  const handleResend = async () => {
    if (cooldown > 0 || !verificationId || isResending) return;

    setOtpError(null);
    setIsResending(true);
    try {
      const res = await authService.resendOtp(verificationId);
      setCooldown(res.resend_available_in || 60);
      setDigits(Array(LENGTH).fill(""));
      inputs.current[0]?.focus();
      if (res.debug_otp) {
        setDebugOtp(res.debug_otp);
        sessionStorage.setItem("paperless_debug_otp", res.debug_otp);
      }
      toast.success(res.message);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to resend code";
      toast.error(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  const handleQuickFillDebug = () => {
    if (!debugOtp) return;
    setOtpError(null);
    const chars = debugOtp.split("");
    setDigits(chars);
    inputs.current[LENGTH - 1]?.focus();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs mb-1">
          <IconShieldLock className="size-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
          Enter Verification Code
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          We have sent a 6-digit confirmation code to{" "}
          <span className="font-semibold text-foreground underline decoration-primary/40 underline-offset-2">
            {destinationEmail || "your email"}
          </span>
          . Please enter it below to activate your business portal.
        </p>
      </div>

      {/* Dev Helper Banner */}
      {debugOtp && (
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 flex items-center justify-between text-xs backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <IconSparkles className="size-4 text-primary shrink-0" />
            <span className="text-foreground font-medium">
              Dev Test OTP:{" "}
              <strong className="font-mono text-sm tracking-widest text-primary ml-1">
                {debugOtp}
              </strong>
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleQuickFillDebug}
            className="h-7 text-xs text-primary font-semibold hover:bg-primary/20"
          >
            Auto Fill
          </Button>
        </div>
      )}

      {/* 6 Digit Inputs Form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <div className="flex justify-between gap-2 sm:gap-3">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={LENGTH}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onFocus={(e) => e.target.select()}
                className={cn(
                  "size-12 sm:size-14 rounded-xl border bg-background text-center text-xl font-bold font-mono tabular-nums shadow-xs outline-none transition-all",
                  otpError
                    ? "border-destructive ring-1 ring-destructive/40 focus:border-destructive focus:ring-destructive/40"
                    : d
                    ? "border-primary bg-primary/5 text-primary focus:border-primary focus:ring-3 focus:ring-primary/25"
                    : "border-input focus:border-primary focus:ring-3 focus:ring-primary/25"
                )}
              />
            ))}
          </div>

          {/* Inline Red Error Message under OTP inputs */}
          {otpError && (
            <p className="text-xs text-destructive font-medium mt-2 flex items-center justify-center gap-1.5 animate-in fade-in-50">
              <IconAlertCircle className="size-4 shrink-0" />
              <span>{otpError}</span>
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90"
          disabled={isPending}
        >
          {isPending ? "Activating Business Portal..." : "Verify & Activate Portal"}
        </Button>
      </form>

      {/* Resend Actions */}
      <div className="space-y-3 pt-2 text-center text-xs text-muted-foreground border-t">
        <div>
          Didn&apos;t receive the code?{" "}
          {cooldown > 0 ? (
            <span className="font-medium text-foreground">
              Resend in <strong className="font-mono text-primary">{cooldown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Change Registration Info
          </Link>
          <span>·</span>
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading verification...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
