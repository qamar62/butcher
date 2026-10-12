import { Clock, Phone, Truck } from "lucide-react";
import { site, formatPrice } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="bg-ink text-[13px] text-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        <p className="flex items-center gap-2">
          <Truck size={15} className="text-brand" /> Free delivery on orders above {formatPrice(site.freeDeliveryOver)}
        </p>
        <p className="hidden items-center gap-2 md:flex">
          <Clock size={15} className="text-brand" /> {site.cutOff}
        </p>
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hidden items-center gap-2 transition hover:text-white sm:flex">
          <Phone size={15} className="text-brand" /> {site.phone}
        </a>
      </div>
    </div>
  );
}
