# YSG Media Portfolio & Digital Agency Website

Welcome to the YSG Media website codebase. This repository is structured specifically for a single, non-technical founder utilizing AI assistance for website maintenance. 

All content, styling tokens, case studies, metadata, and services are governed by a **centralized, schema-driven data architecture**. Updates to the website can be made entirely by editing JSON data files inside the `/data` folder. No direct HTML or JavaScript code changes are required for routine updates.

---

## 🛠️ Technology Stack & Architecture

*   **Build Tool & Dev Server**: [Vite](https://vitejs.dev/) - A lightning-fast modern build tool.
*   **Core Logic**: Vanilla JavaScript (ES Modules) - Lightweight, no-framework overhead, extremely fast runtime.
*   **Styling**: Pure CSS (utilizing global design tokens via CSS Custom Properties). No heavy CSS frameworks.
*   **Content Management**: Unified JSON files in `/data/`.
*   **Hosting & Deployment**: Static hosting on platforms like Netlify, Vercel, or GitHub Pages.

---

## 📂 Project Structure

```text
ysgmedia-portfolio/
├── .github/workflows/      # Automated deployment configurations
├── docs/                   # Full operational and maintenance guidelines
│   ├── content-management.md
│   ├── seo-guide.md
│   ├── blog-guide.md
│   ├── case-study-guide.md
│   ├── design-system.md
│   └── deployment-guide.md
├── data/                   # Centralized database (JSON)
│   ├── company.json
│   ├── services.json
│   ├── case-studies.json
│   ├── testimonials.json
│   ├── industries.json
│   ├── blogs.json
│   ├── seo.json
│   ├── faqs.json
│   ├── contact.json
│   └── stats.json
├── components/             # Reusable UI component modules
├── pages/                  # Static page templates
├── assets/                 # Global styles, client JS, and assets
│   ├── css/
│   ├── js/
│   └── images/
├── public/                 # Static files (sitemap, robots, icons)
├── package.json            # Node project configuration
├── vite.config.js          # Build tool configuration
└── README.md               # You are here
```

---

## 🚀 Getting Started

### Prerequisites
You need [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Local Development
To run the website locally and preview your updates:

1.  Open your terminal in the project directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

### Building for Production
To package the site into highly optimized, static assets for deployment:
```bash
npm run build
```
This generates a `dist/` directory containing raw HTML, optimized JS, CSS, and compressed images ready to be loaded by any static web server.

---

## ✍️ Content Maintenance Quick Links

For step-by-step guides on how to update site parameters or utilize AI assistants:
*   [Content Management Guide](file:///d:/ysgmedia-portfolio/docs/content-management.md) — How to update baseline info, FAQs, contact details, and statistics.
*   [SEO Guide](file:///d:/ysgmedia-portfolio/docs/seo-guide.md) — Managing tags, search keywords, schemas, and sitemaps.
*   [Blog Guide](file:///d:/ysgmedia-portfolio/docs/blog-guide.md) — Formatting and adding fresh articles.
*   [Case Study Guide](file:///d:/ysgmedia-portfolio/docs/case-study-guide.md) — Documenting client results and metrics.
*   [Design System Guide](file:///d:/ysgmedia-portfolio/docs/design-system.md) — Typography scales, core variables, and styles.
*   [Deployment Guide](file:///d:/ysgmedia-portfolio/docs/deployment-guide.md) — Production hosting operations.

---

## ⚠️ Common Pitfalls & Rules

1.  **Do Not Edit HTML Files Directly**: To change text, titles, links, or numbers, search for the appropriate JSON file in `/data/` and edit it there instead.
2.  **Verify JSON Formats**: Always validate JSON syntax. A missing quote, comma, or brace will prevent the site from loading. Use web tools or an AI assistant to verify JSON structure if a local build fails.
3.  **Optimize Images**: Never upload original camera images directly. Compress them to `.webp` or `.jpg` formats and keep file sizes under **150KB** to maintain performance benchmarks.
