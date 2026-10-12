"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, ShoppingBag, Snowflake, Truck, Zap } from "lucide-react";
import ProductCard, { QtyStepper } from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { unitPriceFor, useCart } from "@/context/CartContext";
import { categories, getProduct, products } from "@/lib/products";
import { formatPrice, img, site } from "@/lib/site";

export default function ProductDetail({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  const { add, openDrawer } = useCart();
  const router = useRouter();
  const [weight, setWeight] = useState(p.weights?.[0]?.label);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "cook" | "delivery">("desc");
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const price = unitPriceFor(p, weight);
  const cat = categories.find((c) => c.id === p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  const tabs = {
    desc: p.contents
      ? `Every ${p.name} is packed to order by our butchers. Contents may vary slightly by season — we always substitute with an equal or better cut.`
      : `${p.short} Sourced from trusted halal suppliers, cut fresh to order in our shop and vacuum-sealed to lock in freshness.`,
    cook: "Bring meat to room temperature for 20–30 minutes before cooking. Season generously, use a very hot pan or grill, and always rest the meat for half its cooking time before slicing.",
    delivery: `${site.cutOff}. Free delivery on orders over ${formatPrice(site.freeDeliveryOver)}; otherwise ${formatPrice(site.deliveryFee)}. Everything is packed in insulated, chilled packaging.`,
  };

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div
              className="relative aspect-square cursor-zoom-in overflow-hidden rounded-[2rem] bg-cream"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
            >
              <Image
                src={img(p.image, 1400)}
                alt={p.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-300"
                style={{ transform: zoom.on ? "scale(1.8)" : "scale(1)", transformOrigin: `${zoom.x}% ${zoom.y}%` }}
              />
              {p.badge && <span className="absolute left-5 top-5 rounded-full bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">{p.badge}</span>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">{cat.name}</span>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">{p.name}</h2>
            <div className="mt-5 flex items-baseline gap-3">
              <AnimatePresence mode="wait">
                <motion.span key={price} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="font-display text-4xl font-bold text-brand">
                  {formatPrice(price)}
                </motion.span>
              </AnimatePresence>
              {p.oldPrice && !p.weights && <span className="text-xl text-muted line-through">{formatPrice(p.oldPrice)}</span>}
              <span className="text-muted">/ {weight ?? p.unit}</span>
            </div>
            <p className="mt-6 text-lg text-body">{p.short}</p>

            {p.contents && (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {p.contents.map((c) => <li key={c} className="flex items-center gap-2 text-ink"><Check size={18} className="text-brand" />{c}</li>)}
              </ul>
            )}

            {p.weights && (
              <div className="mt-8">
                <p className="font-display font-semibold text-ink">Weight</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {p.weights.map((w) => (
                    <button key={w.label} onClick={() => setWeight(w.label)} className={`relative rounded-full border-2 px-6 py-2.5 font-display font-semibold transition ${weight === w.label ? "border-brand text-white" : "border-line text-ink hover:border-ink"}`}>
                      {weight === w.label && <motion.span layoutId="weight" className="absolute inset-0 rounded-full bg-brand" />}
                      <span className="relative">{w.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <QtyStepper value={qty} onChange={setQty} />
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => { add(p.slug, qty, weight); openDrawer(); }} className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-8 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-brand">
                <ShoppingBag size={19} /> Add to cart
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => { add(p.slug, qty, weight); router.push("/cart"); }} className="flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-brand-dark">
                <Zap size={18} /> Buy now
              </motion.button>
            </div>

            <div className="mt-8 grid gap-3 rounded-2xl bg-cream p-5 sm:grid-cols-3">
              {[[ShieldCheck, "100% Halal"], [Snowflake, "Packed chilled"], [Truck, "Same-day delivery"]].map(([Icon, t]) => {
                const I = Icon as typeof Truck;
                return <span key={t as string} className="flex items-center gap-2 font-medium text-ink"><I size={20} className="text-brand" />{t as string}</span>;
              })}
            </div>

            <div className="mt-10">
              <div className="flex gap-6 border-b border-line">
                {([["desc", "Description"], ["cook", "Cooking tips"], ["delivery", "Delivery"]] as const).map(([k, l]) => (
                  <button key={k} onClick={() => setTab(k)} className={`relative pb-3 font-display font-semibold ${tab === k ? "text-brand" : "text-ink"}`}>
                    {l}
                    {tab === k && <motion.span layoutId="ptab" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 leading-relaxed text-body">{tabs[tab]}</motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionTitle kicker="You may also like" title="Related products" />
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => <ProductCard key={r.slug} p={r} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
