import { buildServiceCard, buildCaseStudyCard, buildTestimonialCard, generateHeader, generateFooter } from './content-loader.js';
import company from '../../data/company.json';
import services from '../../data/services.json';
import caseStudies from '../../data/case-studies.json';
import testimonials from '../../data/testimonials.json';
import contact from '../../data/contact.json';
import industries from '../../data/industries.json';

function initHome() {
  try {
    // 2. Inject Header & Footer
    const headerMount = document.getElementById('header-mount');
    if (headerMount) headerMount.innerHTML = generateHeader(company, 'home');

    const footerMount = document.getElementById('footer-mount');
    if (footerMount) footerMount.innerHTML = generateFooter(company, contact);

    // 3. Inject Dynamic Copy
    const taglineObj = document.getElementById('hero-tagline');
    if (taglineObj) taglineObj.textContent = company.tagline;

    // Build WhatsApp Links
    const waUrl = 'https://wa.me/message/TES4XUVEGSGBC1';
    const heroWa = document.getElementById('hero-whatsapp');
    const footerWa = document.getElementById('footer-whatsapp');
    if (heroWa) heroWa.href = waUrl;
    if (footerWa) footerWa.href = waUrl;

    // 4. Render Services Grid
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
      servicesGrid.innerHTML = services.map(s => buildServiceCard(s)).join('');
    }

    // 5. Render Case Studies (First 3)
    const casesGrid = document.getElementById('cases-grid');
    if (casesGrid) {
      casesGrid.innerHTML = caseStudies.slice(0, 3).map(cs => buildCaseStudyCard(cs)).join('');
    }

    // 5.5 Render Industries
    const industriesGrid = document.getElementById('industries-grid');
    if (industriesGrid) {
      industriesGrid.innerHTML = industries.map((ind, index) => `
        <div class="hover-lift reveal-on-scroll delay-${(index % 4) * 100}" style="padding: var(--spacing-md); text-align: center; background: var(--bg-card); border-radius: var(--border-radius-sm); border: 1px solid var(--border-muted); flex: 1 1 150px;">
           <div style="color: var(--accent-primary); font-size: 2rem; margin-bottom: var(--spacing-xs);">🏢</div>
           <div style="font-weight: 600; font-size: 0.9rem;">${ind.name}</div>
        </div>
      `).join('');
    }

    // 6. Render Testimonials
    const testGrid = document.getElementById('testimonials-grid');
    if (testGrid) {
      testGrid.innerHTML = testimonials.map(t => buildTestimonialCard(t)).join('');
    }

    // 7. Init Auto-scroll for mobile carousels
    const carousels = document.querySelectorAll('.mobile-carousel');
    carousels.forEach(carousel => {
      let isHovered = false;
      carousel.addEventListener('mouseenter', () => isHovered = true);
      carousel.addEventListener('mouseleave', () => isHovered = false);
      carousel.addEventListener('touchstart', () => isHovered = true, {passive: true});
      carousel.addEventListener('touchend', () => {
        setTimeout(() => isHovered = false, 2000);
      });

      setInterval(() => {
        if (!isHovered && window.innerWidth <= 768) {
          const cardWidth = carousel.children[0]?.clientWidth || 0;
          if (cardWidth === 0) return;
          
          if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
             carousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
             carousel.scrollBy({ left: cardWidth + 16, behavior: 'smooth' }); // add 16px gap
          }
        }
      }, 3000);
    });

  } catch (error) {
    console.error('Error loading YSG Media data:', error);
  }
}

document.addEventListener('DOMContentLoaded', initHome);

