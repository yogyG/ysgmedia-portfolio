# Design System & Styling Guide

## 📌 Purpose
This document establishes the UI design guidelines and styling tokens for the YSG Media web application. All styles are declared using native CSS Custom Properties (Variables) within `assets/css/variables.css` and compiled via `assets/css/main.css`. 

By maintaining strict adherence to this centralized styling framework, we prevent CSS bloat, ensure mobile responsiveness, and make it easy to alter global brand colors or fonts.

---

## 🎨 Design Tokens & Custom Variables

The design system enforces a sleek, dark-mode-first aesthetic (Obsidian/Neon Cyan) with glassmorphism to look premium and high-tech.

```css
:root {
  /* Color Palette */
  --bg-primary: #090A0F;        /* Obsidian base background */
  --bg-secondary: #121420;      /* Dark navy card & secondary block fill */
  --bg-card: rgba(18, 20, 32, 0.7); /* Glassmorphic card fill */
  
  --text-primary: #F8FAFC;      /* High-contrast body text */
  --text-secondary: #94A3B8;    /* Muted label and caption text */
  
  --accent-primary: #00F2FE;    /* Electric Cyan highlight color */
  --accent-secondary: #4FACFE;  /* Deep Sky Blue for gradient transitions */
  --accent-emerald: #10B981;    /* Mint green for positive data indicators */
  
  /* Typography Scales */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Layout Spacing */
  --spacing-xs: 0.5rem;         /* 8px */
  --spacing-sm: 1rem;           /* 16px */
  --spacing-md: 2rem;           /* 32px */
  --spacing-lg: 4rem;           /* 64px */
  --spacing-xl: 8rem;           /* 128px */
  
  /* Interactive Parameters */
  --border-radius-sm: 8px;
  --border-radius-md: 16px;
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --border-glow: rgba(0, 242, 254, 0.15);
}
```

---

## 🧩 UI Component Guidelines

### 1. Buttons
*   **Primary CTA (`.btn-primary`)**: Features a horizontal gradient from Cyan to Blue. Hover state shifts opacity, expands slightly (`scale(1.05)`), and triggers a subtle blue drop-shadow glow.
*   **Secondary CTA (`.btn-secondary`)**: Features a solid border outline with primary color text. Hover state fills the background with the accent color.

### 2. Cards (`.card-glass`)
Uses backdrop filtering to achieve a modern translucent glass pane effect.
*   `background: var(--bg-card);`
*   `backdrop-filter: blur(12px);`
*   `border: 1px solid rgba(255, 255, 255, 0.05);`
*   **Hover State**: Elevates along the Y-axis and shifts the border color to `--border-glow`.

### 3. Typography Hierarchy
*   All titles must use `font-family: var(--font-heading)`.
*   All paragraphs, labels, and form fields must use `font-family: var(--font-body)`.

---

## 🛠️ How Future Updates Should Be Done

### Modifying Brand Colors
1.  Open `assets/css/variables.css`.
2.  Locate the target variable (e.g. `--accent-primary`).
3.  Change the hexadecimal color code to your new brand color. The entire site (headers, buttons, icons, links) will update immediately.

### AI-Assisted Prompts
> "We want to update our design token accent to a luxury gold color. Change `--accent-primary` to `#D4AF37` and `--accent-secondary` to `#AA7C11` in our variables.css file, and adjust the button focus states to match."

---

## ⚠️ Common Mistakes to Avoid

1.  **Avoid Inline Styling**: Never define inline styles inside HTML elements (`style="color: #00F2FE"`). Always bind changes to a CSS class and leverage custom variables.
2.  **Overwriting CSS Variables Locally**: Avoid redeclaring CSS variables inside individual class blocks unless explicitly performing localized layout styling. Keep global controls in `:root`.
3.  **Hardcoded Font Sizes**: Use `rem` units rather than absolute pixels (`px`) for font scales. This ensures that user browser font overrides (e.g., for visual accessibility) are respected.
