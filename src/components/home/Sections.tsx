"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Award, Beef, ChefHat, ChevronLeft, ChevronRight, Flame, Leaf, Package,
  Quote, ShieldCheck, Snowflake, Sparkles, Star, Truck, Wallet,
} from "lucide-react";
import Reveal from "../Reveal";
import SectionTitle from "../SectionTitle";
import ProductCard from "../ProductCard";
import { byCategory, categories, type CategoryId } from "@/lib/products";
import { img, site } from "@/lib/site";

/* ───────────────────────── Marquee strip ───────────────────────── */
export function MarqueeStrip() {
  const words = ["Premium Beef", "Tender Lamb", "Fresh Chicken", "BBQ Ready", "Meat Boxes", "100% Halal", "Hand-cut Daily"];
  const row = [...words, ...words];
  return (
    <div className="relative z-10 -mt-6 overflow-hidden py-6">
      <div className="-rotate-2 bg-brand py-5 shadow-xl">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {row.map((w, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-8 px-8 font-display text-2xl font-bold uppercase text-white md:text-3xl">
                  {w}
                  <Sparkles className="text-ink" size={26} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Welcome ───────────────────────── */
export function Welcome() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const features = [
    { icon: Beef, title: "Variety of meat & poultry", text: "Premium beef, lamb, mutton, chicken and marinated BBQ cuts — all under one roof." },
    { icon: Package, title: "Custom or pre-set boxes", text: "Mix and match your own box, or pick one of our butcher-curated bundles." },
    { icon: Truck, title: "Delivered to your door", text: `${site.cutOff}. Prefer to collect? Pick up in-store anytime.` },
  ];
  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-6 lg:grid-cols-2">
        <div className="relative h-[520px]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[78%] w-[68%] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image src={img("photo-1700478934617-75d2d4f01a04", 900)} alt="Butcher preparing meat" fill sizes="40vw" className="object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 h-[60%] w-[55%] overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl">
            <Image src={img("photo-1690983330536-3b0089d07cf9", 800)} alt="Fresh steaks" fill sizes="30vw" className="object-cover" />
          </motion.div>
          <Reveal dir="none" delay={0.3} className="absolute bottom-10 left-6 z-10">
            <div className="flex items-center gap-4 rounded-2xl bg-ink p-5 text-white shadow-2xl">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-brand"><ShieldCheck size={28} /></span>
              <span><b className="block font-display text-2xl">100% Halal</b><span className="text-sm text-white/60">Certified & traceable</span></span>
            </div>
          </Reveal>
        </div>

        <div>
          <SectionTitle center={false} kicker={`Welcome to ${site.short}`} title={<>Delivering meat the way <span className="text-brand">meat should be</span></>} text="From farm to counter to your kitchen — every cut is trimmed by hand, packed cold, and delivered while it's at its freshest." />
          <div className="mt-10 space-y-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 * i} dir="left">
                <div className="group flex gap-5 rounded-2xl p-3 transition hover:bg-cream">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-cream text-brand transition duration-500 group-hover:rotate-[10deg] group-hover:bg-brand group-hover:text-white">
                    <f.icon size={28} />
                  </span>
                  <span>
                    <h3 className="text-xl font-bold">{f.title}</h3>
                    <p className="mt-1 text-body">{f.text}</p>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <BtnLink href="/shop" className="mt-10">Shop all meats</BtnLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function BtnLink({ href, children, className = "", light = false }: { href: string; children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <Link href={href} className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-4 pl-8 pr-3 font-display font-semibold uppercase tracking-wider ${light ? "bg-white text-ink" : "bg-ink text-white"} ${className}`}>
      <span className="absolute inset-0 translate-y-full rounded-full bg-brand transition-transform duration-500 group-hover:translate-y-0" />
      <span className="relative transition-colors group-hover:text-white">{children}</span>
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition group-hover:bg-white group-hover:text-brand">
        <ArrowUpRight size={18} className="transition group-hover:rotate-45" />
      </span>
    </Link>
  );
}

/* ───────────────────────── Categories ───────────────────────── */
export function CategoryRow() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle kicker="Shop by category" title={<>Pick your <span className="text-brand">favourite cut</span></>} />
        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <Link href={`/shop?category=${c.id}`} className="group block text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[200px]">
                  <span className="absolute inset-0 rounded-full border-2 border-dashed border-brand/40 transition duration-700 group-hover:rotate-180 group-hover:border-brand" />
                  <div className="absolute inset-3 overflow-hidden rounded-full">
                    <Image src={img(c.image, 400)} alt={c.name} fill sizes="200px" className="object-cover transition duration-700 group-hover:scale-125" />
                    <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/30" />
                  </div>
                  <span className="absolute bottom-2 right-2 grid h-11 w-11 scale-0 place-items-center rounded-full bg-brand text-white shadow-lg transition duration-500 group-hover:scale-100">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold transition group-hover:text-brand">{c.name}</h3>
                <p className="text-sm text-muted">{byCategory(c.id).length} products</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Boxes ───────────────────────── */
export function Boxes() {
  const boxes = byCategory("boxes");
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle center={false} kicker="Shop our boxes" title={<>Find your <span className="text-brand">perfect box</span></>} text="Butcher-curated bundles that save you time and money — packed fresh, delivered cold." />
          <Reveal><BtnLink href="/shop?category=boxes">View all boxes</BtnLink></Reveal>
        </div>
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {boxes.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Standards / stats ───────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function Standards() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Edit these figures to match the shop's real numbers.
  const stats = [
    { n: 100, s: "%", l: "Halal certified" },
    { n: 30, s: "+", l: "Cuts on the counter" },
    { n: 0, s: "", l: "Preservatives added" },
    { n: 7, s: " days", l: "Open every week" },
  ];
  const badges = [
    { icon: Award, t: "High quality meat" },
    { icon: Wallet, t: "Great value" },
    { icon: ChefHat, t: "Hand-crafted cuts" },
  ];
  return (
    <section ref={ref} className="grain relative overflow-hidden bg-ink py-28 text-white md:py-36">
      <motion.div style={{ y }} className="absolute inset-[-15%_0]">
        <Image src={img("photo-1632084687062-522d7b1d4b95", 2000)} alt="" fill sizes="100vw" className="object-cover opacity-25" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="relative z-[2] mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-end gap-12 lg:grid-cols-2">
          <SectionTitle light center={false} kicker="Superior standards" title={<>Sourced from trusted farms with <span className="text-brand">uncompromising</span> standards</>} />
          <Reveal delay={0.2}>
            <p className="text-lg text-white/70">We work only with suppliers who share our values — humane rearing, strict halal slaughter, and an unbroken cold chain from the farm to your fridge.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((b) => (
                <span key={b.t} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-display font-semibold backdrop-blur">
                  <b.icon size={18} className="text-brand" /> {b.t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1} className="bg-ink/80 p-8 backdrop-blur">
              <b className="block font-display text-5xl font-bold text-brand md:text-6xl"><Counter to={s.n} suffix={s.s} /></b>
              <span className="mt-2 block text-white/60">{s.l}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */
export function HowItWorks() {
  const steps = [
    { icon: Package, t: "Choose your cuts", d: "Browse the counter online or pick a ready-made box." },
    { icon: ChefHat, t: "We prepare your order", d: "Our butchers cut, trim and pack it fresh to order." },
    { icon: Snowflake, t: "Deliver or pick up", d: "Chilled home delivery, or click & collect in-store." },
    { icon: Flame, t: "Cook with confidence", d: "Follow our recipes and enjoy restaurant-grade meat." },
  ];
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle kicker="How it works" title={<>Online butcher delivery <span className="text-brand">on your schedule</span></>} />
        <div className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-6">
          <svg className="absolute left-[12%] right-[12%] top-12 hidden h-2 w-[76%] md:block" preserveAspectRatio="none" viewBox="0 0 100 2">
            <motion.line x1="0" y1="1" x2="100" y2="1" stroke="#DF4B2E" strokeWidth="0.4" strokeDasharray="1.5 1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} />
          </svg>
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={0.2 + i * 0.2} className="relative text-center">
              <div className="group relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-brand shadow-lg transition duration-500 hover:bg-brand hover:text-white">
                <s.icon size={36} className="transition duration-500 group-hover:scale-110" />
                <span className="absolute -right-1 -top-1 grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.t}</h3>
              <p className="mx-auto mt-2 max-w-[240px] text-body">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Best sellers (tabs) ───────────────────────── */
export function BestSellers() {
  const tabs: { id: CategoryId; label: string }[] = [
    { id: "beef", label: "Beef" },
    { id: "lamb", label: "Lamb" },
    { id: "chicken", label: "Chicken" },
    { id: "bbq", label: "BBQ" },
  ];
  const [tab, setTab] = useState<CategoryId>("beef");
  const items = byCategory(tab).slice(0, 4);
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle kicker="Best sellers" title={<>Our customers' <span className="text-brand">top picks</span></>} />
        <Reveal className="mt-10 flex justify-center">
          <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-cream p-1.5">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`relative rounded-full px-6 py-3 font-display font-semibold uppercase tracking-wide transition-colors md:px-8 ${tab === t.id ? "text-white" : "text-ink hover:text-brand"}`}>
                {tab === t.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
          </motion.div>
        </AnimatePresence>
        <div className="mt-12 text-center"><BtnLink href="/shop">Shop all meats</BtnLink></div>
      </div>
    </section>
  );
}

/* ───────────────────────── Promo banners ───────────────────────── */
export function Promos() {
  const promos = [
    { k: "Weekend special", t: "BBQ season is here", d: "Marinated tikka, seekh kebab & ribs", img: "photo-1529262365544-55d1707e64e6", href: "/shop?category=bbq", dark: true },
    { k: `Use code ${site.coupon.code}`, t: `${site.coupon.percent}% off your first box`, d: "Curated meat boxes delivered fresh", img: "photo-1690983323238-0b91789e1b5a", href: "/shop?category=boxes", dark: false },
  ];
  return (
    <section className="overflow-hidden pb-24">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 md:grid-cols-2 md:px-6">
        {promos.map((p, i) => (
          <Reveal key={p.t} dir={i ? "left" : "right"}>
            <Link href={p.href} className={`group relative flex min-h-[320px] items-end overflow-hidden rounded-[2rem] p-10 ${p.dark ? "bg-ink" : "bg-brand"}`}>
              <Image src={img(p.img, 1000)} alt="" fill sizes="50vw" className="object-cover opacity-50 transition duration-[1.5s] group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-r ${p.dark ? "from-ink via-ink/70" : "from-brand via-brand/70"} to-transparent`} />
              <div className="relative max-w-xs text-white">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">{p.k}</span>
                <h3 className="mt-3 text-4xl font-bold leading-tight !text-white">{p.t}</h3>
                <p className="mt-2 text-white/75">{p.d}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider">
                  Shop now <ArrowRight size={18} className="transition group-hover:translate-x-2" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Why choose us ───────────────────────── */
export function WhyUs() {
  const points = [
    { icon: Leaf, t: "Responsible sourcing", d: "Trusted farms, humane rearing and full traceability on every cut." },
    { icon: Wallet, t: "Fair prices", d: "Butcher-direct pricing — better meat for less than the supermarket." },
    { icon: Star, t: "Premium flavour", d: "Properly rested and expertly trimmed for unbeatable taste." },
  ];
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-6 lg:grid-cols-2">
        <div>
          <SectionTitle center={false} kicker="Why choose us" title={<>What sets <span className="text-brand">Khanz</span> apart</>} />
          <div className="mt-10 space-y-5">
            {points.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.12} dir="right">
                <div className="group flex items-start gap-5 rounded-3xl bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white"><p.icon size={24} /></span>
                  <span><h3 className="text-xl font-bold">{p.t}</h3><p className="mt-1 text-body">{p.d}</p></span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal dir="left" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
            <Image src={img("photo-1599834255434-c137726a0637", 1000)} alt="Khanz butcher at the counter" fill sizes="50vw" className="object-cover" />
          </div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 top-12 rounded-2xl bg-white p-5 shadow-2xl">
            <span className="flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</span>
            <b className="mt-1 block font-display text-lg text-ink">Loved by local families</b>
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-4 bottom-12 flex items-center gap-3 rounded-2xl bg-ink p-5 text-white shadow-2xl">
            <Truck className="text-brand" /> <b className="font-display">Same-day delivery</b>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Story + quote ───────────────────────── */
export function Story() {
  return (
    <section id="story" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
        <Reveal>
          <Quote className="mx-auto text-brand" size={56} />
          <blockquote className="mt-8 font-display text-3xl font-medium leading-snug text-ink md:text-4xl">
            “A good butcher is judged by the cut, not the counter. Every piece of meat that leaves our shop is one we'd proudly serve to our own family.”
          </blockquote>
          <p className="mt-8 font-display font-bold uppercase tracking-[0.25em] text-brand">— The Khan family, founders</p>
        </Reveal>
      </div>
      <div className="mx-auto mt-24 grid max-w-7xl items-center gap-16 px-4 md:px-6 lg:grid-cols-2">
        <Reveal dir="right" className="grid grid-cols-2 gap-5">
          <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-[2rem]"><Image src={img("photo-1597760665504-82545eb8d32b", 700)} alt="Slicing meat" fill sizes="25vw" className="object-cover" /></div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]"><Image src={img("photo-1597417321971-45e034f7a993", 700)} alt="Meat counter" fill sizes="25vw" className="object-cover" /></div>
        </Reveal>
        <div>
          <SectionTitle center={false} kicker="Our story" title={<>Rooted in tradition, <span className="text-brand">driven by passion</span></>} text="Khanz Butchery began with a simple promise: honest, properly-cut halal meat at a fair price. Generations of butchery know-how meet modern hygiene and cold-chain standards — so you get the old-school quality with today's convenience." />
          <Reveal delay={0.2}><BtnLink href="/shop" className="mt-10">Explore the counter</BtnLink></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */
// PLACEHOLDER reviews — replace with genuine customer reviews before going live.
const reviews = [
  { name: "Customer name", area: "Ponsonby", text: "The ribeye was beautifully marbled and arrived perfectly chilled. Best steak we've cooked at home." },
  { name: "Customer name", area: "Mt Roskill", text: "Their mutton curry cut is spot on — clean, fresh and exactly the size I asked for." },
  { name: "Customer name", area: "Papatoetoe", text: "Ordered the BBQ Weekend Box for a family gathering. Everyone asked where the meat was from!" },
  { name: "Customer name", area: "Henderson", text: "Same-day delivery, friendly team and meat you can trust. Our go-to butcher now." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, []);
  const r = reviews[i];
  return (
    <section className="grain relative overflow-hidden bg-brand py-24 text-white md:py-32">
      <span aria-hidden className="text-outline pointer-events-none absolute -right-10 top-0 font-display text-[20vw] font-bold leading-none text-white/15">“</span>
      <div className="relative z-[2] mx-auto max-w-4xl px-4 text-center md:px-6">
        <SectionTitle light kicker="Testimonials" title="Why customers love us" />
        <div className="relative mt-14 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5 }}>
              <span className="flex justify-center gap-1 text-amber-300">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={22} fill="currentColor" />)}</span>
              <p className="mt-6 font-display text-2xl font-medium leading-relaxed md:text-3xl">“{r.text}”</p>
              <p className="mt-6 font-display font-bold">{r.name} <span className="font-normal text-white/70">· {r.area}</span></p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setI((i - 1 + reviews.length) % reviews.length)} aria-label="Previous review" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 transition hover:bg-white hover:text-brand"><ChevronLeft /></button>
          <div className="flex gap-2">{reviews.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-white" : "w-2 bg-white/40"}`} />)}</div>
          <button onClick={() => setI((i + 1) % reviews.length)} aria-label="Next review" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 transition hover:bg-white hover:text-brand"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Recipes ───────────────────────── */
export function Recipes() {
  const posts = [
    { t: "Perfect pan-seared ribeye", c: "Beef", img: "photo-1588168333986-5078d3ae3976", d: "Hot pan, butter baste, and the rest that makes all the difference." },
    { t: "Smoky BBQ beef ribs", c: "BBQ", img: "photo-1550367363-ea12860cc124", d: "Low and slow with a simple dry rub — fall-off-the-bone every time." },
    { t: "Herb-crusted lamb rack", c: "Lamb", img: "photo-1761983723667-99c7fd98af53", d: "A showstopping Friday roast that's easier than you think." },
  ];
  return (
    <section id="recipes" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle kicker="Cooking inspiration" title={<>Our favourite <span className="text-brand">recipes</span></>} />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.12}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                  <Image src={img(p.img, 800)} alt={p.t} fill sizes="33vw" className="object-cover transition duration-[1.2s] group-hover:scale-110" />
                  <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">{p.c}</span>
                  <span className="absolute bottom-5 right-5 grid h-12 w-12 translate-y-4 place-items-center rounded-full bg-brand text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight /></span>
                </div>
                <h3 className="mt-6 text-2xl font-bold transition group-hover:text-brand">{p.t}</h3>
                <p className="mt-2 text-body">{p.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Newsletter ───────────────────────── */
export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="px-4 pb-24 md:px-6">
      <Reveal className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center md:px-16 md:py-20">
        <Image src={img("photo-1508615263227-c5d58c1e5821", 1600)} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="relative z-[2] mx-auto max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">Newsletter</span>
          <h2 className="mt-4 text-4xl font-bold !text-white md:text-5xl">Raise your grill game</h2>
          <p className="mt-4 text-white/70">Weekly deals, new cuts and recipes — straight to your inbox. Get {site.coupon.percent}% off your first order.</p>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 font-display text-xl text-white">
                You're in! Use code <b className="text-brand">{site.coupon.code}</b> at checkout 🎉
              </motion.p>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 rounded-full sm:flex-row sm:bg-white sm:p-1.5">
                <input required type="email" placeholder="Your email address" className="h-14 flex-1 rounded-full bg-white px-6 text-ink placeholder:text-muted focus:outline-none" />
                <button className="h-14 rounded-full bg-brand px-8 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-brand-dark">Subscribe</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

