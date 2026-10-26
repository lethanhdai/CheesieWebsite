import { useState, useEffect, useCallback } from 'react';

export type SectionId = 'home' | 'menu' | 'builder' | 'space';

interface UseActiveSectionOptions {
  sectionIds?: SectionId[];
  headerOffset?: number;
}

export function useActiveSection({
  sectionIds = ['home', 'menu', 'builder', 'space'],
  headerOffset = 80,
}: UseActiveSectionOptions = {}) {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Scroll listener for sticky header styling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    // Use rootMargin to target the reading viewport zone
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-20% 0px -55% 0px',
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = useCallback(
    (id: SectionId) => {
      const el = document.getElementById(id);
      if (!el) return;

      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      setActiveSection(id);
    },
    [headerOffset]
  );

  return {
    activeSection,
    setActiveSection,
    isScrolled,
    scrollToSection,
  };
}
