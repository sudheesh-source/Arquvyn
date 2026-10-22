/**
 * arquvyn — Coming Soon Script
 * Handles large background logo scroll reactivity, smooth header offset scrolling,
 * and accessibility considerations.
 */

/* =========================================================================
 * BACKGROUND LOGO SCROLL ANIMATION CONFIGURATION
 * Edit these constants or the corresponding CSS variables in style.css (:root)
 * ========================================================================= */
const BG_LOGO_CONFIG = {
  startOpacity: 0.22,       // Starting opacity when at top of page (15-25% range)
  travelDistancePx: 130,    // Downward movement in px by the time fade completes
  fadeDistanceScreens: 1.0, // Scrolled viewport heights for full fade-out (1.0 = 100vh)
  easePower: 2.2            // Slight ease curve exponent (1 = linear, >1 = natural deceleration)
};

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundLogoScroll();
  initSmoothScrollNavigation();
});

/**
 * Initializes the decorative background logo scroll interaction.
 * Uses native CSS animation-timeline where supported, falling back to a lightweight,
 * passive requestAnimationFrame loop with hardware-accelerated transforms.
 */
function initBackgroundLogoScroll() {
  const bgLogo = document.getElementById('bg-logo');
  if (!bgLogo) return;

  // 1. Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Respect user setting: keep static at low opacity, no scroll transforms
    return;
  }

  // 2. Check for native CSS scroll-driven animation support
  const supportsScrollTimeline = 
    window.CSS && 
    CSS.supports && 
    CSS.supports('animation-timeline', 'scroll()');

  if (supportsScrollTimeline) {
    // Let the browser compositor run the animation natively at display refresh rate
    bgLogo.classList.add('has-css-scroll');
    return;
  }

  // 3. Fallback: RequestAnimationFrame driven scroll handler with passive listener
  let ticking = false;

  function easeOut(t) {
    // Smooth deceleration curve so the movement feels natural
    return 1 - Math.pow(1 - t, BG_LOGO_CONFIG.easePower);
  }

  function updateLogoTransform() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const fadeDistance = window.innerHeight * BG_LOGO_CONFIG.fadeDistanceScreens;

    // Progress normalized & clamped strictly between 0 and 1
    const rawProgress = Math.min(Math.max(scrollY / fadeDistance, 0), 1);
    const eased = easeOut(rawProgress);

    // Calculate updated transform and opacity
    const currentOpacity = BG_LOGO_CONFIG.startOpacity * (1 - eased);
    const currentTranslateY = BG_LOGO_CONFIG.travelDistancePx * eased;

    // Apply solely via translate3d and opacity for hardware-accelerated compositor rendering
    bgLogo.style.opacity = currentOpacity.toFixed(4);
    bgLogo.style.transform = `translate3d(-50%, calc(-50% + ${currentTranslateY.toFixed(2)}px), 0)`;

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateLogoTransform);
      ticking = true;
    }
  }

  // Passive listener for non-blocking scrolling performance
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial calculation on page load
  updateLogoTransform();

  // Listen for reduced motion preference toggles dynamically
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      bgLogo.style.opacity = '';
      bgLogo.style.transform = '';
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      updateLogoTransform();
    }
  });
}

/**
 * Handles smooth anchor link scrolling taking the sticky header offset into account.
 */
function initSmoothScrollNavigation() {
  const header = document.querySelector('.site-header');
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Maintain accessible focus for keyboard and screen reader users
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}
