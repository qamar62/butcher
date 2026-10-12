export type CategoryId = "beef" | "lamb" | "chicken" | "bbq" | "boxes";

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number; // price for the base weight
  oldPrice?: number;
  unit: string; // e.g. "500g", "1 box"
  image: string; // Unsplash photo id
  short: string;
  badge?: "Bestseller" | "New" | "Sale" | "Chef's pick";
  contents?: string[]; // for meat boxes
  weights?: { label: string; factor: number }[];
};

export const categories: { id: CategoryId; name: string; image: string; blurb: string }[] = [
  { id: "beef", name: "Beef", image: "photo-1603048297172-c92544798d5a", blurb: "Steaks, roasts & mince" },
  { id: "lamb", name: "Lamb & Mutton", image: "photo-1628543108325-1c27cd7246b3", blurb: "Chops, legs & curry cuts" },
  { id: "chicken", name: "Chicken", image: "photo-1672787153720-e85fe802fd9f", blurb: "Whole birds & fillets" },
  { id: "bbq", name: "BBQ & Marinated", image: "photo-1508615263227-c5d58c1e5821", blurb: "Ready for the grill" },
  { id: "boxes", name: "Meat Boxes", image: "photo-1690983323238-0b91789e1b5a", blurb: "Curated bundles" },
];

const W = [
  { label: "500g", factor: 1 },
  { label: "1kg", factor: 1.9 },
  { label: "2kg", factor: 3.6 },
];

export const products: Product[] = [
  // Beef
  { slug: "ribeye-steak", name: "Ribeye Steak", category: "beef", price: 32, oldPrice: 36, unit: "500g", image: "photo-1603048297172-c92544798d5a", short: "Richly marbled, grain-fed ribeye, cut thick for the perfect sear.", badge: "Bestseller", weights: W },
  { slug: "tenderloin-fillet", name: "Beef Tenderloin Fillet", category: "beef", price: 45, oldPrice: 52, unit: "500g", image: "photo-1588347818036-558601350947", short: "The most tender cut on the animal — melt-in-the-mouth fillet.", badge: "Sale", weights: W },
  { slug: "striploin-steak", name: "Striploin Steak", category: "beef", price: 28, unit: "500g", image: "photo-1690983330536-3b0089d07cf9", short: "Classic New York strip with a firm bite and bold beefy flavour.", weights: W },
  { slug: "tomahawk-steak", name: "Tomahawk Steak", category: "beef", price: 69, unit: "1.2kg", image: "photo-1690983322025-aab4f95a0269", short: "The showstopper: long-bone ribeye made for sharing.", badge: "Chef's pick" },
  { slug: "beef-short-ribs", name: "Beef Short Ribs", category: "beef", price: 22, unit: "500g", image: "photo-1690983321750-ad6f6d59a84b", short: "Meaty ribs ideal for slow braising or low-and-slow smoking.", weights: W },
  { slug: "lean-beef-mince", name: "Lean Beef Mince", category: "beef", price: 12, unit: "500g", image: "photo-1602470521006-59ab77068b0d", short: "Freshly minced in-store daily — 90% lean.", weights: W },

  // Lamb & mutton
  { slug: "lamb-chops", name: "Lamb Chops", category: "lamb", price: 29, unit: "500g", image: "photo-1628543108325-1c27cd7246b3", short: "Frenched rib chops from young lamb — tender and juicy.", badge: "Bestseller", weights: W },
  { slug: "lamb-leg-bone-in", name: "Lamb Leg (Bone-in)", category: "lamb", price: 38, unit: "2kg", image: "photo-1603048374877-b98f840ad441", short: "Whole leg for roasting, ouzi or a family feast." },
  { slug: "mutton-curry-cut", name: "Mutton Curry Cut", category: "lamb", price: 14, unit: "500g", image: "photo-1602470520998-f4a52199a3d6", short: "Bone-in pieces cut for karahi, curry and biryani.", badge: "New", weights: W },

  // Chicken
  { slug: "whole-chicken", name: "Whole Fresh Chicken", category: "chicken", price: 16, unit: "1.6kg", image: "photo-1672787153720-e85fe802fd9f", short: "Farm-fresh whole bird, cleaned and ready to cook.", badge: "Bestseller" },
  { slug: "chicken-breast", name: "Boneless Chicken Breast", category: "chicken", price: 9.5, unit: "500g", image: "photo-1633096013004-e2cb4023b560", short: "Skinless fillets — lean, versatile and hand-trimmed.", weights: W },
  { slug: "chicken-drumsticks", name: "Chicken Drumsticks", category: "chicken", price: 6.5, unit: "500g", image: "photo-1587593810167-a84920ea0781", short: "Juicy drumsticks, perfect for roasting or the grill.", weights: W },

  // BBQ & marinated
  { slug: "tikka-boti", name: "Marinated Tikka Boti", category: "bbq", price: 15, unit: "500g", image: "photo-1508615263227-c5d58c1e5821", short: "Our house tikka marinade — smoky, spicy, skewer-ready.", badge: "Bestseller", weights: W },
  { slug: "seekh-kebab", name: "Seekh Kebab", category: "bbq", price: 14, unit: "500g", image: "photo-1529262365544-55d1707e64e6", short: "Hand-blended minced lamb with fresh herbs and spices.", weights: W },
  { slug: "bbq-beef-ribs", name: "BBQ Beef Ribs", category: "bbq", price: 34, unit: "1kg", image: "photo-1550367363-ea12860cc124", short: "Dry-rubbed and ready for low-and-slow smoking.", badge: "New" },
  { slug: "mixed-grill-platter", name: "Mixed Grill Platter", category: "bbq", price: 59, oldPrice: 69, unit: "serves 4", image: "photo-1766589152455-22eb3ab8849e", short: "Lamb chops, sausages, tikka and kebabs in one tray.", badge: "Sale" },

  // Meat boxes
  { slug: "everyday-essentials-box", name: "Everyday Essentials Box", category: "boxes", price: 89, unit: "1 box", image: "photo-1666013942642-b7b54ecafd7d", short: "Your weekly basics, sorted.", contents: ["1kg beef mince", "1kg chicken breast", "1kg mutton curry cut", "1 whole chicken"] },
  { slug: "family-week-box", name: "Family Week Box", category: "boxes", price: 129, unit: "1 box", image: "photo-1690983323238-0b91789e1b5a", short: "Feeds a family of four all week.", badge: "Bestseller", contents: ["2 whole chickens", "1kg lamb leg", "1kg beef mince", "1kg drumsticks", "500g seekh kebab"] },
  { slug: "bbq-weekend-box", name: "BBQ Weekend Box", category: "boxes", price: 149, unit: "1 box", image: "photo-1558030137-a56c1b004fa3", short: "Everything for a proper weekend grill.", contents: ["1kg tikka boti", "1kg seekh kebab", "1kg lamb chops", "1kg BBQ beef ribs"] },
  { slug: "steak-lovers-box", name: "Steak Lovers Box", category: "boxes", price: 169, oldPrice: 189, unit: "1 box", image: "photo-1690983323540-d6e889c4b107", short: "Four premium cuts, hand-picked by our head butcher.", badge: "Sale", contents: ["2 ribeye steaks", "2 striploin steaks", "2 tenderloin medallions", "Herb butter"] },
  { slug: "chicken-combo-box", name: "Chicken Combo Box", category: "boxes", price: 69, unit: "1 box", image: "photo-1672787153655-0c19308dcc60", short: "Every cut of chicken you need.", contents: ["2 whole chickens", "1kg breast fillets", "1kg drumsticks", "500g wings"] },
  { slug: "butchers-choice-box", name: "Butcher's Choice Box", category: "boxes", price: 199, oldPrice: 229, unit: "1 box", image: "photo-1613454320437-0c228c8b1723", short: "Our best cuts of the week — a surprise every time.", badge: "Chef's pick", contents: ["Tomahawk steak", "1kg lamb chops", "1kg tenderloin", "1kg tikka boti", "Seasonal special"] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (c: CategoryId) => products.filter((p) => p.category === c);
