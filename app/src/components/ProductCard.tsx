import React from 'react';
import { Plus } from 'lucide-react';
import type { MenuItem } from '@/types';
import { formatVND } from '@/domain/cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductArtwork } from './ProductArtwork';

interface ProductCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onSelect, index = 0 }) => {
  const isTaco = item.id === 'taco';
  const isCombo = item.category === 'combo';
  const staggerClass = `reveal-stagger-${(index % 4) + 1}`;

  return (
    <article
      className={`group flex flex-row sm:flex-col justify-between overflow-hidden rounded-2xl border border-cheesie-line/60 bg-cheesie-surface hover:border-cheesie-burgundy/40 hover:shadow-station-sm transition-all duration-300 p-3 sm:p-0 gap-3 sm:gap-0 reveal-on-scroll ${staggerClass}`}
    >
      {/* Product Artwork Area: authentic photo where available, or fast-casual editorial placeholder */}
      <div className="relative w-24 h-24 sm:w-full sm:aspect-[4/3] rounded-xl sm:rounded-none shrink-0 bg-cheesie-surface-muted/50 overflow-hidden border border-cheesie-line/40 sm:border-0 sm:border-b sm:border-cheesie-line/50">
        <ProductArtwork item={item} />

        {/* Feature Tag */}
        {item.tag && (
          <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-10">
            <Badge
              variant="tag"
              className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 tracking-wider bg-cheesie-surface/90 backdrop-blur-xs font-bold shadow-xs"
            >
              {item.tag}
            </Badge>
          </div>
        )}

        {/* Subtle hover overlay */}
        <div
          className="absolute inset-0 bg-cheesie-burgundy/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Card Content Body */}
      <div className="p-0 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-3 min-w-0">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-extrabold text-sm sm:text-base text-cheesie-graphite group-hover:text-cheesie-burgundy transition-colors line-clamp-1">
              {item.name}
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-cheesie-muted leading-relaxed mt-0.5 sm:mt-1 line-clamp-2 min-h-0 sm:min-h-[32px]">
            {item.desc}
          </p>

          {/* Quick Combo Included Summary for desktop */}
          {isCombo && item.comboItems && (
            <div className="hidden sm:flex flex-wrap gap-1 mt-2">
              {item.comboItems.slice(0, 3).map((subItem, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-cheesie-surface-muted/70 text-cheesie-graphite/80 font-medium"
                >
                  ✓ {subItem}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Add Action with touch target >= 44px */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-3 border-t border-cheesie-line/40 sm:border-cheesie-line/50 mt-auto">
          <div className="flex flex-col">
            {isTaco && (
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-cheesie-muted">
                Khởi điểm từ
              </span>
            )}
            <strong className="text-sm sm:text-base font-black text-cheesie-graphite tracking-tight">
              {formatVND(item.price)}
            </strong>
          </div>

          <div className="relative flex items-center justify-center">
            <Button
              type="button"
              variant="default"
              size="sm"
              className="dish-add relative h-8 sm:h-9 px-2.5 sm:px-0 sm:w-9 rounded-lg sm:rounded-full bg-cheesie-burgundy hover:bg-cheesie-burgundy-hover text-cheesie-surface shadow-station-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1 after:content-[''] after:absolute after:-inset-2"
              onClick={() => onSelect(item)}
              aria-label={`${isTaco ? 'Tự chọn' : 'Chọn'} ${item.name}`}
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              <span className="text-[11px] font-bold sm:hidden">
                {isTaco ? 'Cuốn' : isCombo ? 'Xem' : 'Chọn'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
