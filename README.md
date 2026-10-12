# Khanz Butchery — Next.js website

Premium halal butcher shop site for the New Zealand market (prices in NZD, GST-inclusive): sliding hero, home page, shop with filters, product pages and a cart with WhatsApp checkout.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Where to edit

| What | File |
|---|---|
| Phone, WhatsApp number, address, hours, delivery fee, coupon | `src/lib/site.ts` |
| Products, prices, categories, photos | `src/lib/products.ts` |
| Hero slides | `src/components/home/HeroSlider.tsx` |
| Home sections (stats, testimonials, recipes…) | `src/components/home/Sections.tsx` |
| Colours & fonts | `src/app/globals.css` (`@theme`) |

**Before launch:** replace the placeholder phone/WhatsApp/address in `site.ts`, the placeholder reviews in `Sections.tsx` (`reviews`), and the stats figures in `Standards()`.

Photos come from Unsplash (free under the Unsplash License) and load from `images.unsplash.com`. To use your own photos, drop them in `public/` and change the image values to e.g. `/ribeye.jpg` (and update `img()` in `site.ts`).

Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion · lucide-react.
"# butcher" 
