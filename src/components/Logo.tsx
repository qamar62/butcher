import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Brand logo from /public/logo.png (transparent PNG, 557×220).
 * `light` = used on dark backgrounds (footer, mobile menu): the logo sits on a white pill
 * so its dark lettering stays readable.
 */
export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`group inline-flex shrink-0 items-center ${light ? "rounded-2xl bg-white px-3 py-2" : ""} ${className}`}
    >
      <Image
        src="/logo.png"
        alt={site.name}
        width={557}
        height={220}
        priority
        className={`w-auto transition-transform duration-500 group-hover:scale-[1.03] ${light ? "h-14" : "h-12 sm:h-16"}`}
      />
    </Link>
  );
}
