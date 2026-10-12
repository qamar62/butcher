"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toast, openDrawer } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.button
          onClick={openDrawer}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink py-3 pl-3 pr-5 text-sm text-white shadow-2xl"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand"><Check size={16} /></span>
          {toast}
          <span className="font-semibold text-brand underline-offset-4 hover:underline">View cart</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
