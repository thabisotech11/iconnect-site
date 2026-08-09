import { Smartphone, Tablet, Watch, Headphones, Laptop, Cable } from "lucide-react";
import type { DeviceCategory } from "@/lib/types";
import type { CategoryIconName } from "@/lib/category-meta";
import { cn } from "@/lib/utils";

const ICONS: Record<CategoryIconName, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  smartphone: Smartphone,
  tablet: Tablet,
  watch: Watch,
  headphones: Headphones,
  laptop: Laptop,
  cable: Cable,
};

const CATEGORY_ICON: Record<DeviceCategory, CategoryIconName> = {
  iPhone: "smartphone",
  "Samsung Galaxy": "smartphone",
  iPad: "tablet",
  "Apple Watch": "watch",
  AirPods: "headphones",
  MacBook: "laptop",
  Accessories: "cable",
};

const SIZE_MAP = {
  sm: { box: "h-16 w-16 rounded-2xl", icon: 22 },
  md: { box: "aspect-square w-full rounded-3xl", icon: 40 },
  lg: { box: "aspect-square w-full rounded-4xl", icon: 72 },
} as const;

interface ProductImageProps {
  category: DeviceCategory;
  gradient: string;
  name: string;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

/**
 * Stand-in for real product photography. Every device category gets one
 * consistent gradient + icon treatment so the shop grid stays instantly
 * scannable by category. Swap for Cloudinary photography via next/image
 * once real inventory shots exist — see README "Images & Cloudinary".
 */
export function ProductImage({ category, gradient, name, size = "md", className }: ProductImageProps) {
  const Icon = ICONS[CATEGORY_ICON[category]];
  const { box, icon } = SIZE_MAP[size];

  return (
    <div
      className={cn("relative flex shrink-0 items-center justify-center overflow-hidden", box, className)}
      style={{ backgroundImage: gradient }}
      role="img"
      aria-label={`${name} — product image placeholder`}
    >
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <Icon size={icon} className="relative text-white/90" strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}
