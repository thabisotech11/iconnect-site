"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// Small localStorage-backed helper. Every provider below is a
// thin wrapper around this so cart / wishlist / compare / recently
// viewed all persist across page loads without a backend.
// In production, swap the storage layer for Supabase-synced state
// once a user is signed in (see src/lib/supabase/client.ts).
// ─────────────────────────────────────────────────────────────
function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // storage full or unavailable — fail silently, state still works in-memory
    }
  }, [key, state, hydrated]);

  return [state, setState, hydrated] as const;
}

// ── Cart ─────────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = usePersistentState<CartItem[]>("iconnect:cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const addItem: CartContextValue["addItem"] = useCallback(
    (item, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);
    },
    [setItems]
  );

  const removeItem = useCallback(
    (productId: string) => setItems((prev) => prev.filter((i) => i.productId !== productId)),
    [setItems]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) return removeItem(productId);
      setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
    },
    [setItems, removeItem]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// ── Wishlist ─────────────────────────────────────────────────
interface WishlistContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = usePersistentState<string[]>("iconnect:wishlist", []);

  const toggle = useCallback(
    (productId: string) =>
      setIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId])),
    [setIds]
  );

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  const value = useMemo(() => ({ ids, toggle, has, count: ids.length }), [ids, toggle, has]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

// ── Compare ──────────────────────────────────────────────────
const COMPARE_LIMIT = 3;

interface CompareContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  count: number;
  limit: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = usePersistentState<string[]>("iconnect:compare", []);

  const toggle = useCallback(
    (productId: string) =>
      setIds((prev) => {
        if (prev.includes(productId)) return prev.filter((id) => id !== productId);
        if (prev.length >= COMPARE_LIMIT) return prev;
        return [...prev, productId];
      }),
    [setIds]
  );

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);
  const clear = useCallback(() => setIds([]), [setIds]);

  const value = useMemo(
    () => ({ ids, toggle, has, clear, count: ids.length, limit: COMPARE_LIMIT }),
    [ids, toggle, has, clear]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

// ── Recently viewed ──────────────────────────────────────────
const RECENTLY_VIEWED_LIMIT = 8;

interface RecentlyViewedContextValue {
  ids: string[];
  track: (productId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = usePersistentState<string[]>("iconnect:recently-viewed", []);

  const track = useCallback(
    (productId: string) =>
      setIds((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, RECENTLY_VIEWED_LIMIT)),
    [setIds]
  );

  const value = useMemo(() => ({ ids, track }), [ids, track]);

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}

// ── Combined app provider ───────────────────────────────────
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <RecentlyViewedProvider>{children}</RecentlyViewedProvider>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

/** Convenience: build a CartItem from a Product. */
export function toCartItem(product: Product): Omit<CartItem, "quantity"> {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    condition: product.condition,
    storage: product.selectedStorage,
    color: product.selectedColor,
    gradient: product.gradient,
    category: product.category,
  };
}
