# Case Study Formatting & Results Guide

## 📌 Purpose
This document outlines the standard for publishing and formatting client success stories on the YSG Media platform. Since YSG Media positions itself as a results-driven agency, case studies must present verifiable metrics, structured narratives (Challenge, Solution, Results), and direct integration with client testimonials.

---

## 📂 Data Structure (`case-studies.json`)

All case studies are declared in `data/case-studies.json`. Each entry maps directly to visual elements on `/case-studies.html` and the Home page.

```json
{
  "id": "unique-kebab-case-slug",
  "client": "Client Company Name",
  "industry": "Industry Sector",
  "servicesUsed": ["Service 1", "Service 2"],
  "summary": "High-level summary of the core victory.",
  "metrics": {
    "primary": "X% Metric",
    "secondary": "Y% Metric",
    "tertiary": "Z% Metric"
  },
  "challenge": "What obstacle was the client facing before hiring YSG Media?",
  "solution": "What strategy did YSG Media deploy to resolve this issue?",
  "results": "What was the final outcome, backed by numerical metrics?",
  "images": {
    "before": "/assets/images/screenshots/screenshot-before.jpg",
    "after": "/assets/images/screenshots/screenshot-after.jpg",
    "hero": "/assets/images/screenshots/case-hero.jpg"
  },
  "testimonialId": "associated-testimonial-id-from-testimonials-json"
}
```

### Key Integrations
*   **Metrics Block**: The `metrics` fields (`primary`, `secondary`, `tertiary`) populate the prominent stat bubbles. Keep values short (e.g. "+312% Leads", "$120K Generated", "-40% CPA").
*   **Testimonial ID Link**: The value in `testimonialId` must exactly match the `id` of a record in `testimonials.json`. The site automatically parses this relation and displays the client's quote and profile headshot directly underneath the case study section.

---

## 🛠️ How Future Updates Should Be Done

### Documenting a New Project
1.  **Gather Metrics**: Extract three key growth indicators showing the positive impact of the campaign.
2.  **Add Testimonial**: Obtain permission and collect a quote from the client. Register the quote in `data/testimonials.json` with a unique ID (e.g. `clientname-ceo`).
3.  **Collect Assets**: Capture relevant screenshot visuals (e.g., Google Analytics traffic dashboards or Adwords reports) and crop them to uniform sizes (recommended: `800x450` pixels).
4.  **Register JSON**: Add the case study object to `data/case-studies.json`. Ensure the `testimonialId` points to the testimonial ID created in step 2.

### AI-Assisted Prompts
> "Here is a raw client summary outlining how we set up Google Search Ads for a consulting agency and increased their bookings. Convert this into a structured case study entry for case-studies.json, highlighting the metric '+85% Bookings' as primary."

---

## ⚠️ Common Mistakes to Avoid

1.  **Orphaned Testimonial References**: Double-check that the `testimonialId` provided matches a real record in `testimonials.json` case-sensitively. If the ID is misspelled, the testimonial section will render blank or fail to build.
2.  **Lengthy Metrics**: Do not write detailed sentences inside the `metrics` blocks. The design templates are sized specifically for concise values.
    *   ❌ *Incorrect*: `"primary": "We increased organic impressions by about 45 percent over a period of three months."`
    *   ✅ *Correct*: `"primary": "+45% Impressions"`
3.  **Missing "Before" Assets**: If actual dashboard screenshots are not available, use clean, premium mockup graphics or abstract vector charts representing data flow. Never leave the image paths empty as it disrupts the visual layout.
