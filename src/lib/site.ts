// Central business details — edit these once and they update across the whole site.
export const site = {
  name: "Khanz Butchery",
  short: "Khanz",
  tagline: "Premium halal meat, cut fresh every morning",
  currency: "NZD",
  phone: "+64 21 000 0000", // TODO: replace with the real number
  whatsapp: "64210000000", // digits only, used for wa.me links
  email: "hello@khanzbutchery.com",
  address: "Shop 0, Main Road, Auckland, New Zealand", // TODO: replace with the real address
  hours: "Daily 8:00 am – 7:00 pm",
  freeDeliveryOver: 150,
  deliveryFee: 12,
  cutOff: "Order before 3 PM for same-day delivery",
  coupon: { code: "KHANZ20", percent: 20 },
};

export const formatPrice = (n: number) =>
  n.toLocaleString("en-NZ", { style: "currency", currency: site.currency, minimumFractionDigits: 2 }); // → $32.00

/** Unsplash CDN helper — photos are free to use under the Unsplash License. */
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
