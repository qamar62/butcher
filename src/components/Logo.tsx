import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Khanz Butchery home">
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-[360deg]">
        {/* Bull horns + K mark */}
        <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 10c0 7 4 10 9 10M40 10c0 7-4 10-9 10" />
          <path d="M19 18v20M19 29l10-11M22 26l8 12" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-2xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          KHANZ
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.35em] ${light ? "text-white/60" : "text-brand"}`}>
          Butchery
        </span>
      </span>
    </Link>
  );
}
