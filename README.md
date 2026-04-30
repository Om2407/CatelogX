# CatalogX — Dynamic Multi-Category Product Catalog

> A sleek, animated React application that dynamically renders a multi-category product catalog from a structured JSON dataset.

**Assignment:** Frontend Developer Assignment — Dynamic Multi-Category Catalog

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI library |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Framer Motion | Animations & page transitions |
| Tailwind CSS v3 | Utility-first styling |
| Lucide React | Icons |

---

## Features

- Home Screen with 4 categories segregated clearly
- Real-time search across item names, categories, and all itemprops values
- Category filter pills with live item count
- Dynamic Detail Page — iterates itemprops[] to render all specs (no hardcoded fields)
- Related items section on detail page
- Framer Motion staggered animations & page transitions
- Ambient category glow (Cars: amber, Bikes: rose, Phones: cyan, Computers: violet)
- Responsive grid — works on 320px mobile to desktop
- Image fallback on load error
- Vercel SPA routing via vercel.json

---

## Project Structure

```
src/
├── data/
│   └── catalog.js          # JSON dataset + category config
├── components/
│   ├── Navbar.jsx           # Sticky nav with back button
│   ├── ItemCard.jsx         # Product card with hover glow
│   └── CategorySection.jsx  # Category header + grid
├── pages/
│   ├── HomePage.jsx         # Hero + search + filter + catalog
│   └── DetailPage.jsx       # Dynamic spec rendering
├── App.jsx                  # Routes + AnimatePresence
└── main.jsx
```

---

## Run Locally

```bash
git clone <your-repo-url>
cd catalog-app
npm install
npm run dev
```

Open http://localhost:5173

---

## Deploy to Vercel

```bash
npm run build
```

Drag `dist/` folder to vercel.com/new, or run `npx vercel --prod`.

The `vercel.json` handles SPA routing so direct URLs work correctly.

---

## Write-Up

### Approach

The core challenge was dynamic rendering — since each category has completely different properties (RPM for Cars vs Lens Type for Phones), the app never hardcodes field names. Instead it iterates over itemprops[] and renders every {label, value} pair generically. Adding any new item with any props to catalog.js renders it automatically.

### Architecture Decisions

- React Router for proper URL-based navigation — each item gets a shareable URL (/item/Tesla Model 3)
- Framer Motion AnimatePresence for page transitions and staggered card animations
- Central CAT_CONFIG object maps each category to its color, icon, and CSS values — single source of truth
- Inline styles for dynamic color values, Tailwind for layout utilities

### Time Taken

~3-4 hours:
- 30 min: Setup
- 1.5 hrs: Home page
- 1 hr: Detail page
- 1 hr: Polish, animations, README

---

## Author

Om Gupta — Frontend Developer | MERN Stack  
GitHub: Om2407 | LinkedIn: om-gupta-4a3549294 | guptaom203@gmail.com
