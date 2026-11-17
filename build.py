#!/usr/bin/env python3
"""
YSG Media - Static Site Generator & Build Engine

Generates city-specific landing pages using Jinja2 templates, shared components,
and modular JSON configurations. Automatically validates configuration, verifies
asset integrity, updates sitemap.xml, and synchronizes build configuration.
"""

import os
import sys
import json
import re
from datetime import datetime
from pathlib import Path

# Bootstrap vendored Jinja2 / MarkupSafe if not globally installed
VENDOR_DIR = Path(__file__).resolve().parent / "_vendor"
if VENDOR_DIR.exists():
    sys.path.insert(0, str(VENDOR_DIR))

try:
    import jinja2
except ImportError:
    print("Error: Jinja2 is required. Run 'pip install -r requirements.txt'")
    sys.exit(1)

PROJECT_ROOT = Path(__file__).resolve().parent
TEMPLATES_DIR = PROJECT_ROOT / "templates"
DATA_DIR = PROJECT_ROOT / "data"
CITIES_DIR = DATA_DIR / "cities"
SITEMAP_PATH = PROJECT_ROOT / "sitemap.xml"
VITE_CONFIG_PATH = PROJECT_ROOT / "vite.config.js"

REQUIRED_CITY_FIELDS = [
    "name",
    "slug",
    "title",
    "meta_description",
    "canonical_url",
    "hero_tagline"
]

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def validate_city_config(city_data, filepath):
    errors = []
    for field in REQUIRED_CITY_FIELDS:
        if not city_data.get(field):
            errors.append(f"Missing required field: '{field}'")
    
    slug = city_data.get("slug", "")
    if slug and not re.match(r"^[a-z0-9\-]+$", slug):
        errors.append(f"Invalid slug '{slug}': must be lowercase alphanumeric and hyphens only")

    canonical = city_data.get("canonical_url", "")
    expected_canonical = f"https://ysgmedia.in/{slug}/"
    if canonical and canonical != expected_canonical:
        errors.append(f"Canonical URL '{canonical}' does not match expected '{expected_canonical}'")

    return errors

def validate_assets():
    warnings = []
    required_assets = [
        "assets/css/main.css",
        "assets/css/premium.css",
        "assets/js/cursor.js",
        "assets/js/home.js",
        "assets/js/animation-engine.js",
        "favicon.svg"
    ]
    for asset in required_assets:
        if not (PROJECT_ROOT / asset).exists():
            warnings.append(f"Asset missing: {asset}")
    return warnings

def load_all_cities():
    cities = []
    if not CITIES_DIR.exists():
        print(f"Error: Cities directory not found at {CITIES_DIR}")
        return cities

    for file_path in sorted(CITIES_DIR.glob("*.json")):
        try:
            city_data = load_json(file_path)
            errors = validate_city_config(city_data, file_path)
            if errors:
                print(f"Validation failed for {file_path.name}:")
                for err in errors:
                    print(f"  - {err}")
                continue
            city_data["_source_file"] = file_path.name
            cities.append(city_data)
        except Exception as e:
            print(f"Failed to load {file_path.name}: {e}")

    return cities

def update_sitemap(cities):
    if not SITEMAP_PATH.exists():
        print("Warning: sitemap.xml not found, skipping sitemap update.")
        return

    with open(SITEMAP_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    today = datetime.now().strftime("%Y-%m-%d")

    # Build XML blocks for all city pages
    city_blocks = []
    for c in cities:
        url = c["canonical_url"]
        prio = c.get("priority", 0.8)
        freq = c.get("changefreq", "monthly")
        block = f"""  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio:.1f}</priority>
  </url>"""
        city_blocks.append(block)

    cities_xml_content = "\n".join(city_blocks)

    # Check if City Landing Pages comment marker exists
    comment_pattern = r"(<!--\s*City Landing Pages\s*-->[\s\S]*?)(?=</urlset>)"
    if re.search(comment_pattern, content):
        replacement = f"<!-- City Landing Pages -->\n{cities_xml_content}\n"
        new_content = re.sub(comment_pattern, replacement, content)
    else:
        # Insert before </urlset>
        insertion = f"\n  <!-- City Landing Pages -->\n{cities_xml_content}\n</urlset>"
        new_content = content.replace("</urlset>", insertion)

    with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    public_sitemap = PROJECT_ROOT / "public" / "sitemap.xml"
    if public_sitemap.parent.exists():
        with open(public_sitemap, "w", encoding="utf-8") as f:
            f.write(new_content)
    print(f"Updated sitemap.xml with {len(cities)} city routes.")

def sync_vite_config(cities):
    if not VITE_CONFIG_PATH.exists():
        return

    with open(VITE_CONFIG_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Build city entries
    city_entries = []
    for c in cities:
        slug = c["slug"]
        city_entries.append(f"        city_{slug}: resolve(__dirname, '{slug}/index.html')")
    
    entries_code = ",\n".join(city_entries)

    # Find the rollupOptions input object and update city entries
    pattern = r"(city_[a-zA-Z0-9_\-]+:\s*resolve\(__dirname,\s*['\"][^'\"]+['\"]\),?\s*)+"
    if re.search(pattern, content):
        new_content = re.sub(pattern, entries_code + "\n", content)
        with open(VITE_CONFIG_PATH, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Synchronized vite.config.js rollup inputs.")

def build_city_pages(cities):
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(str(TEMPLATES_DIR)),
        autoescape=False,
        trim_blocks=True,
        lstrip_blocks=True
    )

    template = env.get_template("city.html")
    generated_count = 0

    for city in cities:
        slug = city["slug"]
        out_dir = PROJECT_ROOT / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / "index.html"

        html_output = template.render(
            city=city,
            base_path="..",
            all_cities=cities,
            active_page="home"
        )

        with open(out_file, "w", encoding="utf-8") as f:
            f.write(html_output)

        generated_count += 1
        size_kb = out_file.stat().st_size / 1024
        print(f"  [OK] /{slug}/index.html ({size_kb:.1f} KB)")

    return generated_count

def main():
    check_only = "--check" in sys.argv
    print(f"=== YSG Media Static Site Generator ===")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Mode: {'Validation Only (--check)' if check_only else 'Full Build'}\n")

    # 1. Asset verification
    warnings = validate_assets()
    if warnings:
        print("Asset Warnings:")
        for w in warnings:
            print(f"  [!] {w}")
        print()

    # 2. Load and validate cities
    cities = load_all_cities()
    print(f"Loaded {len(cities)} valid city configuration(s):")
    for c in cities:
        print(f"  - {c['name']} (/{c['slug']}/)")
    print()

    if check_only:
        print("Validation complete. No files written.")
        return

    # 3. Generate city pages
    print("Generating city landing pages...")
    count = build_city_pages(cities)
    print(f"Successfully generated {count} city landing pages.\n")

    # 4. Update Sitemap
    update_sitemap(cities)

    # 5. Sync Vite configuration
    sync_vite_config(cities)

    print("\nBuild completed successfully!")

if __name__ == "__main__":
    main()
