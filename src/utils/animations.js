import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger defaults globally
ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
});

ScrollTrigger.defaults({
  fastScrollEnd: true,
  toggleActions: 'play none none none',
});

// Layout shift safety listeners: refresh trigger calculations when fonts and window load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
}

/**
 * Creates a robust, fast-scroll-safe entrance reveal animation.
 *
 * Guarantees that elements:
 * 1. Animate smoothly during normal scroll with exact timing, easing, and staggers.
 * 2. Complete immediately during fast scroll (fastScrollEnd) instead of getting stuck mid-animation.
 * 3. Never remain stuck at opacity 0 or transformed (via clearProps on completion).
 * 4. Stay visible when scrolling back up (toggleActions: 'play none none none').
 * 5. Have an IntersectionObserver safety net ensuring visibility if rapidly scrolled past.
 *
 * @param {Element|Element[]|NodeList|string} targets - Elements to animate
 * @param {Object} options - Animation configuration options
 * @returns {gsap.core.Tween|null}
 */
export function animateReveal(targets, options = {}) {
  if (!targets) return null;

  const {
    trigger,
    start = 'top 85%',
    y = 30,
    x,
    scale,
    scaleY,
    transformOrigin,
    clipPath,
    duration = 0.9,
    stagger = 0.08,
    delay = 0,
    ease = 'power3.out',
  } = options;

  // Resolve trigger element
  let triggerEl = trigger;
  if (!triggerEl) {
    if (typeof targets === 'string') {
      triggerEl = targets;
    } else if (targets.length !== undefined && targets.length > 0) {
      triggerEl = targets[0];
    } else {
      triggerEl = targets;
    }
  }

  if (!triggerEl) return null;

  let tween;

  // 1. Clip-path reveals (e.g. image wipes)
  if (clipPath) {
    tween = gsap.fromTo(
      targets,
      { clipPath: clipPath.from },
      {
        clipPath: clipPath.to,
        duration,
        delay,
        ease,
        clearProps: 'clipPath',
        scrollTrigger: {
          trigger: triggerEl,
          start,
          toggleActions: 'play none none none',
          fastScrollEnd: true,
        },
      }
    );
  } else {
    // 2. Standard opacity + transform reveals
    const fromVars = {
      opacity: 0,
      ease,
    };
    if (y !== undefined && y !== 0) fromVars.y = y;
    if (x !== undefined && x !== 0) fromVars.x = x;
    if (scale !== undefined) fromVars.scale = scale;
    if (scaleY !== undefined) fromVars.scaleY = scaleY;
    if (transformOrigin) fromVars.transformOrigin = transformOrigin;

    tween = gsap.from(targets, {
      ...fromVars,
      duration,
      stagger,
      delay,
      clearProps: 'opacity,transform',
      scrollTrigger: {
        trigger: triggerEl,
        start,
        toggleActions: 'play none none none',
        fastScrollEnd: true,
      },
    });
  }

  // 3. Failsafe: IntersectionObserver ensures content reaches completion if entered or scrolled past
  if (
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    triggerEl instanceof Element
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            if (tween && tween.progress() < 1) {
              // If already scrolled past or scrolling very rapidly, complete immediately
              if (
                entry.boundingClientRect.bottom < 0 ||
                Math.abs(ScrollTrigger.getVelocity?.() || 0) > 1000
              ) {
                tween.totalProgress(1);
              }
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );
    observer.observe(triggerEl);
  }

  return tween;
}
