import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-cheesie-ivory via-cheesie-ivory-warm to-cheesie-surface pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-cheesie-line"
      id="home"
    >
      {/* Subtle Background Metro Gridlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 [background-image:linear-gradient(to_right,#D8D2C7_1px,transparent_1px),linear-gradient(to_bottom,#D8D2C7_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Two-Column Editorial Row: ~44% Text vs ~56% Prominent Landscape Image */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-14">
          {/* Left Column: ~44% Editorial Copy & CTA */}
          <div className="w-full lg:w-[44%] flex flex-col justify-center reveal-on-scroll">
            {/* Editorial Eyebrow Label */}
            <div className="mb-3.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cheesie-burgundy shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold tracking-widest text-cheesie-burgundy uppercase">
                GA CHEESIE / TRẠM ĐỒ NGON
              </span>
            </div>

            {/* Main Vietnamese Headline */}
            <h1 className="font-extrabold text-cheesie-graphite tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.08] mb-5">
              Đói rồi?
              <br />
              <span className="text-cheesie-burgundy italic font-black">Cuốn</span> thôi.
            </h1>

            {/* Supporting Description */}
            <p className="text-cheesie-muted text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              Tacos đầy nhân, burger đậm vị, gà giòn rụm. Thích món nào cứ chọn, còn chiếc tacos đúng gu thì bạn tự tay quyết định.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Button
                variant="station"
                size="lg"
                asChild
                className="h-12 px-6 sm:px-8 text-xs sm:text-sm font-bold shadow-station-md hover:shadow-station-hover active:scale-98 transition-all"
              >
                <a href="#builder" className="flex items-center gap-2">
                  <span>Tự cuốn tacos của bạn</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="quiet-link h-12 px-5 sm:px-6 text-xs sm:text-sm font-semibold bg-cheesie-surface hover:bg-cheesie-surface-muted text-cheesie-graphite border-cheesie-line hover:border-cheesie-burgundy/40 active:scale-98 transition-all"
              >
                <a href="#menu" className="flex items-center gap-2">
                  <span>Khám phá menu</span>
                  <ArrowDown className="w-3.5 h-3.5 text-cheesie-burgundy" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: ~56% Prominent Landscape Image in Refined Railway Window */}
          <div className="w-full lg:w-[56%] flex justify-center reveal-on-scroll reveal-stagger-2">
            <div className="relative w-full rounded-2xl lg:rounded-3xl p-2 sm:p-2.5 bg-cheesie-surface border border-cheesie-line/80 shadow-station-md">
              {/* Refined Station Wayfinding Plaque */}
              <div className="relative w-full h-8 sm:h-9 rounded-t-xl lg:rounded-t-2xl bg-cheesie-burgundy text-cheesie-surface flex items-center justify-between px-3.5 sm:px-4 text-[10px] font-bold tracking-widest mb-2 shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-cheesie-surface text-[9px] px-1.5 py-0.5 rounded font-black">
                    01
                  </span>
                  <span className="tracking-wider">CHEESIE STATION</span>
                </div>
                <span className="text-[9px] font-medium tracking-wider text-cheesie-surface/80 hidden sm:inline">
                  TOA ĐỒ NGON
                </span>
                <span className="text-cheesie-gold text-xs font-bold">↗</span>
              </div>

              {/* Prominent Landscape Image Window (aspect 16:10 / 3:2) */}
              <div className="relative w-full aspect-[3/2] sm:aspect-[16/10] overflow-hidden rounded-xl lg:rounded-2xl border border-cheesie-line/50">
                <img
                  className="w-full h-full object-cover object-[center_55%] transition-transform duration-700 hover:scale-105"
                  src="/assets/feast.jpg"
                  alt="Tacos, burger, gà tender, mì Ý và khoai tây của Cheesie"
                  fetchPriority="high"
                  loading="eager"
                  width="464"
                  height="310"
                />

                {/* Subtle vignette gradient for food presentation */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-cheesie-graphite/60 via-transparent to-cheesie-graphite/15 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Wayfinding caption overlay */}
                <div className="absolute top-3 left-3.5 sm:top-4 sm:left-4 text-left text-white drop-shadow-md z-10 pointer-events-none">
                  <span className="inline-block text-[9px] font-extrabold tracking-widest text-cheesie-gold bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs mb-1">
                    TOA ĐỒ NGON
                  </span>
                  <p className="text-[11px] sm:text-xs font-bold tracking-wide text-cheesie-surface/95 uppercase">
                    French Tacos & Burgers
                  </p>
                </div>

                {/* Authentic photo credit tag */}
                <span className="absolute bottom-2.5 left-3.5 sm:bottom-3 sm:left-4 text-[9px] text-white/80 font-medium tracking-wider drop-shadow-sm">
                  ẢNH TỪ MENU NHÀ CHEESIE
                </span>
              </div>

              {/* Station Guarantee Seal Stamp */}
              <div
                className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-cheesie-surface border-2 border-cheesie-burgundy text-cheesie-burgundy shadow-station-hover flex flex-col items-center justify-center p-1.5 text-center rotate-6 z-20 pointer-events-none"
                aria-hidden="true"
              >
                <span className="text-[7px] font-bold tracking-widest text-cheesie-muted uppercase">
                  CẦN THƠ
                </span>
                <strong className="text-sm sm:text-base font-black leading-none text-cheesie-burgundy my-0.5">
                  100%
                </strong>
                <span className="text-[7px] font-extrabold tracking-wider text-cheesie-burgundy uppercase">
                  TƯƠI MỖI NGÀY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Railway Timeline Guide — Editorial station track positioned cleanly below the Hero row */}
        <div
          className="mt-10 lg:mt-14 pt-6 sm:pt-8 border-t border-cheesie-line/70 relative reveal-on-scroll reveal-stagger-3"
          aria-label="3 bước tự cuốn tacos"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cheesie-burgundy shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold text-cheesie-graphite tracking-wide uppercase">
                3 bước tự cuốn Tacos theo ý bạn
              </span>
            </div>
            <span className="text-[11px] text-cheesie-muted hidden sm:inline-block">
              Đơn giản · Nhanh gọn · Chuẩn vị
            </span>
          </div>

          {/* Lighter editorial inline station-route treatment with step numbers and subtle dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cheesie-line/60 bg-cheesie-surface/60 rounded-xl border border-cheesie-line/60">
            {/* Step 1 */}
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 group">
              <span className="w-8 h-8 rounded-full bg-cheesie-burgundy text-cheesie-surface font-black text-xs flex items-center justify-center shrink-0 shadow-station-sm transition-transform group-hover:scale-105">
                01
              </span>
              <div>
                <strong className="block text-xs font-bold text-cheesie-graphite tracking-wider uppercase">
                  CHỌN SIZE
                </strong>
                <span className="text-[11px] text-cheesie-muted block mt-0.5">
                  Từ S đến XXL tùy sức ăn
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 group">
              <span className="w-8 h-8 rounded-full bg-cheesie-burgundy text-cheesie-surface font-black text-xs flex items-center justify-center shrink-0 shadow-station-sm transition-transform group-hover:scale-105">
                02
              </span>
              <div>
                <strong className="block text-xs font-bold text-cheesie-graphite tracking-wider uppercase">
                  THẢ NHÂN
                </strong>
                <span className="text-[11px] text-cheesie-muted block mt-0.5">
                  Bò băm, gà giòn, xúc xích...
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 group">
              <span className="w-8 h-8 rounded-full bg-cheesie-burgundy text-cheesie-surface font-black text-xs flex items-center justify-center shrink-0 shadow-station-sm transition-transform group-hover:scale-105">
                03
              </span>
              <div>
                <strong className="block text-xs font-bold text-cheesie-graphite tracking-wider uppercase">
                  THÊM SỐT
                </strong>
                <span className="text-[11px] text-cheesie-muted block mt-0.5">
                  Cheese sauce, BBQ, cay nhẹ...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
