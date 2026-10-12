"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { categories, products } from "@/lib/products";
import { formatPrice, img, site } from "@/lib/site";

const nav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop", mega: true },
  { label: "Meat Boxes", href: "/shop?category=boxes" },
  { label: "Our Story", href: "/#story" },
  ...(site.showRecipes ? [{ label: "Recipes", href: "/#recipes" }] : []),
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, subtotal, openDrawer } = useCart();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 300 && y > prev && !mega);
  });

  useEffect(() => {
    setMobile(false);
    setMega(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_10px_30px_-15px_rgba(0,0,0,.25)]" : ""}`}
        onMouseLeave={() => setMega(false)}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 md:px-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => {
              const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href.split("?")[0]) && n.href !== "/";
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  onMouseEnter={() => setMega(!!n.mega)}
                  className={`group relative flex items-center gap-1 px-4 py-2 font-display text-[15px] font-semibold uppercase tracking-wide transition-colors ${active ? "text-brand" : "text-ink hover:text-brand"}`}
                >
                  {n.label}
                  {n.mega && <ChevronDown size={15} className={`transition-transform ${mega ? "rotate-180" : ""}`} />}
                  <span className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearch(true)} aria-label="Search" className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-cream hover:text-brand">
              <Search size={20} />
            </button>
            <button onClick={openDrawer} aria-label="Open cart" className="group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-1.5 transition hover:bg-cream sm:pr-4">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition group-hover:bg-brand">
                <ShoppingBag size={19} />
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white ring-2 ring-white"
                >
                  {count}
                </motion.span>
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[11px] uppercase tracking-wider text-muted">My cart</span>
                <span className="block font-display font-bold text-ink">{formatPrice(subtotal)}</span>
              </span>
            </button>
            <button onClick={() => setMobile(true)} aria-label="Menu" className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-cream lg:hidden">
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-2xl lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-5 gap-5 px-6 py-8">
                {categories.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={`/shop?category=${c.id}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image src={img(c.image, 500)} alt={c.name} fill sizes="250px" className="object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                        <span className="absolute bottom-3 left-4 font-display text-lg font-bold text-white">{c.name}</span>
                      </div>
                      <p className="mt-2 flex items-center gap-1 text-sm text-muted transition group-hover:text-brand">
                        {c.blurb} <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[61] flex w-[85%] max-w-sm flex-col bg-ink p-6 text-white"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo light />
                <button onClick={() => setMobile(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><X size={20} /></button>
              </div>
              <nav className="mt-10 flex flex-col">
                {nav.map((n, i) => (
                  <motion.div key={n.label} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
                    <Link href={n.href} onClick={() => setMobile(false)} className="block border-b border-white/10 py-4 font-display text-2xl font-semibold transition hover:pl-2 hover:text-brand">
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = q.trim().length > 1 ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button onClick={onClose} aria-label="Close search" className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:rotate-90 hover:bg-brand"><X /></button>
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-[18vh] max-w-3xl px-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
                router.push(`/shop?q=${encodeURIComponent(q)}`);
              }}
              className="flex items-center gap-4 border-b-2 border-white/30 pb-4 focus-within:border-brand"
            >
              <Search className="text-brand" size={30} />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ribeye, lamb chops, kebab…" className="w-full bg-transparent font-display text-3xl text-white placeholder:text-white/30 focus:outline-none md:text-4xl" />
            </form>
            <div className="mt-6 space-y-2">
              {results.map((p) => (
                <Link key={p.slug} href={`/shop/${p.slug}`} onClick={onClose} className="flex items-center gap-4 rounded-xl p-2 text-white transition hover:bg-white/10">
                  <span className="relative h-14 w-14 overflow-hidden rounded-lg"><Image src={img(p.image, 200)} alt="" fill sizes="56px" className="object-cover" /></span>
                  <span className="flex-1 font-display text-lg">{p.name}</span>
                  <span className="font-semibold text-brand">{formatPrice(p.price)}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
