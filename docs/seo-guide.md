# SEO Strategy & Metadata Guide

## 📌 Purpose
This document outlines the search engine optimization (SEO) architecture of the YSG Media website. Because search traffic is a key lead generation channel for the agency, the system automatically builds and injects search-friendly parameters, tags, and structured schema schemas using static data files.

---

## 📂 Managed Files & Setup

### 1. `seo.json`
*   **Purpose**: A centralized mapping file associating website paths with target search engine settings.
*   **Key Fields**:
    *   `title`: The tag title displayed on search engine results pages (keep under 60 characters).
    *   `description`: The snippet summary shown underneath the title (keep under 160 characters).
    *   `keywords`: An array of search strings targeting user search query mapping.
    *   `ogImage`: Absolute path pointing to the OpenGraph thumbnail layout.
    *   `schemaType`: Instructs the engine parser which schema format to bind (e.g. `Organization`, `Service`, `FAQPage`).

---

## 🛠️ SEO Architecture Breakdown

### 1. Dynamic Metadata Injection
When a user (or search crawler) loads a page, the global site header runs a small, non-blocking script that checks the current path (`window.location.pathname`). It matches the path against `seo.json` and overrides:
*   `<title>`
*   `<meta name="description">`
*   `<meta name="keywords">`
*   OpenGraph tags (`og:title`, `og:description`, `og:image`)
*   Twitter Card tags (`twitter:title`, `twitter:description`, `twitter:image`)

### 2. Local SEO Optimization
To target local search traffic (e.g., businesses looking for a local Boston marketing agency), the system dynamically binds local data:
*   **NAP Consistency**: The Name, Address, and Phone details are pulled directly from `contact.json` and rendered in the page footer.
*   **LocalBusiness Schema**: Automatically included in the homepage JSON-LD block.

### 3. Schema Markup Strategy
Search engine crawler schemas are programmatically created in `content-loader.js` and appended to the document header.
*   **Organization**: Binds brand identifiers, social channels, and founder names.
*   **Service**: Binds pricing scales, categories, and geographic target constraints.
*   **FAQPage**: Generates rich search results cards for lists in `faqs.json`.
*   **BlogPosting**: Maps article parameters, read durations, and author citations.

### 4. Internal Linking & Silo Framework
To build page rank authority:
*   Articles in the blog must link to their associated service vertical (e.g. an organic ranking article about SEO retainer budgets links directly to `/services.html#seo-growth`).
*   The footer houses direct links to all core pages and individual service sections to ensure search crawlers can index pages in under three hops.

---

## 🛠️ How Future Updates Should Be Done

### Adjusting Meta Tags
1.  Open `data/seo.json`.
2.  Find the object corresponding to the route you want to update (e.g., `/services.html`).
3.  Rewrite the `title` or `description` strings, keeping within optimal length margins.

### AI-Assisted Prompts
> "Analyze the meta description for '/about.html' inside data/seo.json. Optimize it to target local B2B brands and keep it under 155 characters."

---

## ⚠️ Common Mistakes to Avoid

1.  **Exceeding Length Limits**: Overly long titles and descriptions are truncated by Google. Keep titles below **60 characters** and descriptions below **160 characters**.
2.  **Duplicate Descriptions**: Avoid copying the home page description to all inner subpages. Each page must have a unique description mapping to its specific objective.
3.  **Mismatched NAP Data**: If the agency address or phone number changes in `contact.json`, ensure any manual local listings (like Google Business Profile, Yelp, or Clutch) are updated to match exactly. Inconsistent NAP listings hurt local ranking authority.
