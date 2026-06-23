import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  'services.html',
  'industries.html',
  'contact.html',
  'case-studies.html',
  'blog.html',
  'about.html'
];

const headerBase = `    <div id="header-mount">
      <header class="global-header">
        <div class="logo">
          <a href="index.html" style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text-primary); text-decoration: none;">YSG<span style="color: var(--accent-primary);">MEDIA</span></a>
        </div>
        
        <nav class="nav-menu" id="nav-menu">
          <a href="index.html" class="__HOME_ACTIVE__">Home</a>
          <a href="services.html" class="__SERVICES_ACTIVE__">Services</a>
          <a href="case-studies.html" class="__CASE_ACTIVE__">Case Studies</a>
          <a href="blog.html" class="__BLOG_ACTIVE__">Blog</a>
          <a href="about.html" class="__ABOUT_ACTIVE__">About</a>
          <a href="contact.html" class="__CONTACT_ACTIVE__">Contact</a>
          <div class="mobile-actions">
            <a href="contact.html" class="btn-primary" style="font-size: 0.9rem; text-decoration: none;">Book Free Consultation</a>
            <a href="https://wa.me/message/TES4XUVEGSGBC1" target="_blank" class="wa-link" style="padding: 0.8rem 1.2rem; background: var(--accent-whatsapp); color: white; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;">
              WhatsApp Us
            </a>
          </div>
        </nav>

        <div class="header-actions">
          <a href="contact.html" class="btn-secondary" style="padding: 0.6rem 1.2rem; background: var(--bg-secondary); color: white; border-radius: var(--border-radius-sm); font-weight: 600; text-decoration: none;">Book Free Consultation</a>
          <a href="https://wa.me/message/TES4XUVEGSGBC1" target="_blank" class="wa-link" style="padding: 0.6rem 1rem; background: var(--accent-whatsapp); color: white; border-radius: var(--border-radius-sm); font-weight: 600; display: flex; align-items: center; gap: 8px; text-decoration: none;">
             WhatsApp Us
          </a>
        </div>

        <button class="hamburger" id="mobile-hamburger" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </div>`;

const footerBase = `    <div id="footer-mount">
      <footer style="background-color: var(--bg-secondary); color: var(--text-light); padding: var(--spacing-lg); margin-top: var(--spacing-lg);">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg);">
          <div>
            <h2 style="color: white; margin-bottom: var(--spacing-sm);">YSG<span style="color: var(--accent-primary);">MEDIA</span></h2>
            <p style="color: var(--text-secondary); margin-bottom: var(--spacing-sm);">We help businesses across India grow with performance marketing, social media management & data-driven strategies.</p>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">&copy; 2026 YSG Media. All Rights Reserved.</p>
          </div>
          <div>
            <h3 style="color: white; margin-bottom: var(--spacing-sm);">Quick Links</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.5rem;"><a href="index.html" style="color: var(--text-secondary); text-decoration: none;">Home</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="services.html" style="color: var(--text-secondary); text-decoration: none;">Services</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="case-studies.html" style="color: var(--text-secondary); text-decoration: none;">Case Studies</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="about.html" style="color: var(--text-secondary); text-decoration: none;">About</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="contact.html" style="color: var(--text-secondary); text-decoration: none;">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 style="color: white; margin-bottom: var(--spacing-sm);">Contact Us</h3>
            <p style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px; color: var(--text-secondary);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +91 90960 09125
            </p>
            <p style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px; color: var(--text-secondary);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              ysgdigitalmedia@gmail.com
            </p>
            <p style="display: flex; align-items: flex-start; gap: 8px; color: var(--text-secondary);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Meera Nagar, Wardha, India
            </p>
          </div>
        </div>
      </footer>
    </div>`;

for (const page of pages) {
  const filePath = path.join(__dirname, page);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Customize header for active state
  let customizedHeader = headerBase
    .replace('__HOME_ACTIVE__', '')
    .replace('__SERVICES_ACTIVE__', page === 'services.html' ? 'active' : '')
    .replace('__CASE_ACTIVE__', page === 'case-studies.html' ? 'active' : '')
    .replace('__BLOG_ACTIVE__', page === 'blog.html' ? 'active' : '')
    .replace('__ABOUT_ACTIVE__', page === 'about.html' ? 'active' : '')
    .replace('__CONTACT_ACTIVE__', page === 'contact.html' ? 'active' : '');

  // Replace header-mount
  content = content.replace(/<div id="header-mount"><\/div>/g, customizedHeader);
  
  // Replace footer-mount
  content = content.replace(/<div id="footer-mount"><\/div>/g, footerBase);

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('Successfully injected headers and footers.');

