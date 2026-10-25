import React from 'react';

export const ShinkansenTrainIcon: React.FC<{ className?: string }> = ({
  className = 'w-8 h-4.5',
}) => (
  <svg
    viewBox="0 0 52 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Aerodynamic Shinkansen Streamlined Bullet Train Silhouette */}
    {/* Train body */}
    <path
      d="M2 18 C10 18 20 17.5 30 14.5 C37 12 45 7.5 50 3.5 C49 8.5 45 15 39 17.8 C31 21 20 22 2 22 Z"
      fill="#FBFAF7"
    />
    {/* Aerodynamic Cockpit Windshield Visor */}
    <path
      d="M28 10.5 C33 8.5 38 5.8 42 3.8 C40 6.2 36 9 31 10.5 Z"
      fill="#24292D"
    />
    {/* Burgundy Speed Stripe along the flank */}
    <path
      d="M2 15 C11 15 22 14 32 11.5 C36 10.5 41 7.8 45 5.8 C43 7.5 38 11 31 12.8 C21 15.2 11 16 2 16 Z"
      fill="#6A1B20"
    />
    {/* Twin Shinkansen Headlights with glowing signal illumination */}
    <circle cx="47" cy="10" r="1.5" fill="#F59E0B" />
    <circle cx="47" cy="10" r="3" fill="#F59E0B" fillOpacity="0.35" />
    <circle cx="42" cy="13" r="1.2" fill="#F59E0B" />
  </svg>
);

const MarqueeUnit: React.FC = () => (
  <div className="inline-flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8 select-none">
    {/* Leading Shinkansen Bullet Train Icon */}
    <div className="flex items-center gap-2 bg-cheesie-burgundy text-cheesie-surface px-3 py-1 rounded-full border border-cheesie-burgundy-light/50 shadow-sm">
      <ShinkansenTrainIcon className="w-7 h-3.5 sm:w-8 sm:h-4 text-cheesie-surface shrink-0" />
      <span className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase">
        CHEESIE SHINKANSEN
      </span>
    </div>

    {/* Moving Transit Sign Announcements */}
    <div className="flex items-center gap-4 text-xs font-extrabold tracking-widest uppercase text-cheesie-surface/95">
      <span className="text-cheesie-gold text-xs sm:text-sm animate-pulse">✦</span>
      <span className="hover:text-cheesie-gold transition-colors">TACOS PHÁP NƯỚNG GIÒN</span>

      <span className="text-cheesie-surface/30">━━━</span>
      <span className="hover:text-cheesie-gold transition-colors">BURGER BÒ NƯỚNG TƯƠI</span>

      <span className="text-cheesie-gold text-xs sm:text-sm animate-pulse">✦</span>
      <span className="hover:text-cheesie-gold transition-colors">GÀ TENDER SỐT ĐẬM VỊ</span>

      <span className="text-cheesie-surface/30">━━━</span>
      <span className="hover:text-cheesie-gold transition-colors">MÌ Ý KEM TOMYUM</span>

      <span className="text-cheesie-gold text-xs sm:text-sm animate-pulse">✦</span>
      <span className="text-cheesie-surface/80">GA CẦN THƠ · PLATFORM 00</span>

      <span className="text-cheesie-surface/30">━━━━━━</span>
    </div>
  </div>
);

export const Ticker: React.FC = () => {
  return (
    <div
      className="ticker relative overflow-hidden bg-[#1A1E22] border-y-2 border-[#363D42] py-2.5 sm:py-3 select-none"
      aria-label="Băng chuyền thông tin trạm tàu Cheesie Shinkansen Express"
    >
      {/* Top illuminated railway track line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cheesie-burgundy via-cheesie-gold to-cheesie-burgundy opacity-85"
        aria-hidden="true"
      />

      {/* Continuously Animated Track */}
      <div className="ticker-track flex w-max items-center">
        <MarqueeUnit />
        <MarqueeUnit />
        <MarqueeUnit />
        <MarqueeUnit />
      </div>

      {/* Bottom illuminated railway track line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cheesie-burgundy via-cheesie-gold to-cheesie-burgundy opacity-85"
        aria-hidden="true"
      />
    </div>
  );
};
