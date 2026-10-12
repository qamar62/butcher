"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { WhatsappIcon } from "@/components/Social";
import { FreeDeliveryBar } from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";
import { formatPrice, img, site } from "@/lib/site";

export default function CartPage() {
  const cart = useCart();
  const { lines, subtotal, discount, delivery, total, coupon, setQty, remove, clear, applyCoupon, removeCoupon } = cart;
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", slot: "Today, 6–9 PM", notes: "" });

  const suggestions = products.filter((p) => p.badge === "Bestseller" && !lines.some((l) => l.slug === p.slug)).slice(0, 4);

  const submitCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = applyCoupon(code);
    setCodeMsg(ok ? { ok, t: `${site.coupon.percent}% discount applied!` } : { ok, t: "That code isn't valid." });
    if (ok) setCode("");
  };

  const orderOnWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const itemsText = lines.map((l) => `• ${l.qty} × ${l.product.name}${l.weight ? ` (${l.weight})` : ""} — ${formatPrice(l.lineTotal)}`).join("\n");
    const msg = [
      `New order — ${site.name}`,
      "",
      itemsText,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      discount ? `Discount (${coupon}): -${formatPrice(discount)}` : null,
      `Delivery: ${delivery ? formatPrice(delivery) : "Free"}`,
      `Total: ${formatPrice(total)}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      `Delivery slot: ${form.slot}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter((x) => x !== null).join("\n");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <PageHero title="Your Cart" image="photo-1597417321971-45e034f7a993" crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Cart" }]} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {lines.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg py-16 text-center">
              <motion.span animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-cream text-brand">
                <ShoppingBag size={56} />
              </motion.span>
              <h2 className="mt-8 text-4xl font-bold">Your cart is empty</h2>
              <p className="mt-3 text-lg text-muted">Looks like you haven't picked your cuts yet.</p>
              <Link href="/shop" className="mt-8 inline-flex rounded-full bg-brand px-10 py-4 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-ink">Return to shop</Link>
            </motion.div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
              <div>
                <FreeDeliveryBar amount={subtotal - discount} />

                <div className="mt-8 hidden grid-cols-[1fr_140px_140px_120px] gap-4 border-b border-line pb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted md:grid">
                  <span>Product</span><span className="text-center">Quantity</span><span className="text-right">Price</span><span className="text-right">Total</span>
                </div>

                <ul>
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.key}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                        className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line py-6 md:grid-cols-[1fr_140px_140px_120px]"
                      >
                        <div className="flex items-center gap-4">
                          <button onClick={() => remove(l.key)} aria-label="Remove item" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-ink transition hover:bg-brand hover:text-white"><X size={16} /></button>
                          <Link href={`/shop/${l.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                            <Image src={img(l.product.image, 300)} alt={l.product.name} fill sizes="96px" className="object-cover transition duration-500 hover:scale-110" />
                          </Link>
                          <div>
                            <Link href={`/shop/${l.slug}`} className="font-display text-lg font-bold text-ink transition hover:text-brand">{l.product.name}</Link>
                            <p className="text-sm text-muted">{l.weight ? `Weight: ${l.weight}` : l.product.unit}</p>
                            <p className="mt-1 text-sm font-semibold text-ink md:hidden">{formatPrice(l.unitPrice)}</p>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="flex items-center rounded-full border-2 border-line">
                            <button onClick={() => setQty(l.key, l.qty - 1)} className="grid h-10 w-10 place-items-center hover:text-brand" aria-label="Decrease"><Minus size={16} /></button>
                            <motion.span key={l.qty} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="w-7 text-center font-display font-bold">{l.qty}</motion.span>
                            <button onClick={() => setQty(l.key, l.qty + 1)} className="grid h-10 w-10 place-items-center hover:text-brand" aria-label="Increase"><Plus size={16} /></button>
                          </div>
                        </div>
                        <span className="hidden text-right text-body md:block">{formatPrice(l.unitPrice)}</span>
                        <span className="col-span-2 text-right font-display text-lg font-bold text-ink md:col-span-1">{formatPrice(l.lineTotal)}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
                  <form onSubmit={submitCoupon} className="flex-1">
                    {coupon ? (
                      <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 py-2 pl-4 pr-2 text-emerald-700">
                        <Tag size={18} /> Code <b>{coupon}</b> applied
                        <button type="button" onClick={removeCoupon} className="grid h-8 w-8 place-items-center rounded-full hover:bg-emerald-100" aria-label="Remove coupon"><X size={14} /></button>
                      </div>
                    ) : (
                      <div className="flex max-w-md gap-2">
                        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="h-14 flex-1 rounded-full border-2 border-line px-6 uppercase text-ink placeholder:normal-case focus:border-brand focus:outline-none" />
                        <button className="h-14 rounded-full bg-ink px-7 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-brand">Apply</button>
                      </div>
                    )}
                    {codeMsg && !coupon && <p className={`mt-2 pl-4 text-sm ${codeMsg.ok ? "text-emerald-600" : "text-brand"}`}>{codeMsg.t}</p>}
                    {!coupon && <p className="mt-2 pl-4 text-sm text-muted">Try <b className="text-ink">{site.coupon.code}</b> for {site.coupon.percent}% off.</p>}
                  </form>
                  <div className="flex gap-3">
                    <Link href="/shop" className="flex h-14 items-center gap-2 rounded-full border-2 border-ink px-6 font-display font-semibold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white"><ArrowLeft size={18} /> Continue shopping</Link>
                    <button onClick={clear} className="flex h-14 items-center gap-2 rounded-full px-4 font-medium text-muted transition hover:text-brand"><Trash2 size={18} /> Clear</button>
                  </div>
                </div>
              </div>

              {/* Summary + checkout */}
              <motion.aside id="checkout" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="scroll-mt-28 self-start rounded-[2rem] bg-cream p-7 lg:sticky lg:top-28">
                <h3 className="text-2xl font-bold">Order summary</h3>
                <dl className="mt-6 space-y-3 border-b border-line pb-6">
                  <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold text-ink">{formatPrice(subtotal)}</dd></div>
                  <AnimatePresence>
                    {discount > 0 && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between text-emerald-700">
                        <dt>Discount ({coupon})</dt><dd className="font-semibold">-{formatPrice(discount)}</dd>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex justify-between"><dt>Delivery</dt><dd className="font-semibold text-ink">{delivery ? formatPrice(delivery) : "Free"}</dd></div>
                </dl>
                <div className="flex items-baseline justify-between py-5">
                  <span className="font-display text-lg font-bold text-ink">Total</span>
                  <motion.span key={total} initial={{ scale: 1.15, color: "#DF4B2E" }} animate={{ scale: 1, color: "#242019" }} className="font-display text-3xl font-bold">{formatPrice(total)}</motion.span>
                </div>
                <p className="-mt-3 mb-6 text-xs text-muted">All prices in NZD and include 15% GST.</p>

                <form onSubmit={orderOnWhatsapp} className="space-y-3">
                  {([["name", "Full name", "text"], ["phone", "Phone number", "tel"], ["address", "Delivery address", "text"]] as const).map(([k, ph, type]) => (
                    <input key={k} required type={type} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={ph} className="h-13 w-full rounded-2xl border-2 border-transparent bg-white px-5 py-3.5 text-ink focus:border-brand focus:outline-none" />
                  ))}
                  <select value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} className="w-full rounded-2xl bg-white px-5 py-3.5 text-ink focus:outline-none">
                    {["Today, 12–3 PM", "Today, 6–9 PM", "Tomorrow, 9 AM–12 PM", "Tomorrow, 6–9 PM", "Pick up in store"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Cutting instructions or notes (optional)" rows={2} className="w-full resize-none rounded-2xl bg-white px-5 py-3.5 text-ink focus:outline-none" />
                  <motion.button whileTap={{ scale: 0.97 }} className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-emerald-600 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-emerald-700">
                    <WhatsappIcon size={22} /> Place order on WhatsApp
                  </motion.button>
                  <p className="text-center text-xs text-muted">Pay by card or EFTPOS on delivery.</p>
                </form>
              </motion.aside>
            </div>
          )}
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionTitle kicker="Don't forget" title="Customer favourites" />
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {suggestions.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
