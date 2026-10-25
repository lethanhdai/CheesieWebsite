import React, { useState } from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import type { MenuItem } from '@/types';
import { ProductCard } from './ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onSelectDish: (item: MenuItem) => void;
  onViewOriginalMenu: () => void;
}

type MenuCategory = 'favourites' | 'burger' | 'chicken' | 'pasta' | 'drinks';

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onSelectDish,
  onViewOriginalMenu,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('favourites');

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'favourites', label: 'Món nên thử' },
    { key: 'burger', label: 'Burger' },
    { key: 'chicken', label: 'Gà & khoai' },
    { key: 'pasta', label: 'Mì Ý' },
    { key: 'drinks', label: 'Nước uống' },
  ];

  const favouriteIds = ['taco', 'burger-beef', 'chicken-1', 'fries'];

  const displayedItems =
    activeCategory === 'favourites'
      ? favouriteIds
          .map((id) => menuItems.find((i) => i.id === id))
          .filter((i): i is MenuItem => i !== undefined)
      : menuItems.filter((i) => i.category === activeCategory);

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
    <section className="menu-section section bg-cheesie-ivory/50 py-16 sm:py-24 border-b border-cheesie-line" id="menu">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-title flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-cheesie-line/70">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="station" className="px-2.5 py-0.5 text-[9px] font-bold">
                PLATFORM 01
              </Badge>
              <span className="text-xs font-bold tracking-wider text-cheesie-muted uppercase">
                MENU NHÀ CHEESIE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cheesie-graphite tracking-tight leading-tight">
              Mỗi cơn đói.
              <br />
              <span className="text-cheesie-burgundy italic">Một món đúng gu.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-cheesie-muted max-w-sm leading-relaxed">
            Team tacos hay team burger?
            <br />
            Nhà Cheesie luôn có chỗ cho mọi chiếc bụng đói ghé trạm.
          </p>
        </div>

        {/* Menu Category Filter Toolbar */}
        <div className="menu-toolbar flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div
            className="category-tabs flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none"
            role="group"
            aria-label="Nhóm món ăn"
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 select-none ${
                    isSelected
                      ? 'bg-cheesie-burgundy text-cheesie-surface shadow-station-sm scale-[1.02]'
                      : 'bg-cheesie-surface text-cheesie-graphite hover:bg-cheesie-surface-muted border border-cheesie-line hover:border-cheesie-burgundy/40'
                  }`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="menu-original self-start sm:self-auto text-xs font-semibold text-cheesie-burgundy hover:bg-cheesie-surface-muted gap-1.5 border-b border-cheesie-burgundy/40 rounded-none pb-1 hover:border-cheesie-burgundy"
            id="view-menu"
            onClick={onViewOriginalMenu}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Xem menu gốc</span>
            <span className="text-xs">↗</span>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" id="menu-grid">
          {displayedItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onSelect={handleDishClick}
            />
          ))}
        </div>

        {/* Station Boarding Banner to Tacos Builder */}
        <a
          className="tacos-banner group mt-12 block relative overflow-hidden rounded-xl border border-cheesie-line bg-gradient-to-r from-cheesie-surface via-cheesie-surface to-cheesie-surface-muted p-6 sm:p-8 shadow-station-card hover:shadow-station-hover hover:border-cheesie-burgundy/40 transition-all duration-300"
          href="#builder"
        >
          {/* Left Burgundy Railway Track Stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-cheesie-burgundy" aria-hidden="true" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
            <div>
              <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest text-cheesie-burgundy uppercase mb-1">
                KHÔNG THẤY CHIẾC TACOS TRONG MƠ?
              </span>
              <strong className="block text-xl sm:text-2xl font-black text-cheesie-graphite tracking-tight group-hover:text-cheesie-burgundy transition-colors">
                Vậy thì tự cuốn một chiếc. <i className="not-italic inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</i>
              </strong>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="station" className="text-[10px] px-3 py-1 font-bold">
                5 SIZE · 5 LOẠI NHÂN · 4 LOẠI SỐT
              </Badge>
              <div className="hidden sm:flex w-9 h-9 rounded-full bg-cheesie-burgundy text-cheesie-surface items-center justify-center transition-transform group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};
