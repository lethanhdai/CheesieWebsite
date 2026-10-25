import React from 'react';

export const Topline: React.FC = () => {
  return (
    <div
      className="topline bg-cheesie-burgundy text-cheesie-surface/95 text-[10px] font-medium tracking-wider border-b border-cheesie-burgundy-light/20 select-none"
      role="region"
      aria-label="Thông tin tuyến và trạm Cheesie"
    >
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center bg-white/15 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest text-cheesie-surface">
            LINE 01
          </span>
          <span className="font-semibold tracking-wide">
            CHEESIE STATION / TUYẾN ĐỒ NGON
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] text-cheesie-surface/85">
          <span className="hidden md:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>09:30–22:30</span>
          </span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="tracking-wide">
            102 LÊ LAI, NINH KIỀU, CẦN THƠ
          </span>
        </div>
      </div>
    </div>
  );
};
