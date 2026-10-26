import { useEffect } from 'react';

/**
 * Lightweight scroll reveal using IntersectionObserver and MutationObserver.
 * Triggers entrance animations once per element, with automatic fallback
 * when IntersectionObserver is unavailable or prefers-reduced-motion is active.
 * Handles dynamic content insertion (such as category tab changes).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const observeEl = (el: HTMLElement) => {
      if (el.classList.contains('is-revealed')) return;
      const rect = el.getBoundingClientRect();
      // If element is already in the viewport or above it, reveal immediately
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    };

    // Observe all current elements
    document.querySelectorAll<HTMLElement>('.reveal-on-scroll, [data-reveal]').forEach(observeEl);

    // Watch for dynamically inserted elements (e.g. when category filter switches)
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.matches('.reveal-on-scroll, [data-reveal]')) {
                observeEl(node);
              }
              node.querySelectorAll<HTMLElement>('.reveal-on-scroll, [data-reveal]').forEach(observeEl);
            }
          });
        }
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
