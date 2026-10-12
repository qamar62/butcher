"use client";
import { motion, type Variants } from "framer-motion";

const dirs = { up: { y: 50 }, down: { y: -50 }, left: { x: 60 }, right: { x: -60 }, none: {} };

export default function Reveal({
  children,
  delay = 0,
  dir = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: keyof typeof dirs;
  className?: string;
}) {
  const v: Variants = {
    hidden: { opacity: 0, ...dirs[dir] },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div className={className} variants={v} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  );
}
