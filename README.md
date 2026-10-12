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

---

## Deployment — CyberPanel (OpenLiteSpeed) + PM2 + Cloudflare Tunnel

Live at **https://butcher.qaam.work**. Next.js runs as a Node process on port **3001** (managed by PM2), and OpenLiteSpeed proxies the domain to it.

```
Visitor → Cloudflare Tunnel (https://192.168.1.39:443) → OpenLiteSpeed vhost → 127.0.0.1:3001 (Next.js via PM2)
```

### 1. Folder layout

Clone the repo **next to** `public_html`, never inside it (anything in `public_html` can be served as static files, which would expose the source and `node_modules`):

```
/home/butcher.qaam.work/
├── butcher/        ← this repo
├── logs/
└── public_html/    ← leave as is (not used by the app)
```

```bash
cd /home/butcher.qaam.work
git clone <repo-url> butcher
```

Requires **Node.js 20.9+** (`node -v`) and PM2 (`npm i -g pm2`).

### 2. Build and start with PM2

```bash
cd /home/butcher.qaam.work/butcher
npm ci
npm run build
PORT=3001 pm2 start npm --name butcher -- start
pm2 save
pm2 startup        # run the command it prints, so the app starts after a reboot
```

Check it's running:

```bash
pm2 status                       # exactly one "butcher", status online
curl -I http://127.0.0.1:3001    # should return HTTP/1.1 200 OK
```

> Only start it **once**. If `pm2 status` shows two `butcher` entries, run `pm2 delete butcher` and start it again.

### 3. CyberPanel vHost config

CyberPanel → **Websites → List Websites → butcher.qaam.work → Manage → vHost Conf**.

Keep everything that is already there and add this block **above the `vhssl { … }` section** (the existing `/.well-known/acme-challenge` context must stay so SSL renewals keep working):

```
# ---------- Next.js app (Khanz Butchery) ----------
extprocessor nextbutcher {
  type                    proxy
  address                 127.0.0.1:3001
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 nextbutcher
  addDefaultCharset       off
}
# ---------------------------------------------------
```

Save, then restart OpenLiteSpeed and test:

```bash
systemctl restart lsws
curl -k -I https://127.0.0.1 -H "Host: butcher.qaam.work"   # should include: x-powered-by: Next.js
```

### 4. Cloudflare Tunnel

Public hostname `butcher.qaam.work` → **HTTPS** → `192.168.1.39:443` (same settings as the other CyberPanel sites, e.g. No TLS Verify on).

### Updating the site

```bash
cd /home/butcher.qaam.work/butcher
git pull
npm ci
npm run build
pm2 restart butcher
```

### Troubleshooting

| Symptom | Fix |
|---|---|
| "CyberPanel Installed" placeholder page | vHost proxy block missing or `lsws` not restarted (step 3) |
| 503 Service Unavailable | App not running on 3001 → `pm2 status`, `pm2 logs butcher` |
| `Could not find a production build` in logs | Run `npm run build`, then `pm2 restart butcher` |
| Build killed / "heap out of memory" | Give the VM more RAM or add swap |
| Old version still showing | Hard refresh (Ctrl+F5) or purge Cloudflare cache |
