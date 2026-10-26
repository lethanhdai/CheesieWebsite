import React, { useState, useRef } from 'react';
import { FileText } from 'lucide-react';
import type { MenuItem, MenuItemCategory } from '@/types';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onSelectDish: (item: MenuItem) => void;
  onViewOriginalMenu: () => void;
}

export type MenuFilterCategory = 'all' | MenuItemCategory;

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onSelectDish,
  onViewOriginalMenu,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuFilterCategory>('all');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const categories: { key: MenuFilterCategory; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'tacos', label: 'Tacos Pháp' },
    { key: 'burger', label: 'Burger' },
    { key: 'chicken', label: 'Gà tender' },
    { key: 'fries', label: 'Khoai' },
    { key: 'pasta', label: 'Mì Ý' },
    { key: 'combo', label: 'Combo' },
    { key: 'drinks', label: 'Nước uống' },
  ];

  const displayedItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  const handleTabClick = (catKey: MenuFilterCategory, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(catKey);
    // Auto-scroll the selected tab into view safely
    if (typeof e.currentTarget?.scrollIntoView === 'function') {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const handleDishClick = (item: MenuItem) => {
    if (item.id === 'taco') {
      const builderElement = document.getElementById('builder');
      if (builderElement) {
        builderElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    onSelectDish(item);
  };

  return (
    <section className="menu-section section bg-cheesie-ivory/50 py-12 sm:py-24 border-b border-cheesie-line" id="menu">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-title flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 border-b border-cheesie-line/70 reveal-on-scroll">
          <div>
            {/* Editorial Eyebrow Label */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cheesie-burgundy shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold tracking-widest text-cheesie-burgundy uppercase">
                MENU NHÀ CHEESIE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-cheesie-graphite tracking-tight leading-tight">
              Mỗi cơn đói.
              <br />
              <span className="text-cheesie-burgundy italic">Một món đúng gu.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-cheesie-muted max-w-sm leading-relaxed">
            Tacos, burger, gà giòn, mì Ý… Món nào hợp gu bạn hôm nay?
          </p>
        </div>

        {/* Menu Category Filter Toolbar */}
        <div className="menu-toolbar flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 reveal-on-scroll reveal-stagger-1">
          {/* Horizontally Scrollable Categories with scroll affordance */}
          <div className="relative max-w-full overflow-hidden">
            <div
              ref={tabsContainerRef}
              className="category-tabs inline-flex items-center gap-1.5 p-1 bg-cheesie-surface-muted/50 rounded-xl border border-cheesie-line/60 overflow-x-auto max-w-full scrollbar-none scroll-smooth touch-pan-x"
              role="group"
              aria-label="Nhóm món ăn"
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.key;
                const count =
                  cat.key === 'all'
                    ? menuItems.length
                    : menuItems.filter((i) => i.category === cat.key).length;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    aria-label={cat.label}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 select-none min-h-[38px] flex items-center justify-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-cheesie-burgundy text-cheesie-surface shadow-sm'
                        : 'text-cheesie-graphite hover:text-cheesie-burgundy hover:bg-cheesie-surface/70'
                    }`}
                    onClick={(e) => handleTabClick(cat.key, e)}
                  >
                    <span>{cat.label}</span>
                    <span
                      aria-hidden="true"
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold transition-colors ${
                        isSelected
                          ? 'bg-cheesie-surface/20 text-cheesie-surface'
                          : 'bg-cheesie-line/40 text-cheesie-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Mobile edge scroll fade affordance */}
            <div
              className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-cheesie-ivory/80 to-transparent"
              aria-hidden="true"
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="menu-original self-start sm:self-auto text-xs font-semibold text-cheesie-burgundy hover:bg-cheesie-surface-muted gap-1.5 border-b border-cheesie-burgundy/40 rounded-none pb-1 hover:border-cheesie-burgundy min-h-[38px] shrink-0"
            id="view-menu"
            onClick={onViewOriginalMenu}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Xem menu gốc</span>
            <span className="text-xs">↗</span>
          </Button>
        </div>

        {/* Product Grid: adaptive height, naturally conforming to item count without empty vertical void */}
        <div
          className="menu-grid flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 min-h-0 transition-all duration-300"
          id="menu-grid"
        >
          {displayedItems.map((item, idx) => (
            <ProductCard
              key={item.id}
              item={item}
              onSelect={handleDishClick}
              index={idx}
            />
          ))}
        </div>

        {/* Bottom Banner & Quick Link */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-cheesie-surface border border-cheesie-line/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 reveal-on-scroll">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cheesie-burgundy shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold text-cheesie-burgundy uppercase tracking-wider">
                TỰ TAY TẠO GU
              </span>
              <span className="text-[10px] text-cheesie-muted">· Giao hàng tận nơi</span>
            </div>
            <p className="text-xs sm:text-sm text-cheesie-graphite font-medium">
              Thèm món nào, bấm chọn món đó. Quán sẽ xác nhận đơn và giao ngay khi bạn chốt.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="self-start sm:self-auto text-xs font-bold text-cheesie-burgundy border-cheesie-burgundy/40 hover:bg-cheesie-surface-muted min-h-[40px] shrink-0"
            onClick={() => {
              const builderElement = document.getElementById('builder');
              if (builderElement) {
                builderElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Muốn tacos đúng gu? Tự cuốn một chiếc nhé ↗
          </Button>
        </div>
      </div>
    </section>
  );
};
