import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Hero: React.FC = () => {
  return (
    <section
      className="hero relative overflow-hidden bg-gradient-to-b from-cheesie-ivory via-cheesie-ivory-warm to-cheesie-ivory-dark pt-10 sm:pt-14 pb-12 sm:pb-20 border-b border-cheesie-line"
      id="home"
    >
      {/* Subtle Background Metro Gridlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 [background-image:linear-gradient(to_right,#D8D2C7_1px,transparent_1px),linear-gradient(to_bottom,#D8D2C7_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="max-w-layout mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="hero-copy lg:col-span-7 flex flex-col justify-center">
            {/* Station Eyebrow Tag */}
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="tag" className="px-3 py-1 text-[11px] gap-2 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cheesie-burgundy" aria-hidden="true" />
                <span>GA CHEESIE / TRẠM ĐỒ NGON</span>
              </Badge>
              <span className="hidden sm:inline-block text-[11px] text-cheesie-muted font-medium tracking-wide">
                CAN THO · PLATFORM 00
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-extrabold text-cheesie-graphite tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08] mb-5">
              Đói rồi?
              <br />
              <span className="text-cheesie-burgundy italic font-black">Cuốn</span> thôi.
            </h1>

            {/* Supporting Description */}
            <p className="text-cheesie-muted text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              Tacos đầy nhân, burger đẫm vị, gà giòn rụm. Ghé Cheesie chọn một món ngon —
              hay tự tay tạo chiếc tacos đúng gu của riêng bạn ngay trên chuyến tàu vị giác.
            </p>

            {/* Action Buttons */}
            <div className="hero-buttons flex flex-wrap items-center gap-4 mb-10">
              <Button
                variant="station"
                size="lg"
                asChild
                className="h-13 px-6 sm:px-8 text-sm font-bold shadow-station-md hover:shadow-station-hover"
              >
                <a href="#builder" className="flex items-center gap-2.5">
                  <span>Tự cuốn tacos của bạn</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="quiet-link h-13 px-6 text-xs sm:text-sm font-semibold bg-cheesie-surface/80 hover:bg-cheesie-surface text-cheesie-graphite border-cheesie-line hover:border-cheesie-burgundy/40"
              >
                <a href="#menu" className="flex items-center gap-2">
                  <span>Khám phá menu</span>
                  <ArrowDown className="w-3.5 h-3.5 text-cheesie-burgundy" />
                </a>
              </Button>
            </div>

            {/* 3-Step Railway Timeline Guide */}
            <div
              className="hero-foot relative pt-5 border-t border-cheesie-line/80 flex items-center justify-between max-w-lg text-[10px] sm:text-xs font-bold text-cheesie-graphite tracking-wide"
              aria-label="3 bước tự cuốn tacos"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cheesie-surface border border-cheesie-burgundy text-cheesie-burgundy flex items-center justify-center font-bold text-[10px] shadow-station-sm">
                  01
                </span>
                <span className="tracking-wider">CHỌN SIZE</span>
              </div>
              <div className="flex-1 mx-3 h-px bg-dashed border-t border-dashed border-cheesie-line" />
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cheesie-surface border border-cheesie-burgundy text-cheesie-burgundy flex items-center justify-center font-bold text-[10px] shadow-station-sm">
                  02
                </span>
                <span className="tracking-wider">THẢ NHÂN</span>
              </div>
              <div className="flex-1 mx-3 h-px bg-dashed border-t border-dashed border-cheesie-line" />
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cheesie-surface border border-cheesie-burgundy text-cheesie-burgundy flex items-center justify-center font-bold text-[10px] shadow-station-sm">
                  03
                </span>
                <span className="tracking-wider">THÊM SỐT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Carriage Window Frame & Visual */}
          <div className="hero-art lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-[48px_48px_16px_16px] p-3 sm:p-3.5 bg-gradient-to-b from-cheesie-surface to-cheesie-surface-muted border-2 border-cheesie-line shadow-station-md">
              {/* Carriage Wayfinding Header Plaque */}
              <div className="carriage-sign absolute top-3 sm:top-3.5 left-3 sm:left-3.5 right-3 sm:right-3.5 h-10 rounded-[36px_36px_0_0] bg-cheesie-burgundy text-cheesie-surface flex items-center justify-between px-5 text-[10px] font-bold tracking-widest z-20 shadow-inner">
                <span className="bg-white/20 text-cheesie-surface text-[9px] px-2 py-0.5 rounded font-black">
                  01
                </span>
                <span className="text-center tracking-wider">
                  CHEESIE STATION
                </span>
                <span className="text-cheesie-gold text-xs">↗</span>
              </div>

              {/* Window Image Container */}
              <div className="relative w-full h-full overflow-hidden rounded-[36px_36px_8px_8px] border border-cheesie-line">
                <img
                  className="feast w-full h-full object-cover object-[center_55%] transition-transform duration-700 hover:scale-105"
                  src="/assets/feast.jpg"
                  alt="Tacos, burger, gà tender, mì Ý và khoai tây của Cheesie"
                />

                {/* Subtle vignette gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-cheesie-graphite/70 via-transparent to-cheesie-graphite/20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Station Wayfinding Caption */}
                <div className="hero-caption absolute top-14 left-5 text-left text-white drop-shadow-md z-10 pointer-events-none">
                  <span className="inline-block text-[9px] font-extrabold tracking-widest text-cheesie-gold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs mb-1">
                    TOA ĐỒ NGON
                  </span>
                  <p className="text-[11px] font-bold tracking-wide text-cheesie-surface/95 uppercase">
                    French Tacos & Burgers
                  </p>
                </div>

                {/* Photo credit tag */}
                <span className="photo-credit absolute bottom-3 left-4 text-[9px] text-white/70 font-medium tracking-wider drop-shadow-sm">
                  ẢNH TỪ MENU NHÀ CHEESIE
                </span>
              </div>

              {/* Station Guarantee Seal Stamp */}
              <div
                className="stamp absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-cheesie-surface border-2 border-cheesie-burgundy text-cheesie-burgundy shadow-station-hover flex flex-col items-center justify-center p-2 text-center rotate-12 z-30 pointer-events-none"
                aria-hidden="true"
              >
                <span className="text-[8px] font-bold tracking-widest text-cheesie-muted">
                  CUỐN THEO
                </span>
                <strong className="text-xs sm:text-sm font-black tracking-tight text-cheesie-burgundy leading-tight">
                  GU BẠN
                </strong>
                <span className="text-[8px] font-bold text-cheesie-gold tracking-widest mt-0.5">
                  ★ CHEESIE ★
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Repositioned Low-Opacity Architectural Watermark */}
        <div
          className="hero-bottom-mark mt-8 pt-4 border-t border-cheesie-line/40 text-center font-black text-4xl sm:text-6xl lg:text-7xl text-cheesie-line/40 tracking-[0.2em] select-none uppercase pointer-events-none"
          aria-hidden="true"
        >
          CHEESIE STATION
        </div>
      </div>
    </section>
  );
};
