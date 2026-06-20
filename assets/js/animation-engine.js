/**
 * YSG Media - Interactive Animation Engine
 * Governs dynamic UI triggers, text loops, counters, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initTextLoop();
  initCounters();
  initDashboardGraph();
});

/**
 * 1. Scroll-Triggered Reveal Engine (Intersection Observer)
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const observerOptions = {
    root: null, // relative to viewport
    threshold: 0.15, // trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // adjust trigger bottom margin
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // trigger animation only once
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * 2. Typing / Word-Loop Animation (Hero Section)
 */
function initTextLoop() {
  const targetElement = document.querySelector('.hero-dynamic-word');
  if (!targetElement) return;

  const words = JSON.parse(targetElement.getAttribute('data-words') || '["Leads", "Calls", "Customers"]');
  let currentIdx = 0;

  setInterval(() => {
    // Fade Out Current Word
    targetElement.style.opacity = 0;
    targetElement.style.transform = 'translateY(10px)';

    setTimeout(() => {
      // Shift to next index
      currentIdx = (currentIdx + 1) % words.length;
      targetElement.textContent = words[currentIdx];
      
      // Fade In Next Word
      targetElement.style.opacity = 1;
      targetElement.style.transform = 'translateY(0)';
    }, 300); // matching CSS transition duration

  }, 3000); // shift words every 3 seconds
}

/**
 * 3. Count-Up Animation for Statistics
 */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  if (counterElements.length === 0) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseInt(counter.getAttribute('data-target') || '0', 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds animation duration
        const stepTime = Math.max(Math.floor(duration / targetValue), 15);
        let startValue = 0;

        const timer = setInterval(() => {
          startValue += 1;
          counter.textContent = startValue + suffix;
          if (startValue >= targetValue) {
            counter.textContent = targetValue + suffix;
            clearInterval(timer);
          }
        }, stepTime);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(counter => {
    observer.observe(counter);
  });
}

/**
 * 4. Interactive Dashboard Line Graph
 */
function initDashboardGraph() {
  const chartContainer = document.getElementById('dashboard-chart');
  if (!chartContainer) return;

  // Triggers path draw SVG line when chart is visible
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const svgPath = chartContainer.querySelector('.animate-path');
        if (svgPath) {
          svgPath.style.animationPlayState = 'running';
        }
        observer.unobserve(chartContainer);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(chartContainer);
}
