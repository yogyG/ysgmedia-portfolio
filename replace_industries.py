import os

target = '''          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">👗 Boutiques</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏭 Manufacturers</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏥 Clinics</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">☕ Restaurants</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏢 Real Estate</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">📚 Coaching Institutes</span>'''

replacement = '''          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">👗 Boutiques</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏭 Manufacturers</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏥 Clinics</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">☕ Restaurants</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏢 Real Estate</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">📚 Coaching Institutes</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🛒 E-commerce Brands</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏋️ Fitness Studios</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🏨 Hotels & Resorts</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">💻 Tech & SaaS</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">🚗 Automotive</span>
          <span style="padding: 12px 24px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border-muted); border-radius: 30px; font-weight: 500;">⚖️ Legal & Financial</span>'''

services_dir = "d:\\ysgmedia-portfolio\\services"

count = 0
for file_name in os.listdir(services_dir):
    if file_name.endswith(".html"):
        path = os.path.join(services_dir, file_name)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        if target in content:
            new_content = content.replace(target, replacement)
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
            print(f"Updated {file_name}")

print(f"Total updated: {count}")
