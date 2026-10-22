"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconSparkles,
  IconAlertCircle,
  IconArrowRight,
  IconLock,
  IconCircleCheck,
} from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface UpgradePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  featureName?: string;
  currentPlanName?: string;
  suggestedPlanName?: string;
  limitDetails?: {
    used: number;
    max: number;
    resourceName: string;
  };
}

export function UpgradePlanDialog({
  open,
  onOpenChange,
  title = "Plan Upgrade Required",
  description,
  featureName,
  currentPlanName = "Free Trial",
  suggestedPlanName = "Standard Wholesale",
  limitDetails,
}: UpgradePlanDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left space-y-2">
          <div className="mx-auto sm:mx-0 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-1">
            <IconSparkles className="size-6" />
          </div>
          <DialogTitle className="text-lg font-bold font-heading">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            {description ||
              (limitDetails
                ? `You have reached the maximum quota of ${limitDetails.used}/${limitDetails.max} ${limitDetails.resourceName.toLowerCase()} allowed on your current plan. Please upgrade your subscription to unlock additional capacity.`
                : featureName
                ? `The feature "${featureName}" is not available on your current plan. Upgrade to unlock this capability along with premium business tools.`
                : "This action exceeds the limitations of your current subscription tier. Upgrade your plan to continue.")}
          </DialogDescription>
        </DialogHeader>

        <div className="p-3.5 rounded-lg border bg-muted/20 space-y-2.5 my-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Current Plan:</span>
            <Badge variant="outline" className="font-semibold">
              {currentPlanName}
            </Badge>
          </div>

          {limitDetails && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Current Quota Usage:</span>
              <span className="font-mono font-bold text-destructive">
                {limitDetails.used} / {limitDetails.max} {limitDetails.resourceName}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs border-t pt-2">
            <span className="text-muted-foreground">Recommended Tier:</span>
            <span className="font-semibold text-primary flex items-center gap-1">
              <IconCircleCheck className="size-3.5 text-emerald-500" />
              {suggestedPlanName}
            </span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto text-xs"
          >
            Stay on Current Plan
          </Button>
          <Button
            asChild
            size="sm"
            className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold shadow-sm text-xs"
          >
            <Link href="/pricing" onClick={() => onOpenChange(false)}>
              Explore Subscription Plans <IconArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
