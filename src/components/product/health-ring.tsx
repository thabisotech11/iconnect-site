"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HealthRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  className?: string;
}

/**
 * The site's signature motif: a circular progress ring modelled on the
 * battery-health readout every device is graded on. Used at hero scale,
 * on the product gallery, and (small) on cards — the same shape carries
 * the certification story everywhere it appears.
 */
export function HealthRing({
  value,
  size = 96,
  strokeWidth = 8,
  label,
  sublabel,
  color = "rgb(var(--accent))",
  className,
}: HealthRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-line"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && <span className="text-lg font-bold leading-none text-ink">{label}</span>}
          {sublabel && <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-ink-faint">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}
