// Central business details — edit these once and they update across the whole site.
export const site = {
  name: "Makkah Halal Meats",
  short: "Makkah",
  tagline: "The fresh choice for quality halal meat",
  currency: "NZD",
  phone: "+64 9 620 7080",
  whatsapp: "64210000000", // TODO: real WhatsApp mobile number, digits only (e.g. 6421xxxxxxx)
  email: "makkahhalalmeats25@gmail.com",
  address: "139 Great South Road, Papatoetoe, Auckland",
  hours: "Daily 8:00 am – 7:00 pm",
  freeDeliveryOver: 150,
  deliveryFee: 12,
  cutOff: "Order before 3 PM for same-day delivery",
  coupon: { code: "MAKKAH20", percent: 20 },
  showRecipes: false, // set to true to bring back the Recipes section + menu links
};

export const formatPrice = (n: number) =>
  n.toLocaleString("en-NZ", { style: "currency", currency: site.currency, minimumFractionDigits: 2 }); // → $32.00

/** Unsplash CDN helper — photos are free to use under the Unsplash License. */
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
