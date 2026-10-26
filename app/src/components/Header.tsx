import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { useActiveSection, type SectionId } from '@/lib/useActiveSection';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
  activeSection?: SectionId;
  onNavigateSection?: (id: SectionId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  bagCount,
  onOpenBag,
  activeSection: propActiveSection,
  onNavigateSection: propNavigateSection,
}) => {
  const {
    activeSection: hookActiveSection,
    isScrolled,
    scrollToSection: hookScrollToSection,
  } = useActiveSection();

  const activeSection = propActiveSection || hookActiveSection;
  const scrollToSection = propNavigateSection || hookScrollToSection;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBumping, setIsBumping] = useState(false);
  const prevCount = useRef(bagCount);
  const menuSheetRef = useRef<HTMLDivElement>(null);

  // Trigger cart badge bump on count increase/change
  useEffect(() => {
    if (bagCount !== prevCount.current) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 420);
      prevCount.current = bagCount;
      return () => clearTimeout(timer);
    }
  }, [bagCount]);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMobileMenuOpen]);

  const navLinks: { id: SectionId; label: string; href: string; sparkle?: boolean }[] = [
    { id: 'menu', label: 'Menu nhà Cheesie', href: '#menu' },
    { id: 'builder', label: 'Tự cuốn tacos', href: '#builder', sparkle: true },
    { id: 'space', label: 'Ghé nhà Cheesie', href: '#space' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-cheesie-surface/95 backdrop-blur-md border-b border-cheesie-line shadow-station-sm py-0.5'
            : 'bg-cheesie-surface border-b border-cheesie-line/70'
        }`}
      >
        <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Logo Wordmark */}
          <a
            className="wordmark group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cheesie-burgundy rounded-lg transition-transform active:scale-95 shrink-0"
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            aria-label="Cheesie trang chủ"
          >
            <div className="relative w-24 sm:w-36 md:w-40 h-9 sm:h-13 md:h-14 overflow-hidden rounded-md bg-[#6A1B20] border border-[#8E3E42] shadow-station-sm">
              <img
                src="/assets/logo.jpg"
                alt="Cheesie — Burgers & Tacos"
                className="absolute w-[115px] sm:w-[170px] md:w-[185px] h-[115px] sm:h-[170px] md:h-[185px] max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
              />
            </div>
          </a>

          {/* Desktop Navigation with Animated Active Indicators */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold text-cheesie-graphite p-1 bg-cheesie-surface-muted/40 rounded-full border border-cheesie-line/60"
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 select-none ${
                    isActive
                      ? 'bg-cheesie-burgundy text-cheesie-surface shadow-sm font-bold'
                      : 'text-cheesie-graphite/90 hover:text-cheesie-burgundy hover:bg-cheesie-surface/80'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span>{item.label}</span>
                  {item.sparkle && (
                    <span
                      className={`inline-block transition-transform duration-300 text-xs ${
                        isActive ? 'text-cheesie-gold rotate-12 scale-110' : 'text-cheesie-gold/80'
                      }`}
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Cart Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bag Button with minimum 44px hit target */}
            <button
              type="button"
              className="bag-button group relative inline-flex items-center gap-1.5 sm:gap-2 bg-cheesie-surface hover:bg-cheesie-surface-muted text-cheesie-graphite font-bold text-xs h-10 sm:h-11 px-2.5 sm:px-4 rounded-xl border border-cheesie-line shadow-station-sm hover:border-cheesie-burgundy/40 hover:text-cheesie-burgundy transition-all duration-200 active:scale-95 after:content-[''] after:absolute after:-inset-1.5 sm:after:hidden"
              id="open-bag"
              onClick={onOpenBag}
              aria-label={`Mở túi đồ ngon, hiện có ${bagCount} món`}
            >
              <ShoppingBag className="w-4 h-4 text-cheesie-burgundy transition-transform group-hover:-translate-y-0.5 duration-200 shrink-0" />
              <span className="font-semibold hidden sm:inline">Túi đồ ngon</span>
              <span
                className={`bg-cheesie-burgundy text-cheesie-surface text-[11px] font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center transition-transform duration-200 shrink-0 ${
                  isBumping ? 'animate-cart-bump' : ''
                }`}
              >
                {bagCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button (min 44x44px touch target) */}
            <button
              type="button"
              className="md:hidden relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cheesie-surface border border-cheesie-line text-cheesie-graphite hover:text-cheesie-burgundy hover:bg-cheesie-surface-muted active:scale-95 transition-all duration-200 after:content-[''] after:absolute after:-inset-1.5"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Mở menu điều hướng"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-sheet"
            >
              <MenuIcon className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Dedicated Mobile Navigation Sheet */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end md:hidden animate-drawer-fade"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng di động"
          id="mobile-navigation-sheet"
        >
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-cheesie-graphite/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Surface */}
          <div
            ref={menuSheetRef}
            className="relative w-[85vw] max-w-sm h-full bg-cheesie-surface border-l border-cheesie-line shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-drawer-in z-10"
          >
            {/* Top Sheet Bar */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-cheesie-line/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cheesie-burgundy flex items-center justify-center text-cheesie-surface font-black text-xs">
                    CS
                  </div>
                  <div>
                    <strong className="block text-xs font-bold tracking-wider uppercase text-cheesie-graphite">
                      CHEESIE STATION
                    </strong>
                    <span className="text-[10px] text-cheesie-muted">Menu & Không gian</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-cheesie-graphite hover:bg-cheesie-surface-muted border border-cheesie-line/70 active:scale-95 transition-all"
                  aria-label="Đóng menu điều hướng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-6 flex flex-col gap-2" aria-label="Menu di động">
                {navLinks.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all min-h-[48px] ${
                        isActive
                          ? 'bg-cheesie-burgundy text-cheesie-surface shadow-sm'
                          : 'text-cheesie-graphite hover:bg-cheesie-surface-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span>{item.label}</span>
                        {item.sparkle && (
                          <span
                            className={isActive ? 'text-cheesie-gold' : 'text-cheesie-burgundy'}
                          >
                            ✦
                          </span>
                        )}
                      </div>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-cheesie-gold' : 'text-cheesie-muted'}`} />
                    </a>
                  );
                })}
              </nav>

              {/* Quick Bag Button inside Sheet */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBag();
                }}
                className="w-full mt-4 flex items-center justify-between px-4 py-3.5 rounded-xl border border-cheesie-line bg-cheesie-surface-muted/60 text-cheesie-graphite text-sm font-bold min-h-[48px] active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-cheesie-burgundy" />
                  <span>Xem túi đồ ngon</span>
                </div>
                <span className="bg-cheesie-burgundy text-cheesie-surface text-xs font-black px-2 py-0.5 rounded-full">
                  {bagCount} món
                </span>
              </button>
            </div>

            {/* Bottom Station Contact Info Card */}
            <div className="mt-8 pt-5 border-t border-cheesie-line/70 text-xs text-cheesie-muted space-y-2.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cheesie-burgundy block">
                THÔNG TIN GA TÀU
              </span>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cheesie-burgundy shrink-0 mt-0.5" />
                <span>102 Lê Lai, Ninh Kiều, Cần Thơ</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cheesie-burgundy shrink-0" />
                <span>09:30–22:30 (Mỗi ngày)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cheesie-burgundy shrink-0" />
                <a href="tel:0788786283" className="font-semibold text-cheesie-graphite hover:underline">
                  078 878 6283
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
