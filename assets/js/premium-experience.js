// premium-experience.js - Core logic for premium interactions

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. Lenis Smooth Scroll Setup
  // ----------------------------------------------------
  if (typeof Lenis !== 'undefined') {
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
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ----------------------------------------------------
  // 2. Magnetic Custom Cursor Fallback (Handled natively by cursor.js)
  // ----------------------------------------------------
  if (!document.body.classList.contains('custom-cursor-active') && typeof window.initCustomCursor === 'function') {
    window.initCustomCursor();
  }

  // ----------------------------------------------------
  // 3. Global Hero & Scroll Animations
  // ----------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    
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

    // Dashboard Parallax Tilt
    const dashboard = document.getElementById('dashboard-chart');
    if (dashboard) {
      gsap.fromTo(dashboard,
        { opacity: 0, scale: 0.95, rotationX: 10 },
        { opacity: 1, scale: 1, rotationX: 0, duration: 1.5, delay: 0.3, ease: "power3.out" }
      );
      
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
          boxShadow: `${-x}px ${y}px 30px rgba(139, 92, 246, 0.2)`,
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
  }

  // ----------------------------------------------------
  // 4. Navbar Scroll Blur
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
});
