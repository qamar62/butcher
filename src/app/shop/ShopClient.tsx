"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Rows3, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/products";
import { formatPrice } from "@/lib/site";

const sorts = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name A–Z",
} as const;

const MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50;

export default function ShopClient({ initialCategory, initialQuery }: { initialCategory: string; initialQuery: string }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState<keyof typeof sorts>("featured");
  const [max, setMax] = useState(MAX);
  const [saleOnly, setSaleOnly] = useState(false);
  const [cols, setCols] = useState<3 | 4>(3);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let r = products.filter(
      (p) => (cat === "all" || p.category === cat) && p.price <= max && (!saleOnly || p.oldPrice) && p.name.toLowerCase().includes(q.toLowerCase())
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [cat, q, sort, max, saleOnly]);

  const reset = () => { setCat("all"); setQ(""); setMax(MAX); setSaleOnly(false); };

  const Filters = (
    <div className="space-y-10">
      <div>
        <h3 className="font-display text-lg font-bold">Categories</h3>
        <ul className="mt-4 space-y-1">
          {[{ id: "all", name: "All products" }, ...categories].map((c) => {
            const n = c.id === "all" ? products.length : products.filter((p) => p.category === c.id).length;
            const active = cat === c.id;
            return (
              <li key={c.id}>
                <button onClick={() => { setCat(c.id); setFiltersOpen(false); }} className={`relative flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${active ? "text-white" : "text-ink hover:bg-cream"}`}>
                  {active && <motion.span layoutId="cat-active" className="absolute inset-0 rounded-xl bg-brand" transition={{ type: "spring", stiffness: 400, damping: 35 }} />}
                  <span className="relative font-medium">{c.name}</span>
                  <span className={`relative text-sm ${active ? "text-white/80" : "text-muted"}`}>{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="font-display text-lg font-bold">Max price</h3>
        <input type="range" min={20} max={MAX} step={5} value={max} onChange={(e) => setMax(+e.target.value)} className="mt-5 w-full accent-[#DF4B2E]" />
        <p className="mt-2 text-sm text-muted">Up to <b className="text-ink">{formatPrice(max)}</b></p>
      </div>
      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} className="h-5 w-5 accent-[#DF4B2E]" />
        <span className="font-medium text-ink">On sale only</span>
      </label>
      <button onClick={reset} className="w-full rounded-full border-2 border-ink py-3 font-display font-semibold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white">Reset filters</button>
    </div>
  );

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block"><div className="sticky top-28">{Filters}</div></aside>

        <div>
          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-cream p-3">
            <button onClick={() => setFiltersOpen(true)} className="flex h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-ink lg:hidden"><SlidersHorizontal size={18} /> Filters</button>
            <div className="flex h-12 min-w-[200px] flex-1 items-center gap-2 rounded-full bg-white px-5">
              <Search size={18} className="text-muted" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full bg-transparent text-ink focus:outline-none" />
              {q && <button onClick={() => setQ("")} aria-label="Clear"><X size={16} /></button>}
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} className="h-12 rounded-full bg-white px-5 font-medium text-ink focus:outline-none">
              {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <div className="hidden gap-1 xl:flex">
              {([3, 4] as const).map((c) => (
                <button key={c} onClick={() => setCols(c)} aria-label={`${c} columns`} className={`grid h-12 w-12 place-items-center rounded-full transition ${cols === c ? "bg-ink text-white" : "bg-white text-ink"}`}>
                  {c === 3 ? <Rows3 size={18} /> : <LayoutGrid size={18} />}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-muted">Showing <b className="text-ink">{list.length}</b> of {products.length} products</p>

          <motion.div layout className={`mt-6 grid gap-7 sm:grid-cols-2 ${cols === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35 }}>
                  <ProductCard p={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-display text-2xl font-bold text-ink">No cuts match your filters</p>
              <button onClick={reset} className="mt-4 text-brand underline underline-offset-4">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-ink/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} />
            <motion.aside className="fixed inset-y-0 left-0 z-[61] w-[85%] max-w-sm overflow-y-auto bg-white p-6" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.35 }}>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-cream"><X size={18} /></button>
              </div>
              {Filters}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
