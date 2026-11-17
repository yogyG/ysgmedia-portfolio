/**
 * YSG Media - High-Performance Vanilla Custom Cursor
 * 
 * - Zero external dependencies (No GSAP or Lenis required).
 * - Instant 0-latency tracking for primary pointer dot.
 * - Smooth inertia follower using requestAnimationFrame lerp.
 * - Hardware-accelerated translate3d transforms (no layout reflows).
 * - Safe pointer detection: runs whenever a fine pointer (mouse / trackpad) is present.
 * - Automatically hidden on mobile / touchscreens without fine pointers.
 * - Respects prefers-reduced-motion media query.
 * - Stays hidden (opacity: 0) until valid mouse coordinates are captured to prevent (0, 0) freezing.
 * - Efficient event delegation for interactive hover states.
 * - pointer-events: none ensures clicks and gestures pass through unhindered.
 */

export function initCustomCursor() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.__customCursorInitialized) return;

  // Guard: Do not run on devices that strictly lack a fine pointer (pure touch mobile/tablet)
  const isCoarseOnly = window.matchMedia && 
    window.matchMedia('(pointer: coarse)').matches && 
    !window.matchMedia('(any-pointer: fine)').matches;

  if (isCoarseOnly) {
    return;
  }

  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  if (!cursor || !follower) {
    return;
  }

  window.__customCursorInitialized = true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isVisible = false;
  let isHovering = false;
  let rafId = null;

  function render() {
    if (prefersReducedMotion) {
      followerX = mouseX;
      followerY = mouseY;
    } else {
      // Smooth lerp: 0.18 factor provides responsive, fluid inertia
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
    }

    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

    if (isVisible) {
      rafId = requestAnimationFrame(render);
    } else {
      rafId = null;
    }
  }

  function activateCursor(x, y) {
    mouseX = x;
    mouseY = y;

    // Instantly update inner dot position
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    if (!isVisible) {
      isVisible = true;
      followerX = mouseX;
      followerY = mouseY;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      
      document.body.classList.add('custom-cursor-active');
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    }

    if (!rafId) {
      rafId = requestAnimationFrame(render);
    }
  }

  function onMouseMove(e) {
    activateCursor(e.clientX, e.clientY);
  }

  function onMouseEnter(e) {
    activateCursor(e.clientX, e.clientY);
  }

  function onMouseLeave() {
    isVisible = false;
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
    document.body.classList.remove('custom-cursor-active');
    document.body.classList.remove('cursor-hover');
  }

  function onTouchStart() {
    isVisible = false;
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
    document.body.classList.remove('custom-cursor-active');
    document.body.classList.remove('cursor-hover');
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Interactive selectors that trigger cursor expansion and hover state
  const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .card-glass, .btn-primary, .btn-secondary, .btn-outline, .btn-whatsapp, .hamburger, .hover-target, .stat-counter';

  function onMouseOver(e) {
    if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
      if (!isHovering) {
        isHovering = true;
        document.body.classList.add('cursor-hover');
      }
    }
  }

  function onMouseOut(e) {
    if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
      const nextTarget = e.relatedTarget;
      if (!nextTarget || !nextTarget.closest || !nextTarget.closest(interactiveSelector)) {
        isHovering = false;
        document.body.classList.remove('cursor-hover');
      }
    }
  }

  // Event listeners
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('mouseenter', onMouseEnter, { passive: true });
  document.addEventListener('mouseover', onMouseOver, { passive: true });
  document.addEventListener('mouseout', onMouseOut, { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
}

// Global exposure for non-module compatibility
if (typeof window !== 'undefined') {
  window.initCustomCursor = initCustomCursor;
}

// Auto-run if loaded directly as a script
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
  } else {
    initCustomCursor();
  }
}
