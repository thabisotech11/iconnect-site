import type { DeviceCategory } from "@/lib/types";

export type CategoryIconName =
  | "smartphone"
  | "tablet"
  | "watch"
  | "headphones"
  | "laptop"
  | "cable";

export interface CategoryMeta {
  icon: CategoryIconName;
  gradient: string;
  ring: string;
}

/**
 * One signature gradient per device category. This is the site's visual
 * shorthand in place of product photography (swap for real Cloudinary
 * images via <ProductImage> once inventory photos exist) — and it doubles
 * as a scan aid: every iPhone card reads "blue" at a glance, every MacBook
 * reads "graphite", etc.
 */
export const CATEGORY_META: Record<DeviceCategory, CategoryMeta> = {
  iPhone: {
    icon: "smartphone",
    gradient: "linear-gradient(135deg, #2E6BFF 0%, #0A2FA8 100%)",
    ring: "#2E6BFF",
  },
  "Samsung Galaxy": {
    icon: "smartphone",
    gradient: "linear-gradient(135deg, #6C5CE7 0%, #2E1F8F 100%)",
    ring: "#6C5CE7",
  },
  iPad: {
    icon: "tablet",
    gradient: "linear-gradient(135deg, #17A5C7 0%, #0A5570 100%)",
    ring: "#17A5C7",
  },
  "Apple Watch": {
    icon: "watch",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #B7325C 100%)",
    ring: "#FF6B6B",
  },
  AirPods: {
    icon: "headphones",
    gradient: "linear-gradient(135deg, #B8BEC8 0%, #5B6270 100%)",
    ring: "#8B93A1",
  },
  MacBook: {
    icon: "laptop",
    gradient: "linear-gradient(135deg, #4B5563 0%, #111827 100%)",
    ring: "#4B5563",
  },
  Accessories: {
    icon: "cable",
    gradient: "linear-gradient(135deg, #34D399 0%, #047857 100%)",
    ring: "#34D399",
  },
};
