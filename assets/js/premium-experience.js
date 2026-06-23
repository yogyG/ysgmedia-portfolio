// premium-experience.js - Core logic for premium interactions

// ----------------------------------------------------
// 1. Lenis Smooth Scroll Setup
// ----------------------------------------------------
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Hook GSAP ScrollTrigger to Lenis
if (typeof ScrollTrigger !== 'undefined') {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// ----------------------------------------------------
// 2. Preloader Animation
// ----------------------------------------------------
window.addEventListener('load', () => {
  const preloader = document.getElementById('premium-preloader');
  const percentageEl = document.getElementById('preloader-percentage');
  const logo = document.querySelector('.preloader-logo');
  
  if (!preloader) return;

  // Simulate loading percentage
  let loadProgress = { val: 0 };
  gsap.to(loadProgress, {
    val: 100,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => {
      percentageEl.innerText = Math.round(loadProgress.val);
    }
  });

  // Animate Logo
  gsap.to(logo, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Transition out preloader
  gsap.to(preloader, {
    yPercent: -100,
    duration: 1,
    delay: 1.8,
    ease: "power4.inOut",
    onComplete: () => {
      preloader.style.display = 'none';
      // Trigger homepage entry animations here
      initHeroAnimations();
    }
  });
});

// ----------------------------------------------------
// 3. Magnetic Custom Cursor
// ----------------------------------------------------
const cursor = document.getElementById('custom-cursor');
const follower = document.getElementById('custom-cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

if (cursor && follower && !("ontouchstart" in window)) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant follow for main dot
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follow for the outer ring using GSAP ticker
  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  });

  // Cursor Hover Effects
  const interactiveElements = document.querySelectorAll('a, button, input, .magnetic');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // Case Study / Project hover
  const projectCards = document.querySelectorAll('.case-study-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-view-project');
    });
    card.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-view-project');
    });
  });

  // Magnetic Button Logic
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}

// ----------------------------------------------------
// 4. Global Hero Entry Animations
// ----------------------------------------------------
function initHeroAnimations() {
  // Line by Line Text Reveal for Hero
  const heroH1 = document.querySelector('.hero-content h1');
  if (heroH1) {
    gsap.fromTo(heroH1, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) {
    gsap.fromTo(heroTagline, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );
  }

  const heroButtons = document.querySelectorAll('.hero-content a');
  if (heroButtons.length > 0) {
    gsap.fromTo(heroButtons, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, stagger: 0.1, ease: "power2.out" }
    );
  }

  // Dashboard / Metrics Card Parallax
  const dashboard = document.getElementById('dashboard-chart');
  if (dashboard) {
    gsap.fromTo(dashboard,
      { opacity: 0, scale: 0.95, rotationX: 10 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 1.5, delay: 0.3, ease: "power3.out" }
    );
    
    // Add Mouse Parallax to Dashboard
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(dashboard, {
        rotationY: x,
        rotationX: -y,
        transformPerspective: 1000,
        duration: 1,
        ease: "power2.out"
      });
    });
  }
}

// ----------------------------------------------------
// 5. Navbar Scroll Blur
// ----------------------------------------------------
const header = document.querySelector('.global-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(5, 5, 5, 0.8)';
      header.style.backdropFilter = 'blur(12px)';
      header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    } else {
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.borderBottom = '1px solid transparent';
    }
  });
}

// ----------------------------------------------------
// 6. Section Animations (GSAP ScrollTrigger)
// ----------------------------------------------------
function initSectionAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Horizontal Scroll for Case Studies
  const caseSection = document.getElementById('case-studies-section');
  const horizontalScroll = document.querySelector('.horizontal-scroll-container');
  
  if (caseSection && horizontalScroll) {
    let scrollWidth = horizontalScroll.offsetWidth - window.innerWidth;
    
    gsap.to(horizontalScroll, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: caseSection,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollWidth,
        invalidateOnRefresh: true
      }
    });
  }

  // Odometer Stats Animation
  const statCounters = document.querySelectorAll('.stat-counter');
  statCounters.forEach(counter => {
    let target = parseFloat(counter.getAttribute('data-target'));
    let suffix = counter.getAttribute('data-suffix') || '';
    let obj = { val: 0 };
    
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        counter.innerText = Math.floor(obj.val) + suffix;
      }
    });
  });

  // Services Bento Grid 3D Tilt
  const serviceCards = document.querySelectorAll('#services-grid .card-glass');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
      
      gsap.to(card, {
        rotationY: x,
        rotationX: -y,
        transformPerspective: 1000,
        boxShadow: ${-x}px px 30px rgba(139, 92, 246, 0.2),
        border: '1px solid rgba(139, 92, 246, 0.5)',
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        boxShadow: "none",
        border: '1px solid var(--border-muted)',
        duration: 0.7,
        ease: "power2.out"
      });
    });
  });
}

const originalInit = initHeroAnimations;
initHeroAnimations = function() {
  originalInit();
  initSectionAnimations();
};
