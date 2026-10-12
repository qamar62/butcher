import Link from "next/link";
import { Clock, HeartHandshake, Mail, MapPin, Phone, ShieldCheck, Snowflake, Truck } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, TiktokIcon, WhatsappIcon } from "./Social";
import { categories } from "@/lib/products";
import { formatPrice, site } from "@/lib/site";

export default function Footer() {
  const perks = [
    { icon: Truck, t: `Free delivery over ${formatPrice(site.freeDeliveryOver)}` },
    { icon: Snowflake, t: "Packed fresh & chilled" },
    { icon: ShieldCheck, t: "100% halal certified" },
    { icon: HeartHandshake, t: "Satisfaction guaranteed" },
  ];
  return (
    <footer id="contact" className="scroll-mt-24 bg-ink text-white/70">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-6">
          {perks.map((p) => (
            <div key={p.t} className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white"><p.icon size={22} /></span>
              <span className="font-display font-semibold text-white">{p.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs">{site.tagline}. Hand-cut by master butchers and delivered fresh to your door across New Zealand.</p>
          <div className="mt-6 flex gap-3">
            {[InstagramIcon, FacebookIcon, TiktokIcon].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand">
                <Icon />
              </a>
            ))}
            <a href={`https://wa.me/${site.whatsapp}`} aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-emerald-600">
              <WhatsappIcon />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold !text-white">Shop</h4>
          <ul className="mt-5 space-y-3">
            {categories.map((c) => (
              <li key={c.id}><Link href={`/shop?category=${c.id}`} className="transition hover:pl-1 hover:text-brand">{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold !text-white">Quick links</h4>
          <ul className="mt-5 space-y-3">
            {[["Home", "/"], ["All products", "/shop"], ["Cart", "/cart"], ["Our story", "/#story"], ["Recipes", "/#recipes"]].map(([l, h]) => (
              <li key={l}><Link href={h} className="transition hover:pl-1 hover:text-brand">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold !text-white">Visit the shop</h4>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3"><MapPin size={20} className="shrink-0 text-brand" />{site.address}</li>
            <li className="flex gap-3"><Phone size={20} className="shrink-0 text-brand" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex gap-3"><Mail size={20} className="shrink-0 text-brand" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex gap-3"><Clock size={20} className="shrink-0 text-brand" />{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex gap-2">{["Visa", "Mastercard", "EFTPOS", "Apple Pay"].map((m) => <span key={m} className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80">{m}</span>)}</p>
        </div>
      </div>
    </footer>
  );
}
