import React from 'react';
import { Plus } from 'lucide-react';
import type { MenuItem } from '@/types';
import { formatVND } from '@/domain/cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onSelect, index = 0 }) => {
  const isTaco = item.id === 'taco';
  const staggerClass = `reveal-stagger-${(index % 4) + 1}`;

  return (
    <div
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-cheesie-line/60 bg-cheesie-surface hover:border-cheesie-burgundy/40 hover:shadow-station-card transition-all duration-300 reveal-on-scroll ${staggerClass}`}
    >
      {/* Visual Image / Artwork Area */}
      <div className="relative w-full aspect-[4/3] bg-cheesie-surface-muted/60 overflow-hidden border-b border-cheesie-line/50">
        {item.image ? (
          <img
            src={`/assets/${item.image}`}
            alt={
              item.id === 'taco'
                ? 'Tacos từ ảnh menu Cheesie'
                : item.image === 'burger.jpg'
                ? 'Ảnh burger đại diện từ menu Cheesie'
                : `${item.name} từ menu Cheesie`
            }
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-110 select-none ${
              item.category === 'pasta' ? 'bg-[#F3EDE2]' : 'bg-[#EAF0E8]'
            }`}
            aria-hidden="true"
          >
            {item.emoji}
          </div>
        )}

        {/* Feature Tag */}
        {item.tag && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <Badge variant="tag" className="text-[9px] px-2 py-0.5 tracking-wider bg-cheesie-surface/90 backdrop-blur-xs">
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

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-cheesie-graphite group-hover:text-cheesie-burgundy transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-cheesie-muted leading-relaxed mt-1 line-clamp-2 min-h-[32px]">
            {item.desc}
          </p>
        </div>

        {/* Price & Add Action with touch target >= 44px */}
        <div className="flex items-center justify-between pt-3 border-t border-cheesie-line/50">
          <div className="flex flex-col">
            {isTaco && (
              <span className="text-[10px] uppercase font-bold tracking-wider text-cheesie-muted">
                Khởi điểm từ
              </span>
            )}
            <strong className="text-sm sm:text-base font-extrabold text-cheesie-graphite tracking-tight">
              {formatVND(item.price)}
            </strong>
          </div>

          <div className="relative flex items-center justify-center">
            <Button
              type="button"
              variant="default"
              size="iconSm"
              className="dish-add relative w-9 h-9 rounded-full bg-cheesie-burgundy hover:bg-cheesie-burgundy-hover text-cheesie-surface shadow-station-sm hover:scale-105 active:scale-95 transition-all after:content-[''] after:absolute after:-inset-1.5"
              onClick={() => onSelect(item)}
              aria-label={`${isTaco ? 'Tự chọn' : 'Chọn'} ${item.name}`}
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
