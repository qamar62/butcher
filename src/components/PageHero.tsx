"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { img } from "@/lib/site";

export default function PageHero({ title, crumbs, image = "photo-1740586222627-48338edac67d" }: { title: string; crumbs: { label: string; href?: string }[]; image?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 md:py-32">
      <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
        <Image src={img(image, 2000)} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="relative z-[2] mx-auto max-w-7xl px-4 md:px-6">
        <h1 className="overflow-hidden font-display text-5xl font-bold uppercase !text-white md:text-7xl">
          <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{title}</motion.span>
        </h1>
        <motion.nav initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-5 flex flex-wrap items-center gap-2 text-white/70">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={16} className="text-brand" />}
              {c.href ? <Link href={c.href} className="transition hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
