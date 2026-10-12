"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";
import { site } from "@/lib/site";

export type CartLine = { key: string; slug: string; weight?: string; qty: number };
export type ResolvedLine = CartLine & { product: Product; unitPrice: number; lineTotal: number };

type CartCtx = {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  coupon: string | null;
  drawerOpen: boolean;
  toast: string | null;
  add: (slug: string, qty?: number, weight?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "makkah-cart-v1";

export const unitPriceFor = (p: Product, weight?: string) => {
  const w = p.weights?.find((x) => x.label === weight);
  return Math.round(p.price * (w?.factor ?? 1) * 100) / 100;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore the cart from this browser (wrapped: storage can be unavailable).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved?.lines) setRaw(saved.lines);
      if (saved?.coupon) setCoupon(saved.coupon);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines: raw, coupon }));
    } catch {}
  }, [raw, coupon, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((slug: string, qty = 1, weight?: string) => {
    const p = getProduct(slug);
    if (!p) return;
    const w = weight ?? p.weights?.[0]?.label;
    const key = w ? `${slug}__${w}` : slug;
    setRaw((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, slug, weight: w, qty }];
    });
    setToast(`${p.name}${w ? ` (${w})` : ""} added to cart`);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setRaw((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);

  const remove = useCallback((key: string) => setRaw((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setRaw([]), []);

  const applyCoupon = useCallback((code: string) => {
    if (code.trim().toUpperCase() === site.coupon.code) {
      setCoupon(site.coupon.code);
      return true;
    }
    return false;
  }, []);

  const value = useMemo<CartCtx>(() => {
    const lines: ResolvedLine[] = raw
      .map((l) => {
        const product = getProduct(l.slug);
        if (!product) return null;
        const unitPrice = unitPriceFor(product, l.weight);
        return { ...l, product, unitPrice, lineTotal: unitPrice * l.qty };
      })
      .filter(Boolean) as ResolvedLine[];
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    const discount = coupon ? Math.round(subtotal * site.coupon.percent) / 100 : 0;
    const after = subtotal - discount;
    const delivery = lines.length === 0 || after >= site.freeDeliveryOver ? 0 : site.deliveryFee;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      discount,
      delivery,
      total: after + delivery,
      coupon,
      drawerOpen,
      toast,
      add,
      setQty,
      remove,
      clear,
      applyCoupon,
      removeCoupon: () => setCoupon(null),
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [raw, coupon, drawerOpen, toast, add, setQty, remove, clear, applyCoupon]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
