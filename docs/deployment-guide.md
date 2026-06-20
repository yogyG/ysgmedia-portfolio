# Site Deployment & Hosting Guide

## 📌 Purpose
This document provides instructions for compiling, building, and deploying the YSG Media website. The platform is built as a static site generated via Vite, meaning it compiles into pure HTML, CSS, and JS files. This architecture allows the site to be hosted on free, secure static web hosts with automatic HTTPS and global CDN delivery.

---

## 🚀 Deployment Platforms

We recommend the following providers due to their speed, simplicity, and direct integration with GitHub.

### Option A: Netlify (Recommended)
1.  Connect your GitHub repository to Netlify.
2.  Configure the build settings:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
3.  Click **Deploy site**.
4.  Netlify will automatically build and publish the site every time you push an update to your GitHub `main` branch.

### Option B: Vercel
1.  Create a Vercel account and select **Import Project**.
2.  Link your GitHub repository.
3.  Vercel automatically detects Vite configurations. Confirm the build command is `npm run build` and output folder is `dist`.
4.  Click **Deploy**.

---

## 🛠️ How Future Updates Should Be Done

### Standard Git Workflow
Every content change inside `/data/` or codebase update requires a git commit to trigger an automatic redeployment.

```bash
# 1. Stage updated data files
git add data/

# 2. Commit changes with a descriptive message
git commit -m "content: update stats and customer testimonials"

# 3. Push to GitHub (triggers Netlify/Vercel automatic rebuild)
git push origin main
```

### Direct Manual Upload (No-Git Option)
If you do not want to use Git commands:
1.  Run the build command locally:
    ```bash
    npm run build
    ```
2.  Log into your Netlify dashboard.
3.  Drag and drop the generated `dist/` directory directly into the Netlify manual deploy console.

---

## ⚠️ Common Mistakes to Avoid

1.  **Setting the Wrong Publish Directory**: Ensure the publish target is set to `dist` (all lowercase). If set to `build` or `/`, the hosting service will either serve empty folders or expose raw build configuration scripts to public visitors.
2.  **Skipping Local Build Checks**: Always run `npm run build` locally before pushing code updates to GitHub. This validates that all JSON configuration assets are formatted correctly and compile without syntax errors.
3.  **Missing Custom Domain DNS Settings**: When routing your custom domain (e.g. `ysgmedia.com`), make sure to configure a CNAME record pointing to your hosting provider's default URL, and verify that the SSL/HTTPS certificate has fully provisioned (usually takes 10-30 minutes).
