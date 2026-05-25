# Cosmetic World — Next.js Website

A production-grade luxury beauty e-commerce website built with:
- **Next.js 14** — React framework
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations and scroll reveals
- **Three.js / React Three Fiber** — 3D animated hero background

---

## 🚀 HOW TO RUN (Step by Step)

### Step 1 — Install Node.js
Download from: https://nodejs.org  
Install the **LTS version** (e.g. 20.x)

### Step 2 — Open this folder in VS Code
File → Open Folder → select the `cosmetic-world` folder

### Step 3 — Open the Terminal in VS Code
View → Terminal  (or press Ctrl + `)

### Step 4 — Install dependencies
```bash
npm install
```
This downloads all packages. Takes 2–3 minutes the first time.

### Step 5 — Run the development server
```bash
npm run dev
```

### Step 6 — Open your browser
Go to: **http://localhost:3000**

Your website is live! It auto-refreshes whenever you save a file.

---

## 🖼️ WHERE TO ADD YOUR PICTURES

There are **6 picture slots** across the website. Here's exactly where each one goes:

---

### Picture 1 — Product: 24K Gold Face Wash
**File:** `components/Products.js` — Line ~30  
**Variable:** `image: null`  
**Change to:** `image: '/images/gold-face-wash.jpg'`  
**Recommended size:** 600 × 750 px (portrait)

### Picture 2 — Product: Ancient Glow Rice Protein Shampoo
**File:** `components/Products.js` — Line ~40  
**Variable:** `image: null`  
**Change to:** `image: '/images/rice-shampoo.jpg'`  
**Recommended size:** 600 × 750 px

### Picture 3 — Product: Tea Tree Face Wash
**File:** `components/Products.js` — Line ~50  
**Variable:** `image: null`  
**Change to:** `image: '/images/tea-tree-wash.jpg'`  
**Recommended size:** 600 × 750 px

### Picture 4 — Product: Lavenders Bead Shower Gel
**File:** `components/Products.js` — Line ~60  
**Variable:** `image: null`  
**Change to:** `image: '/images/lavender-gel.jpg'`  
**Recommended size:** 600 × 750 px

### Picture 5 — Brand Story (Our Story section)
**File:** `components/AboutBrand.js` — Line ~12  
**Variable:** `const BRAND_IMAGE = null`  
**Change to:** `const BRAND_IMAGE = '/images/brand-story.jpg'`  
**Recommended size:** 800 × 1000 px (portrait lifestyle photo)

### Picture 6 — Founder Portrait (Azlan Khan)
**File:** `components/AboutMe.js` — Line ~18  
**Variable:** `const FOUNDER_IMAGE = null`  
**Change to:** `const FOUNDER_IMAGE = '/images/azlan-khan.jpg'`  
**Recommended size:** 700 × 900 px (professional headshot)

---

## 📁 HOW TO ADD IMAGE FILES

1. Put all your image files inside the **`public/images/`** folder
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
3. Use WebP format for best performance
4. Then update the variable in the component as shown above

---

## 🛒 SHOPIFY INTEGRATION (When you buy the plan)

When your Shopify plan is active:

1. In Shopify Admin → Sales Channels → Buy Button
2. Create a Buy Button for each product
3. Copy the embed code Shopify gives you
4. In `components/Products.js`, replace the `addToCart` button with the Shopify embed code

---

## 🏗️ PROJECT STRUCTURE

```
cosmetic-world/
├── pages/
│   ├── _app.js          ← App wrapper (fonts, global CSS)
│   └── index.js         ← Main page (assembles all sections)
├── components/
│   ├── Navbar.js        ← Fixed navigation bar
│   ├── Hero.js          ← Hero section with Three.js canvas
│   ├── HeroCanvas.js    ← Three.js 3D rings + starfield
│   ├── Marquee.js       ← Scrolling ticker strip
│   ├── Products.js      ← 4 product cards  ← ADD PRODUCT IMAGES HERE
│   ├── AboutBrand.js    ← Brand story section  ← ADD BRAND IMAGE HERE
│   ├── Values.js        ← 4 brand values strip
│   ├── AboutMe.js       ← Azlan Khan founder section  ← ADD FOUNDER PHOTO HERE
│   ├── Testimonials.js  ← 3 customer reviews
│   ├── FooterNewsletter.js ← Newsletter + Footer
│   ├── Toast.js         ← Cart notification
│   └── Cursor.js        ← Custom gold cursor
├── public/
│   └── images/          ← PUT ALL YOUR IMAGES HERE
├── styles/
│   └── globals.css      ← Global styles + font imports
├── tailwind.config.js   ← Tailwind theme (colors, fonts)
├── postcss.config.js
└── package.json
```

---

## 🎨 FONTS USED

| Font | Used for | Weight |
|------|----------|--------|
| Playfair Display | Section titles, product names | Black (900) |
| Fraunces | Italic accents, quotes | Bold (700) |
| Bebas Neue | Logo, accent caps | Regular |
| DM Sans | Body text, buttons | 400, 500, 600 |
| DM Mono | Tags, labels, metadata | 400 |

---

## 🌐 DEPLOYING TO THE INTERNET (Free)

Use **Vercel** — the creators of Next.js:
1. Push this project to GitHub
2. Go to vercel.com → Import your GitHub repo
3. Click Deploy — done. Your site gets a free `.vercel.app` URL.
4. Later connect your own domain (e.g. cosmeticworld.pk)
