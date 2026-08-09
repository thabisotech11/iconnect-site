// ─────────────────────────────────────────────────────────────
// Shared domain types. These mirror the Supabase schema in
// src/lib/supabase/schema.sql so swapping mock-data.ts for real
// queries is a drop-in change, not a rewrite.
// ─────────────────────────────────────────────────────────────

export type DeviceCategory =
  | "iPhone"
  | "Samsung Galaxy"
  | "iPad"
  | "Apple Watch"
  | "AirPods"
  | "MacBook"
  | "Accessories";

export type ConditionGrade = "Pristine" | "Excellent" | "Good" | "Fair";

export interface ConditionInfo {
  grade: ConditionGrade;
  headline: string;
  description: string;
}

export const CONDITION_GRADES: Record<ConditionGrade, ConditionInfo> = {
  Pristine: {
    grade: "Pristine",
    headline: "Looks brand new",
    description: "No visible wear under close inspection. Full original-feel finish.",
  },
  Excellent: {
    grade: "Excellent",
    headline: "Barely-there wear",
    description: "Minor signs of use visible only in direct light. Feels like new in hand.",
  },
  Good: {
    grade: "Good",
    headline: "Light, visible wear",
    description: "Noticeable light scuffs or marks that don't affect performance.",
  },
  Fair: {
    grade: "Fair",
    headline: "Great value",
    description: "Clearly used with visible wear. Fully functional and thoroughly tested.",
  },
};

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: "Apple" | "Samsung";
  category: DeviceCategory;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  condition: ConditionGrade;
  batteryHealth?: number;
  storageOptions?: string[];
  colorOptions?: string[];
  selectedStorage?: string;
  selectedColor?: string;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  specs: ProductSpec[];
  accessoriesIncluded: string[];
  warrantyDays: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  gradient: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  condition: ConditionGrade;
  storage?: string;
  color?: string;
  quantity: number;
  gradient: string;
  category: DeviceCategory;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

export type OrderStatus =
  | "Processing"
  | "Quality Check"
  | "Dispatched"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  timestamp: string | null;
  complete: boolean;
}

export interface Order {
  id: string;
  reference: string;
  placedAt: string;
  status: OrderStatus;
  total: number;
  items: CartItem[];
  trackingSteps: OrderTrackingStep[];
  shippingAddress: Address;
  courierTrackingNumber?: string;
}

export type TradeInGoal = "trade-in" | "sell";

export interface TradeInAnswer {
  question: string;
  answer: string;
  deduction: number;
}

export interface TradeInQuote {
  deviceCategory: DeviceCategory;
  model: string;
  storage: string;
  baseValue: number;
  answers: TradeInAnswer[];
  estimatedValue: number;
  goal: TradeInGoal;
}

export interface RepairService {
  id: string;
  device: DeviceCategory;
  issue: string;
  priceFrom: number;
  turnaround: string;
}

export interface FinancingPlan {
  id: string;
  months: number;
  label: string;
  interestFree: boolean;
  description: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface AdminStat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
}
