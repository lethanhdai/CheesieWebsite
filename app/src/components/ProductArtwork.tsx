import React from 'react';
import type { MenuItem } from '@/types';

interface ProductArtworkProps {
  item: MenuItem;
  className?: string;
  isDetailView?: boolean;
}

/**
 * Authentic photography inventory for Cheesie:
 * Only items with genuine, verified restaurant photography use image files.
 * Items that previously shared repeated category photos or raw emojis receive
 * an art-directed, branded fast-casual editorial placard with distinct recipe motifs.
 */
const AUTHENTIC_PHOTO_ITEMS = new Set<string>([
  'taco',            // tacos.jpg - authentic Cheesie tacos
  'burger-beef',     // burger.jpg - authentic Cheesie classic burger
  'chicken-1',       // chicken.jpg - authentic Cheesie chicken tenders (6 pcs)
  'fries',           // fries.jpg - authentic Cheesie traditional fries
  'combo-big-feast', // feast.jpg - authentic Cheesie big feast table photo
]);

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  item,
  className = '',
  isDetailView: _isDetailView = false,
}) => {
  const hasAuthenticPhoto = AUTHENTIC_PHOTO_ITEMS.has(item.id) && Boolean(item.image);

  if (hasAuthenticPhoto) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-cheesie-surface-muted/60 ${className}`}>
        <img
          src={`/assets/${item.image}`}
          alt={
            item.id === 'taco'
              ? 'Tacos Pháp từ menu Cheesie'
              : item.id === 'burger-beef'
              ? 'Burger bò phô mai từ menu Cheesie'
              : `${item.name} từ menu Cheesie`
          }
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle inner vignette */}
        <div
          className="absolute inset-0 ring-1 ring-inset ring-cheesie-line/30 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    );
  }

  // Branded Neutral Editorial Placeholder for items awaiting dedicated photoshoot
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-3 select-none overflow-hidden bg-gradient-to-br from-[#FAF7F0] via-[#F5EFE6] to-[#ECE5D8] border-b border-cheesie-line/40 ${className}`}
      aria-label={`Hình minh họa thương hiệu cho ${item.name}`}
    >
      {/* Subtle Station Pinstripe / Railroad Geometry Watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="20" x2="100" y2="20" stroke="#1F2421" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#1F2421" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="#1F2421" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="50" cy="50" r="38" stroke="#1F2421" strokeWidth="1" fill="none" />
      </svg>

      {/* Culinary Category Motif */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {item.category === 'burger' && (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#6A1B20] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Sesame seeds bun top */}
              <path d="M8 20C8 12 15 7 24 7C33 7 40 12 40 20H8Z" fill="#E8C582" stroke="#B88A3B" strokeWidth="2" />
              <circle cx="18" cy="13" r="1" fill="#7A4A1E" />
              <circle cx="24" cy="11" r="1" fill="#7A4A1E" />
              <circle cx="30" cy="14" r="1" fill="#7A4A1E" />
              {/* Cheese & Patty */}
              <path d="M6 24L10 27L14 24L18 27L22 24L26 27L30 24L34 27L38 24L42 27" stroke="#EFB23D" strokeWidth="2.5" />
              <rect x="7" y="27" width="34" height="6" rx="3" fill="#582B20" stroke="#381B14" strokeWidth="1.5" />
              {/* Bun bottom */}
              <path d="M9 36C9 39 12 41 24 41C36 41 39 39 39 36H9Z" fill="#E8C582" stroke="#B88A3B" strokeWidth="2" />
            </svg>
            <span className="text-[10px] font-black tracking-wider text-cheesie-burgundy uppercase mt-0.5">
              {item.id === 'burger-chicken'
                ? 'GÀ GIÒN'
                : item.id === 'burger-beef-bacon'
                ? 'BÒ & BACON'
                : 'GÀ & BACON'}
            </span>
          </div>
        )}

        {item.category === 'chicken' && (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#C98531] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <ellipse cx="24" cy="24" rx="16" ry="12" fill="#E8A852" stroke="#9A5E1E" strokeWidth="2" />
              <path d="M14 20Q24 16 34 20M16 26Q24 22 32 26" stroke="#FFF0D0" strokeWidth="2" strokeLinecap="round" />
              <circle cx="36" cy="16" r="3" fill="#6A1B20" stroke="#FFF" strokeWidth="1" />
            </svg>
            <span className="text-[10px] font-black tracking-wider text-[#9A5E1E] uppercase mt-0.5">
              {item.id === 'chicken-2' ? '9 VIÊN · 2 SỐT' : '12 VIÊN · 3 SỐT'}
            </span>
          </div>
        )}

        {item.category === 'fries' && (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#B88A3B] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 18L13 38H35L34 18" fill="#6A1B20" stroke="#481014" strokeWidth="2" />
              <line x1="18" y1="18" x2="16" y2="8" stroke="#EFB23D" strokeWidth="3" strokeLinecap="round" />
              <line x1="24" y1="18" x2="24" y2="6" stroke="#EFB23D" strokeWidth="3.2" strokeLinecap="round" />
              <line x1="30" y1="18" x2="32" y2="9" stroke="#EFB23D" strokeWidth="3" strokeLinecap="round" />
              {/* Bacon sprinkles */}
              <circle cx="21" cy="28" r="1.5" fill="#A34D38" />
              <circle cx="27" cy="30" r="1.5" fill="#A34D38" />
            </svg>
            <span className="text-[10px] font-black tracking-wider text-[#A34D38] uppercase mt-0.5">
              BACON BITS
            </span>
          </div>
        )}

        {item.category === 'pasta' && (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#A84A28] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Pasta bowl */}
              <path d="M8 24C8 34 14 40 24 40C34 40 40 34 40 24H8Z" fill="#F4E9D5" stroke="#9A7B50" strokeWidth="2" />
              {/* Twirled pasta noodles */}
              <path
                d="M14 22Q20 14 24 22Q28 14 34 22"
                stroke={item.id === 'pasta-tomyum' ? '#E56B48' : item.id === 'pasta-cheese' ? '#EFB23D' : '#582B20'}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M18 18Q24 10 30 18"
                stroke={item.id === 'pasta-tomyum' ? '#E56B48' : item.id === 'pasta-cheese' ? '#EFB23D' : '#582B20'}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="text-[10px] font-black tracking-wider text-cheesie-burgundy uppercase mt-0.5">
              {item.id === 'pasta-tomyum'
                ? 'KEM TOMYUM'
                : item.id === 'pasta-cheese'
                ? 'CUA PHÔ MAI'
                : 'BÒ BẰM TIÊU'}
            </span>
          </div>
        )}

        {item.category === 'combo' && (
          <div className="flex flex-col items-center gap-1 w-full px-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cheesie-burgundy/10 flex items-center justify-center border border-cheesie-burgundy/30 mb-0.5">
              <span className="text-base sm:text-lg">✨</span>
            </div>
            <span className="text-[10px] font-black tracking-wider text-cheesie-burgundy uppercase">
              COMBO TIẾT KIỆM
            </span>
            {item.comboItems && (
              <p className="text-[9px] text-cheesie-muted line-clamp-1 max-w-[160px] font-medium">
                {item.comboItems.slice(0, 2).join(' + ')}
              </p>
            )}
          </div>
        )}

        {item.category === 'drinks' && (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-9 h-9 sm:w-11 sm:h-11 text-cheesie-graphite transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Can/bottle silhouette */}
              <rect
                x="16"
                y="10"
                width="16"
                height="28"
                rx="5"
                fill={
                  item.id === 'pepsi'
                    ? '#004B93'
                    : item.id === 'pepsi-lime'
                    ? '#008542'
                    : item.id === '7up'
                    ? '#008B45'
                    : '#469BD8'
                }
                stroke="#1F2421"
                strokeWidth="2"
              />
              <line x1="20" y1="10" x2="28" y2="10" stroke="#FFF" strokeWidth="2" />
              <line x1="16" y1="16" x2="32" y2="16" stroke="#FFF" strokeWidth="1" opacity="0.6" />
              <line x1="16" y1="32" x2="32" y2="32" stroke="#FFF" strokeWidth="1" opacity="0.6" />
            </svg>
            <span className="text-[10px] font-bold tracking-wider text-cheesie-graphite uppercase mt-0.5">
              ƯỚP LẠNH
            </span>
          </div>
        )}
      </div>

      {/* Branded Fast-Casual Stamp */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-60">
        <span className="text-[8px] font-bold tracking-widest uppercase text-cheesie-muted">
          CHEESIE RECIPE
        </span>
      </div>
    </div>
  );
};
