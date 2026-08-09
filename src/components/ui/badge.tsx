import { cn } from "@/lib/utils";
import type { ConditionGrade } from "@/lib/types";
import { CONDITION_GRADES } from "@/lib/types";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "positive" | "caution" | "dark";
  className?: string;
}

const toneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-surface text-ink-soft",
  accent: "bg-accent-soft text-accent-deep",
  positive: "bg-positive/10 text-positive",
  caution: "bg-caution/10 text-caution",
  dark: "bg-ink text-canvas",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return <span className={cn("badge", toneClass[tone], className)}>{children}</span>;
}

const conditionTone: Record<ConditionGrade, BadgeProps["tone"]> = {
  Pristine: "accent",
  Excellent: "positive",
  Good: "neutral",
  Fair: "caution",
};

export function ConditionBadge({ condition, className }: { condition: ConditionGrade; className?: string }) {
  return (
    <Badge tone={conditionTone[condition]} className={className}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {CONDITION_GRADES[condition].headline}
    </Badge>
  );
}

export function StockBadge({ quantity, className }: { quantity: number; className?: string }) {
  if (quantity <= 0) {
    return (
      <Badge tone="neutral" className={className}>
        Out of stock
      </Badge>
    );
  }
  if (quantity <= 3) {
    return (
      <Badge tone="caution" className={className}>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" aria-hidden="true" />
        Only {quantity} left
      </Badge>
    );
  }
  return (
    <Badge tone="positive" className={className}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      In stock
    </Badge>
  );
}
