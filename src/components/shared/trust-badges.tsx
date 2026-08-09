import { ShieldCheck, BatteryCharging, CalendarCheck, Lock, Truck, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Certified Devices" },
  { icon: BatteryCharging, label: "Battery Health Checked" },
  { icon: CalendarCheck, label: "30-Day Warranty" },
  { icon: Lock, label: "Secure Payments" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: RotateCcw, label: "Money-Back Guarantee" },
] as const;

export function TrustBadgeStrip({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-4",
        className
      )}
    >
      {TRUST_BADGES.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2.5 lg:flex-col lg:items-center lg:text-center lg:gap-2">
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full lg:h-11 lg:w-11",
              dark ? "bg-white/10 text-white" : "bg-accent-soft text-accent-deep"
            )}
          >
            <Icon size={17} aria-hidden="true" />
          </span>
          <span className={cn("text-[13px] font-medium leading-tight", dark ? "text-white/85" : "text-ink-soft")}>
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
