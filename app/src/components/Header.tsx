import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
}

export const Header: React.FC<HeaderProps> = ({ bagCount, onOpenBag }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-cheesie-surface/95 backdrop-blur-md border-b border-cheesie-line shadow-station-sm transition-all duration-200">
      <div className="max-w-layout mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo Wordmark */}
        <a
          className="wordmark group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cheesie-burgundy rounded-lg transition-transform active:scale-95"
          href="#home"
          aria-label="Cheesie trang chủ"
        >
          <div className="relative w-28 sm:w-34 h-11 sm:h-12 overflow-hidden rounded-md bg-cheesie-burgundy border border-cheesie-burgundy-light shadow-station-sm flex items-center justify-center p-1">
            <img
              src="/assets/logo.jpg"
              alt="Cheesie — Burgers & Tacos"
              className="w-full h-full object-contain"
            />
          </div>
        </a>

        {/* Navigation */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-8 text-xs font-semibold text-cheesie-graphite"
        >
          <a
            href="#menu"
            className="relative py-2 text-cheesie-graphite/90 hover:text-cheesie-burgundy transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cheesie-burgundy after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
          >
            Menu nhà Cheesie
          </a>
          <a
            href="#builder"
            className="group relative py-2 text-cheesie-burgundy font-bold transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cheesie-burgundy after:scale-x-100"
          >
            Tự cuốn tacos <i className="not-italic text-cheesie-gold group-hover:rotate-45 inline-block transition-transform duration-200">✦</i>
          </a>
          <a
            href="#space"
            className="relative py-2 text-cheesie-graphite/90 hover:text-cheesie-burgundy transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cheesie-burgundy after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
          >
            Ghé nhà Cheesie
          </a>
        </nav>

        {/* Bag Button */}
        <button
          type="button"
          className="bag-button group relative inline-flex items-center gap-2.5 bg-cheesie-surface hover:bg-cheesie-surface-muted text-cheesie-graphite font-bold text-xs px-4 py-2.5 rounded-lg border border-cheesie-line shadow-station-sm hover:border-cheesie-burgundy/40 hover:text-cheesie-burgundy transition-all duration-200 active:scale-95"
          id="open-bag"
          onClick={onOpenBag}
          aria-label={`Mở túi đồ ngon, hiện có ${bagCount} món`}
        >
          <ShoppingBag className="w-4 h-4 text-cheesie-burgundy transition-transform group-hover:-translate-y-0.5 duration-200" />
          <span className="font-semibold">Túi đồ ngon</span>
          <span
            className="bg-cheesie-burgundy text-cheesie-surface text-[11px] font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
          >
            {bagCount}
          </span>
        </button>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="md:hidden flex items-center justify-around border-t border-cheesie-line/60 bg-cheesie-surface-muted/50 px-3 py-2 text-[11px] font-semibold text-cheesie-graphite">
        <a href="#menu" className="py-1 px-2 hover:text-cheesie-burgundy">
          Menu
        </a>
        <span className="text-cheesie-line">•</span>
        <a href="#builder" className="py-1 px-2 text-cheesie-burgundy font-bold flex items-center gap-1">
          Tự cuốn tacos <span className="text-cheesie-gold">✦</span>
        </a>
        <span className="text-cheesie-line">•</span>
        <a href="#space" className="py-1 px-2 hover:text-cheesie-burgundy">
          Ghé quán
        </a>
      </div>
    </header>
  );
};
