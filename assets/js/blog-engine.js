// Blog Engine
// Handles Search, Filtering, and Reading Progress Indicators

document.addEventListener('DOMContentLoaded', () => {
  initBlogHub();
  initReadingProgress();
});

function initBlogHub() {
  const searchInput = document.getElementById('blog-search');
  const searchBtn = document.getElementById('blog-search-btn');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('no-results');

  // If not on the blog hub page, exit
  if (!searchInput || !blogCards.length) return;

  let currentCategory = 'All';
  let currentSearch = '';

  const featuredSection = document.getElementById('featured-section');

  // Filter Function
  const applyFilters = () => {
    let visibleCount = 0;
    const term = currentSearch.toLowerCase().trim();

    // Hide featured section if a filter or search is active
    if (featuredSection) {
      if (term !== '' || currentCategory !== 'All') {
        featuredSection.style.display = 'none';
      } else {
        featuredSection.style.display = 'block';
      }
    }

    blogCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const titleEl = card.querySelector('h3');
      const excerptEl = card.querySelector('p');
      
      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      const excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';

      const matchesCategory = currentCategory === 'All' || category === currentCategory;
      const matchesSearch = term === '' || title.includes(term) || excerpt.includes(term) || category.toLowerCase().includes(term);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  };

  // Category Click
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      categoryBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'rgba(255,255,255,0.05)';
        b.style.color = 'var(--text-secondary)';
        b.style.border = '1px solid rgba(255,255,255,0.1)';
      });
      
      const target = e.target;
      target.classList.add('active');
      target.style.background = 'var(--accent-primary)';
      target.style.color = 'white';
      target.style.border = 'none';

      currentCategory = target.getAttribute('data-category');
      applyFilters();
    });
  });

  // Search Input
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    applyFilters();
  });

  searchBtn.addEventListener('click', () => {
    currentSearch = searchInput.value;
    applyFilters();
  });
}

function initReadingProgress() {
  // Only init if there's an article container
  const article = document.querySelector('article');
  if (!article) return;

  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '4px';
  progressBar.style.background = 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))';
  progressBar.style.width = '0%';
  progressBar.style.zIndex = '9999';
  progressBar.style.transition = 'width 0.1s ease';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Calculate progress percentage
    let scrolled = (windowScroll / height) * 100;
    if (scrolled > 100) scrolled = 100;
    
    progressBar.style.width = scrolled + '%';
  });
}
