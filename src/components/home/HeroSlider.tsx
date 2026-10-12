"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { img, site } from "@/lib/site";

const slides = [
  {
    kicker: "Fresh • Halal • Hand-cut",
    lines: ["Locally sourced", "proper meat"],
    accent: 1,
    text: "Committed to offering the finest quality halal meat — cut to order by master butchers every single morning.",
    image: "photo-1690983325551-b922137727be",
    cta: { label: "Shop now", href: "/shop" },
  },
  {
    kicker: "This week only",
    lines: ["35% off", "favourite steaks"],
    accent: 0,
    text: "Ribeye, striploin and tenderloin at butcher-counter prices. Marbled, aged and ready for a hot pan.",
    image: "photo-1690983323540-d6e889c4b107",
    cta: { label: "Grab the deal", href: "/shop?category=beef" },
  },
  {
    kicker: "Delivered to your door",
    lines: ["Hygienic cuts", "great taste"],
    accent: 1,
    text: "Fresh chicken and lamb, packed cold and delivered to your door the same day you order.",
    image: "photo-1642497394469-188b0f4bcae6",
    cta: { label: "Order fresh", href: "/shop?category=chicken" },
  },
];

const DURATION = 7000;

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} fill="none">
      <path d="M30 118V10" stroke="#5b7a3a" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} fill="#6f9447">
          <ellipse cx="18" cy={20 + i * 12} rx="13" ry="4" transform={`rotate(-35 18 ${20 + i * 12})`} />
          <ellipse cx="42" cy={26 + i * 12} rx="13" ry="4" transform={`rotate(35 42 ${26 + i * 12})`} />
        </g>
      ))}
    </svg>
  );
}

function Chili({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className}>
      <path d="M8 30c10-18 60-26 96-8 6 3 6 10 0 12-40 14-76 14-96-4z" fill="#d23b1f" />
      <path d="M104 22c4-6 10-8 14-6" stroke="#4d7a2a" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M30 26c20-6 40-6 60-2" stroke="#ff8a6b" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" />
    </svg>
  );
}

export default function HeroSlider() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const slide = slides[index];

  const go = useCallback((next: number, d?: number) => {
    setState(([cur]) => {
      const n = (next + slides.length) % slides.length;
      return [n, d ?? (n > cur ? 1 : -1)];
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1, 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const nextSlide = slides[(index + 1) % slides.length];

  return (
    <section
      className="grain relative h-[calc(100svh-120px)] min-h-[640px] overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slides with a directional wipe + Ken Burns zoom */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          className="absolute inset-0"
          variants={{
            enter: (d: number) => ({ clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }),
            center: { clipPath: "inset(0 0% 0 0%)" },
            exit: { zIndex: 0, scale: 1.08, filter: "brightness(0.5)", transition: { duration: 1.1, ease: [0.77, 0, 0.18, 1] } },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ zIndex: 1 }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(index + 1, 1);
            else if (info.offset.x > 80) go(index - 1, -1);
          }}
        >
          <div className="absolute inset-0 animate-kenburns">
            <Image src={img(slide.image, 2000)} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Giant outlined brand word */}
      <motion.span
        aria-hidden
        className="text-outline pointer-events-none absolute -bottom-10 left-0 z-[2] select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none text-white/10"
        animate={{ x: ["0%", "-20%"] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        KHANZ BUTCHERY
      </motion.span>

      {/* Floating garnish */}
      <Leaf className="pointer-events-none absolute right-[8%] top-[12%] z-[3] hidden w-12 rotate-[30deg] animate-float opacity-90 md:block" />
      <Chili className="pointer-events-none absolute bottom-[26%] right-[30%] z-[3] hidden w-24 -rotate-12 animate-float opacity-90 [animation-delay:-2s] lg:block" />
      <Leaf className="pointer-events-none absolute bottom-[14%] left-[46%] z-[3] hidden w-9 -rotate-[60deg] animate-float opacity-70 [animation-delay:-4s] lg:block" />

      {/* Content */}
      <div className="relative z-[4] mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={index} initial="hidden" animate="show" exit="exit">
              <motion.span
                variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { delay: 0.3 } }, exit: { opacity: 0, x: 30 } }}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand" /> {slide.kicker}
              </motion.span>

              <h1 className="mt-6 font-display text-[13vw] font-bold uppercase leading-[0.92] !text-white sm:text-7xl lg:text-[88px]">
                {slide.lines.map((line, li) => (
                  <span key={line} className="block overflow-hidden pb-1">
                    <motion.span
                      className={`block ${li === slide.accent ? "text-brand" : ""}`}
                      variants={{
                        hidden: { y: "110%", rotate: 4 },
                        show: { y: "0%", rotate: 0, transition: { duration: 0.9, delay: 0.4 + li * 0.12, ease: [0.22, 1, 0.36, 1] } },
                        exit: { y: "-110%", transition: { duration: 0.45, delay: li * 0.05, ease: "easeIn" } },
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.7 } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}
                className="mt-6 max-w-lg text-lg text-white/75"
              >
                {slide.text}
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.7 } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}
                className="mt-9 flex flex-wrap items-center gap-5"
              >
                <Link href={slide.cta.href} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand py-4 pl-8 pr-3 font-display font-semibold uppercase tracking-wider text-white">
                  <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="relative transition-colors group-hover:text-ink">{slide.cta.label}</span>
                  <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-brand transition group-hover:bg-brand group-hover:text-white">
                    <ArrowRight size={18} className="transition group-hover:-rotate-45" />
                  </span>
                </Link>
                <span className="flex items-center gap-2 text-sm text-white/70"><ShieldCheck className="text-brand" size={20} /> 100% Halal certified</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Spinning discount badge */}
      <Link href="/shop" className="group absolute right-[6%] top-1/2 z-[5] hidden -translate-y-1/2 lg:block" aria-label={`Get ${site.coupon.percent}% off`}>
        <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1, type: "spring", stiffness: 80 }} className="relative h-44 w-44">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
            <defs><path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <circle cx="100" cy="100" r="98" fill="#DF4B2E" />
            <text fill="#fff" fontSize="15" fontWeight="700" letterSpacing="4" fontFamily="Space Grotesk Variable, sans-serif">
              <textPath href="#circle">GET {site.coupon.percent}% OFF • CODE {site.coupon.code} • FRESH •</textPath>
            </text>
          </svg>
          <div className="absolute inset-[30%] grid place-items-center rounded-full bg-white text-center font-display leading-none text-ink transition group-hover:scale-110">
            <span><b className="block text-3xl">{site.coupon.percent}%</b><span className="text-[10px] font-bold uppercase tracking-widest text-brand">off</span></span>
          </div>
        </motion.div>
      </Link>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-[6]">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 pb-8 md:px-6">
          <div className="flex items-center gap-6">
            <span className="font-display text-white">
              <AnimatePresence mode="wait">
                <motion.b key={index} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-block text-4xl">
                  0{index + 1}
                </motion.b>
              </AnimatePresence>
              <span className="text-white/40"> / 0{slides.length}</span>
            </span>
            <div className="hidden gap-2 sm:flex">
              {slides.map((_, i) => (
                <button key={i} onClick={() => go(i)} aria-label={`Go to slide ${i + 1}`} className="relative h-1 w-16 overflow-hidden rounded-full bg-white/20">
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-brand"
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                  {i < index && <span className="absolute inset-0 bg-white/60" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Next-slide preview */}
            <button onClick={() => go(index + 1, 1)} className="group hidden items-center gap-3 rounded-2xl bg-white/10 p-2 pr-5 text-left text-white backdrop-blur transition hover:bg-white/20 md:flex">
              <span className="relative h-14 w-20 overflow-hidden rounded-xl">
                <Image src={img(nextSlide.image, 300)} alt="" fill sizes="80px" className="object-cover transition duration-700 group-hover:scale-125" />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] uppercase tracking-widest text-white/50">Next</span>
                <span className="block font-display font-semibold">{nextSlide.lines.join(" ")}</span>
              </span>
            </button>
            <button onClick={() => go(index - 1, -1)} aria-label="Previous slide" className="grid h-14 w-14 place-items-center rounded-full border border-white/30 text-white transition hover:border-brand hover:bg-brand">
              <ChevronLeft />
            </button>
            <button onClick={() => go(index + 1, 1)} aria-label="Next slide" className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink transition hover:bg-brand hover:text-white">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
