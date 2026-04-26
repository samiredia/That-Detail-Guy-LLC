# That Detail Guy — Premium Detailing Website

Production-ready, single-page website for **That Detail Guy**.

---

## 📂 Project structure

```
thastdetailguyllc/
├── index.html          ← markup (SEO, structured data, all sections)
├── styles.css          ← full design system + responsive layout
├── script.js           ← cursor, particles, reveal, form, gallery filter
├── assets/
│   └── images/         ← drop your real photos here (see README.txt inside)
└── README.md           ← this file
```

No build step. No dependencies. **Open `index.html` in any browser** — that's it.

---

## 🚀 Deploy

Pick whichever you like, all work zero-config:

| Host | How |
|------|-----|
| **Netlify** | Drag-and-drop the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel**  | `vercel` in the folder, or drag-and-drop on [vercel.com/new](https://vercel.com/new) |
| **GitHub Pages** | Push to a repo, enable Pages → branch root |
| **Cloudflare Pages** | Connect repo, framework: *None*, build: *(empty)*, output: `/` |
| **Static host** | Upload the 3 files + `assets/` to your host |

---

## ✏️ What to customize

### 1. Real photos (gallery / hero)
Drop JPG / PNG / WebP files into `assets/images/`, then in `index.html` find each `<figure class="g-tile">` and replace the colored placeholder with:

```html
<figure class="g-tile" data-cat="exterior">
  <img src="assets/images/exterior-1.jpg" alt="Exterior detail" loading="lazy">
  <figcaption>Exterior · Hand Wax</figcaption>
</figure>
```

Add this small CSS snippet to `styles.css` if you use real `<img>`:
```css
.g-tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
```

### 2. Real reviews
Section `#reviews` in `index.html` — replace each `<article class="review-card">` with copy from your real Google / Facebook reviews.

### 3. Connect the booking form
Open `script.js` and find the **TODO: connect to a real backend** block.

- **Formspree** (easiest): create a form at [formspree.io](https://formspree.io), copy the endpoint, then either:
  - Add `action="https://formspree.io/f/YOUR_ID" method="POST"` on the `<form>` and remove `e.preventDefault()`, **or**
  - Use the `fetch()` snippet shown in the comments.

- **Netlify Forms**: deploy on Netlify, then add `data-netlify="true" name="booking"` to the `<form>` and a hidden `<input type="hidden" name="form-name" value="booking">`.

- **EmailJS**: sign up at [emailjs.com](https://www.emailjs.com), include their SDK, and uncomment the `emailjs.send(...)` line.

### 4. Update business info
| Where | What |
|-------|------|
| `index.html` `<head>` → `<title>` / `<meta name="description">` / Open Graph | Final SEO copy |
| `index.html` JSON-LD block | `address`, opening hours, geo if you want richer SEO |
| Phone number `+1 (916) 298-5424` | Already wired — replace globally if it changes |
| Social links (Facebook / Instagram / Google Maps) | Already wired in nav, reviews, contact and footer |

---

## ⚙️ Features

- ✅ Sticky header w/ blur, transparent → solid on scroll
- ✅ Mobile hamburger menu + floating call button
- ✅ Custom cursor (desktop)
- ✅ Animated SVG luxury car w/ shine sweep, water beads, floating badges
- ✅ Hero canvas particle system (mist + glow orbs) with offscreen pause
- ✅ Count-up stats
- ✅ Reveal-on-scroll (IntersectionObserver, with delays)
- ✅ Service cards with 3D tilt
- ✅ Filterable gallery (interior / exterior / paint / ceramic / before-after)
- ✅ Pricing grid w/ "Most Booked" highlight
- ✅ Vertical timeline process section
- ✅ Reviews + social CTAs
- ✅ Full booking form (10 fields + condition + message)
- ✅ Embedded Google Maps with dark filter
- ✅ Schema.org `AutoDetailing` structured data
- ✅ Open Graph + Twitter Card meta
- ✅ Responsive: desktop / tablet / mobile
- ✅ Reduced-data fonts via Google Fonts preconnect
- ✅ No JS framework, no build, no install

---

## 📞 Business

- **Name**: That Detail Guy
- **Phone**: +1 (916) 298-5424
- **Facebook**: <https://www.facebook.com/ThatDetailGuy93/>
- **Instagram**: <https://www.instagram.com/that_detail_guy93/>
- **Google Maps**: <https://maps.app.goo.gl/H8z6R6aKnMnJ5HV19>

---

Built with attention to detail. 🧼
