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

    // 4. Render Services Grid removed to preserve hardcoded services in index.html

    // 5. Render Case Studies removed to preserve hardcoded case studies in index.html

    // 5.5 Render Industries removed to preserve hardcoded industries in index.html

    // 6. Render Testimonials removed to preserve hardcoded testimonials in index.html

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

