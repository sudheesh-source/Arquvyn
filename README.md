# arquvyn — Coming Soon Landing Page

A fast, lightweight, single-page static "coming soon" website for **arquvyn**, an AI-powered experiential learning platform.

> **Tagline:** Live Your Future Before You Choose It.  
> **Status:** Under development, launching soon.

---

## 📁 File Structure

```text
├── assets/
│   └── logo.png  # Brand logo used in header, favicon, and background watermark
├── index.html    # Semantic HTML5 layout with Open Graph & accessibility tags
├── style.css     # CSS custom property palette extracted from logo & responsive design
├── script.js     # Scroll-reactive background watermark & navigation script
└── README.md     # Deployment and usage guide
```

No build tools, bundlers, or external dependencies required.

---

## 🎨 Design System & Background Watermark Customization

### Color Palette (:root)

All colors are controlled entirely through CSS variables in the `:root` block of [style.css](file:///c:/Users/Admin/OneDrive/Documents/arkoyin/style.css):

```css
:root {
  /* Theme Colors */
  --bg: #040711;            /* Primary deep midnight background */
  --bg-secondary: #070c18;  /* Alternating section background */
  --surface: #0c1424;       /* Card surface */
  --surface-hover: #121d33; /* Card hover surface */
  --text: #f8fafc;          /* High-contrast text (19.2:1 contrast ratio) */
  --muted: #94a3b8;         /* Supporting text (7.8:1 contrast ratio) */
  --accent: #38bdf8;        /* Primary Accent: Electric Sky / Cobalt Cyan from logo */
  --accent-2: #e2b774;      /* Secondary Accent: Champagne Gold from logo */
  --border: #1a2639;        /* Default borders */
}
```

### Background Logo Watermark

The large logo background effect is fully configurable via CSS variables in [style.css](file:///c:/Users/Admin/OneDrive/Documents/arkoyin/style.css) and constants at the top of [script.js](file:///c:/Users/Admin/OneDrive/Documents/arkoyin/script.js):

- **Start Opacity**: `0.20` (keeps text contrast at WCAG AAA/AA)
- **Desktop Width**: `55vw` (max 760px)
- **Mobile Width**: `80vw`
- **Downward Travel**: `120px` at full fade
- **Fade Distance**: `100vh` (completely transparent by 1 screen of scrolling)
- **Performance**: Uses native CSS `animation-timeline: scroll()` with hardware-accelerated `requestAnimationFrame` fallback. Respects `prefers-reduced-motion`.

---

## 🚀 Deployment Instructions

### 1. Deploying to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: arquvyn coming soon page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and `/ (root)`.
4. Click **Save**. Your site will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

### 2. Deploying to Netlify

#### Option A: Drag and Drop (Fastest, No Git Required)
1. Go to [app.netlify.com](https://app.netlify.com/) and log in.
2. Drag and drop this folder directly into the Netlify drop zone.
3. Your site is immediately live with an assigned URL.

#### Option B: Via Git Integration
1. In Netlify, click **Add new site** > **Import an existing project**.
2. Connect your repository.
3. Leave **Build command** empty and set publish directory to `.`.
4. Click **Deploy**.

---

### 3. Deploying to Vercel

```bash
npx vercel
```
Accept the defaults (root directory `./`, no build command).

---

## 📄 License & Credits

&copy; 2026 arquvyn. All rights reserved. Platform under development.
