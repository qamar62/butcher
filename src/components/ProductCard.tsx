"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Eye, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories, type Product } from "@/lib/products";
import { formatPrice, img } from "@/lib/site";

const badgeColor: Record<string, string> = {
  Bestseller: "bg-ink",
  New: "bg-emerald-600",
  Sale: "bg-brand",
  "Chef's pick": "bg-amber-500",
};

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const cat = categories.find((c) => c.id === p.category)?.name;
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  const onAdd = () => {
    add(p.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(36,32,25,.35)]"
    >
      <Link href={`/shop/${p.slug}`} className="relative block aspect-square overflow-hidden bg-cream">
        <Image src={img(p.image, 700)} alt={p.name} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110 group-hover:rotate-1" />
        <div className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/15" />
        <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
          {p.badge && <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${badgeColor[p.badge]}`}>{p.badge}</span>}
          {off > 0 && <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-brand">-{off}%</span>}
        </div>
        <span className="absolute right-4 top-4 grid h-10 w-10 translate-x-14 place-items-center rounded-full bg-white text-ink opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-brand hover:text-white">
          <Eye size={18} />
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur">
          100% Halal
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{cat}</span>
        <Link href={`/shop/${p.slug}`} className="mt-1.5 font-display text-xl font-bold leading-snug text-ink transition hover:text-brand">
          {p.name}
        </Link>
        {p.contents ? (
          <ul className="mt-3 space-y-1 text-sm text-body">
            {p.contents.slice(0, 4).map((c) => (
              <li key={c} className="flex items-center gap-2"><Check size={14} className="text-brand" />{c}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 line-clamp-2 text-sm text-muted">{p.short}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <span className="block whitespace-nowrap font-display text-xl font-bold text-ink xl:text-2xl">{formatPrice(p.price)}</span>
            <span className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
              {p.oldPrice && <span className="whitespace-nowrap line-through">{formatPrice(p.oldPrice)}</span>}
              <span className="whitespace-nowrap">per {p.unit}</span>
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onAdd}
            aria-label={`Add ${p.name} to cart`}
            className={`relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full text-white transition-colors duration-300 ${added ? "bg-emerald-600" : "bg-ink hover:bg-brand"}`}
          >
            <motion.span key={added ? "y" : "n"} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {added ? <Check size={20} /> : <ShoppingBag size={19} />}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export function QtyStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex h-14 items-center rounded-full border-2 border-line">
      <button onClick={() => onChange(Math.max(1, value - 1))} className="grid h-full w-12 place-items-center text-ink hover:text-brand" aria-label="Decrease"><Minus size={18} /></button>
      <span className="w-8 text-center font-display text-lg font-bold">{value}</span>
      <button onClick={() => onChange(value + 1)} className="grid h-full w-12 place-items-center text-ink hover:text-brand" aria-label="Increase"><Plus size={18} /></button>
    </div>
  );
}
