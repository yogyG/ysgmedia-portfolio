# Content Management Guide (CMS via JSON)

## 📌 Purpose
This document provides complete instructions for updating the static content of the YSG Media website. The site operates as a data-driven system, utilizing a series of JSON files in the `/data` folder to populate text, stats, pricing, FAQs, and contact links. 

By separating content from markup code, we ensure that a non-technical founder can easily update the site themselves or direct an AI coding assistant to make the updates safely.

---

## 📂 Managed Files & Schemas

### 1. `company.json`
*   **Purpose**: Manages global branding assets, logos, and external scheduler integrations (e.g. Calendly).
*   **Key Fields**: `name`, `tagline`, `experienceStatement`, `calendlyUrl`, `socials`.

### 2. `contact.json`
*   **Purpose**: Stores active contact methods, physical or mailing addresses, and office hours.
*   **Key Fields**: `email`, `phone`, `address` (object), `hours` (object), `googleMapEmbedUrl`.

### 3. `stats.json`
*   **Purpose**: Displays social proof metrics across the website (e.g. Hero, About, and Footer).
*   **Key Fields**: `businessesServed`, `adSpendManaged`, `revenueGenerated`, `teamSize`, `averageClientRetentionMonths`.

### 4. `faqs.json`
*   **Purpose**: Powers accordion dropdown blocks on the Home, Services, and Pricing pages.
*   **Key Fields**: An array of category objects, each containing an array of questions (`q`) and answers (`a`).

---

## 🛠️ How Future Updates Should Be Done

### Standard Manual Method
1.  Open the target file in a standard text editor (e.g., VS Code, Notepad, or GitHub Web Editor).
2.  Locate the parameter value you wish to change.
3.  Modify the text, ensuring it remains enclosed within double quotes (`"..."`).
4.  Save the file and check your local development preview.

### AI-Assisted Update Method
If you are using an AI coding assistant (like Gemini or Cursor), you can copy and paste the target JSON file and prompt the AI:
> "Hey, please update the email address to 'partnerships@ysgmedia.com' and change the average client retention metric in stats.json to 24 months. Return the updated JSON configuration directly."

---

## ⚠️ Common Mistakes to Avoid

1.  **Improper Character Escaping**: Inside JSON values, double quotes must be escaped using a backslash.
    *   ❌ *Incorrect*: `"quote": "We loved working with YSG Media. They are the "best" in the business."`
    *   ✅ *Correct*: `"quote": "We loved working with YSG Media. They are the \"best\" in the business."`
2.  **Trailing Commas**: In standard JSON, lists and objects cannot have a trailing comma after the final element.
    ```json
    // ❌ Incorrect: Note the comma after "USA"
    "address": {
      "city": "Boston",
      "country": "USA",
    }
    // ✅ Correct: No trailing comma
    "address": {
      "city": "Boston",
      "country": "USA"
    }
    ```
3.  **Invalid Unicode Characters**: Copying text directly from Microsoft Word or email services can sometimes inject styling codes (such as curly quotation marks `“` or `”`). Ensure only standard straight quotes (`"`) are used for structure.
