import { buildServiceCard, buildCaseStudyCard, buildTestimonialCard, generateHeader, generateFooter } from './content-loader.js';

async function initPage() {
  try {
    const [companyRes, servicesRes, caseStudiesRes, testimonialsRes, contactRes, industriesRes, blogsRes] = await Promise.all([
      fetch('data/company.json'),
      fetch('data/services.json'),
      fetch('data/case-studies.json'),
      fetch('data/testimonials.json'),
      fetch('data/contact.json'),
      fetch('data/industries.json'),
      fetch('data/blogs.json')
    ]);

    const company = await companyRes.json();
    const services = await servicesRes.json();
    const caseStudies = await caseStudiesRes.json();
    const testimonials = await testimonialsRes.json();
    const contact = await contactRes.json();
    const industries = await industriesRes.json();
    const blogs = await blogsRes.json();

    const path = window.location.pathname;
    let activePage = 'home';

    if (path.includes('services')) activePage = 'services';
    if (path.includes('case-studies')) activePage = 'case studies';
    if (path.includes('industries')) activePage = 'industries';
    if (path.includes('blog')) activePage = 'blog';
    if (path.includes('about')) activePage = 'about';
    if (path.includes('contact')) activePage = 'contact';

    // Mount Header & Footer
    const headerMount = document.getElementById('header-mount');
    if (headerMount) headerMount.innerHTML = generateHeader(company, activePage);

    const footerMount = document.getElementById('footer-mount');
    if (footerMount) footerMount.innerHTML = generateFooter(company, contact);

    // Populate Page Specific Grids
    if (activePage === 'services') {
      // The services grid is now hardcoded in HTML for immediate rendering and better SEO
      // const grid = document.getElementById('page-services-grid');
      // if (grid) grid.innerHTML = services.map(s => buildServiceCard(s)).join('');
    }

    if (activePage === 'case studies') {
      // The case studies grid is now hardcoded in HTML for immediate rendering and better SEO
      // const grid = document.getElementById('page-cases-grid');
      // if (grid) grid.innerHTML = caseStudies.map(cs => buildCaseStudyCard(cs)).join('');

      // const testGrid = document.getElementById('page-testimonials-grid');
      // if (testGrid) testGrid.innerHTML = testimonials.map(t => buildTestimonialCard(t)).join('');
    }

    // Bind WhatsApp generic URLs
    const waUrl = `https://wa.me/${company.whatsappNumber.replace(/\\D/g, '')}?text=${encodeURIComponent("Hi YSG Media, I want to book a consultation.")}`;
    document.querySelectorAll('.wa-link').forEach(link => {
      link.href = waUrl;
    });

  } catch (error) {
    console.error('Error loading page data:', error);
  }
}

document.addEventListener('DOMContentLoaded', initPage);
