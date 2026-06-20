# Blog Formatting & Publishing Guide

## 📌 Purpose
This document guides the founder and AI assistants through creating and publishing high-quality, search-optimized articles on the YSG Media website. The blog represents a critical inbound traffic asset, and maintaining consistency in format, media integration, and readability is essential.

---

## 📂 Data Structure (`blogs.json`)

All blog posts are declared in `data/blogs.json`. Each entry is structured as an object inside a global array.

```json
{
  "id": "unique-kebab-case-id",
  "title": "Optimized Header of the Post",
  "slug": "url-friendly-slug-for-post",
  "author": "Yogy G.",
  "publishDate": "YYYY-MM-DD",
  "readTime": "X min read",
  "category": "Marketing Category",
  "summary": "Short snippet describing the post for the grid display.",
  "coverImage": "/assets/images/screenshots/cover-image.jpg",
  "tags": ["Tag1", "Tag2"],
  "content": [
    {
      "type": "heading",
      "level": 2,
      "text": "Sub-heading title"
    },
    {
      "type": "paragraph",
      "text": "Body content of the section goes here..."
    },
    {
      "type": "image",
      "src": "/assets/images/screenshots/inline-chart.jpg",
      "alt": "Descriptive chart data alt tag"
    }
  ]
}
```

### Content Block Specifications
The `content` field contains an ordered list of blocks, allowing you to build rich, readable layouts without raw HTML clutter:
*   `type: "heading"`: Generates an `<h2>` or `<h3>` section separator. Required keys: `level` (number, 2 or 3) and `text` (string).
*   `type: "paragraph"`: Generates clean body text. Required keys: `text` (string).
*   `type: "image"`: Injects an image element. Required keys: `src` (relative path) and `alt` (search-friendly descriptions).
*   `type: "quote"`: Injects a styled callout quote block. Required keys: `text` (string) and `author` (optional string).

---

## 🛠️ How Future Updates Should Be Done

### Adding a New Blog Post
1.  **Drafting**: Write your article in markdown or plain text. Ensure it is structured with clear headers.
2.  **Asset Sizing**: Upload a high-resolution, compressed cover image to `/assets/images/screenshots/` (recommended size: `1200x630` pixels for social share compatibility, converted to `.webp`).
3.  **JSON Registration**: Append a new post object to `data/blogs.json` at the top of the array (posts are rendered chronologically, newest first).
4.  **Verification**: Start the Vite dev server (`npm run dev`) and navigate to `/blog.html` to review visual formatting.

### AI-Assisted Blogging
You can feed raw drafts to your AI assistant:
> "Convert the following draft into a structured JSON block compliant with the `blogs.json` schema. Make sure to generate an appropriate read time, category, and kebab-case ID. Here is the draft: [Paste text]"

---

## ⚠️ Common Mistakes to Avoid

1.  **Massive Cover Images**: Uploading raw PNG or JPEG images straight from stock sites or design tools can result in multi-megabyte payloads. Always compress images to `.webp` format and aim for file sizes under **100KB**.
2.  **Invalid Path References**: Ensure the `coverImage` and block `src` properties reference paths relative to the root (e.g. `/assets/...` instead of `../assets/...`).
3.  **Lack of Semantic Headers**: Avoid putting entire paragraphs of text in bold format to act as headers. Always use the `{ "type": "heading", "level": 2, "text": "Heading Text" }` structure to support correct accessibility and SEO parser indexing.
