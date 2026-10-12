"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, img, site } from "@/lib/site";

export function FreeDeliveryBar({ amount }: { amount: number }) {
  const left = Math.max(0, site.freeDeliveryOver - amount);
  const pct = Math.min(100, (amount / site.freeDeliveryOver) * 100);
  return (
    <div className="rounded-2xl bg-cream p-4">
      <p className="flex items-center gap-2 text-sm text-ink">
        <Truck size={18} className="text-brand" />
        {left > 0 ? (
          <>Add <b className="text-brand">{formatPrice(left)}</b> more for <b>free delivery</b></>
        ) : (
          <b>Nice! Your order ships free 🎉</b>
        )}
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
        <motion.div className="h-full rounded-full bg-brand" initial={false} animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, setQty, remove, count } = useCart();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeDrawer} />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[91] flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h3 className="font-display text-2xl font-bold">Your cart <span className="text-brand">({count})</span></h3>
              <button onClick={closeDrawer} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full bg-cream transition hover:rotate-90 hover:bg-brand hover:text-white"><X size={20} /></button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-24 w-24 place-items-center rounded-full bg-cream text-brand"><ShoppingBag size={40} /></span>
                <p className="font-display text-xl font-semibold text-ink">Your cart is empty</p>
                <p className="text-muted">Fresh cuts are waiting for you.</p>
                <Link href="/shop" onClick={closeDrawer} className="mt-2 rounded-full bg-brand px-7 py-3 font-display font-semibold uppercase tracking-wide text-white transition hover:bg-ink">Start shopping</Link>
              </div>
            ) : (
              <>
                <div className="px-6 pt-5"><FreeDeliveryBar amount={subtotal} /></div>
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li key={l.key} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80, height: 0 }} className="flex gap-4">
                        <Link href={`/shop/${l.slug}`} onClick={closeDrawer} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image src={img(l.product.image, 200)} alt={l.product.name} fill sizes="80px" className="object-cover" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <p className="font-display font-semibold leading-tight text-ink">{l.product.name}</p>
                            <button onClick={() => remove(l.key)} aria-label="Remove" className="text-muted transition hover:text-brand"><Trash2 size={16} /></button>
                          </div>
                          <p className="text-xs text-muted">{l.weight ?? l.product.unit}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-line">
                              <button onClick={() => setQty(l.key, l.qty - 1)} className="grid h-8 w-8 place-items-center hover:text-brand" aria-label="Decrease"><Minus size={14} /></button>
                              <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                              <button onClick={() => setQty(l.key, l.qty + 1)} className="grid h-8 w-8 place-items-center hover:text-brand" aria-label="Increase"><Plus size={14} /></button>
                            </div>
                            <span className="font-display font-bold text-ink">{formatPrice(l.lineTotal)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-line p-6">
                  <div className="flex justify-between font-display text-lg">
                    <span>Subtotal</span>
                    <b className="text-ink">{formatPrice(subtotal)}</b>
                  </div>
                  <p className="mt-1 text-xs text-muted">Delivery & discounts calculated in cart. Prices include GST.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link href="/cart" onClick={closeDrawer} className="rounded-full border-2 border-ink py-3 text-center font-display font-semibold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white">View cart</Link>
                    <Link href="/cart#checkout" onClick={closeDrawer} className="rounded-full bg-brand py-3 text-center font-display font-semibold uppercase tracking-wide text-white transition hover:bg-brand-dark">Checkout</Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
