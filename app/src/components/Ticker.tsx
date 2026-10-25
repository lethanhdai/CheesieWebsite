import React from 'react';

/**
 * Fast Train SVG icon directly derived from the user-supplied asset fast-train-svgrepo-com.svg.
 * viewBox is tightly cropped around the train body (0 135 464.638 185) to eliminate excessive
 * vertical margins, and horizontally flipped so the aerodynamic nose leads forward in the
 * direction of marquee travel (leftward).
 */
export const FastTrainIcon: React.FC<{ className?: string }> = ({
  className = 'w-8 h-4',
}) => (
  <svg
    viewBox="0 135 464.638 185"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ transform: 'scaleX(-1)' }}
  >
    <g>
      <path d="M438.252,204.023l-45.113-36.719c-14.918-13.038-37.71-26.93-57.079-26.93H32.033c-17.645,0-32,14.355-32,32V257.8
        l-0.03,1.294C0.001,259.157,0,259.22,0,259.283c0,19.553,13.887,35.921,32.315,39.768c3.262,14.415,16.166,25.214,31.553,25.214
        c9.704,0,18.417-4.302,24.352-11.091c5.936,6.79,14.651,11.091,24.357,11.091c15.078,0,27.778-10.371,31.348-24.356h154.087
        c3.571,13.984,16.274,24.356,31.354,24.356c9.704,0,18.417-4.302,24.351-11.091c5.936,6.79,14.651,11.091,24.357,11.091
        c15.078,0,27.778-10.371,31.348-24.356h15.367c0.245,0,0.488-0.011,0.728-0.033c21.384-0.834,38.558-18.348,38.846-39.865
        C464.962,254.981,466.992,226.083,438.252,204.023z M393.767,188.445l28.687,23.349H354.42c-0.527-0.109-1.073-0.167-1.633-0.167
        c-4.501,0-8.162-3.661-8.162-8.162v-15.021H393.767z M63.868,308.265c-6.113,0-11.445-3.376-14.252-8.356h28.498
        C75.307,304.889,69.978,308.265,63.868,308.265z M112.576,308.265c-6.113,0-11.445-3.376-14.252-8.356h28.498
        C124.016,304.889,118.686,308.265,112.576,308.265z M329.366,308.265c-6.113,0-11.445-3.376-14.252-8.356h28.498
        C340.805,304.889,335.476,308.265,329.366,308.265z M378.074,308.265c-6.113,0-11.445-3.376-14.252-8.356h28.498
        C389.513,304.889,384.184,308.265,378.074,308.265z M448.467,258.189c-0.067,0.42-0.102,0.844-0.102,1.27
        c0,13.481-10.968,24.448-24.448,24.448c-0.052,0-0.104,0-0.154,0.001h-21.31c-0.01,0-0.019-0.001-0.029-0.001
        s-0.019,0.001-0.029,0.001h-48.65c-0.01,0-0.019-0.001-0.029-0.001s-0.019,0.001-0.029,0.001h-48.65
        c-0.01,0-0.019-0.001-0.029-0.001s-0.019,0.001-0.029,0.001H136.956c-0.01,0-0.019-0.001-0.029-0.001s-0.019,0.001-0.029,0.001
        H88.247c-0.01,0-0.019-0.001-0.029-0.001s-0.019,0.001-0.029,0.001H40.626c-13.55,0-24.579-11-24.626-24.539l0.031-1.288
        c0.001-0.063,0.002-0.126,0.002-0.188v-85.52c0-8.823,7.178-16,16-16H336.06c11.151,0,25.749,7.311,37.852,16.071h-37.286
        c-4.418,0-8,3.582-8,8v23.021c0,12.656,9.781,23.071,22.182,24.082c0.633,0.161,1.297,0.247,1.98,0.247h86.702
        C450.515,242.738,448.573,257.464,448.467,258.189z"/>
      <path d="M304.542,172.445H40.208c-4.418,0-8,3.582-8,8v23.448c0,13.323,10.839,24.162,24.162,24.162h232.01
        c13.322,0,24.161-10.839,24.161-24.162v-23.448C312.542,176.026,308.959,172.445,304.542,172.445z M296.542,203.893
        c0,4.5-3.661,8.162-8.161,8.162H56.371c-4.5,0-8.162-3.661-8.162-8.162v-15.448h248.333V203.893z"/>
    </g>
  </svg>
);

/**
 * Standard marquee message unit:
 * [TRAIN SVG] — Tacos Pháp Nướng Giòn — Burger Bò Tươi Ngon — Gà Tender Giòn Tan — Mì Ý Kem TomYum
 */
const MarqueeUnit: React.FC = () => (
  <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0 px-4 sm:px-6 select-none font-medium text-xs sm:text-sm tracking-wide text-cheesie-surface/95">
    {/* Leading Fast Train SVG Icon */}
    <span className="inline-flex items-center text-cheesie-gold shrink-0 drop-shadow-[0_0_6px_rgba(212,175,55,0.45)]">
      <FastTrainIcon className="w-8 h-4 sm:w-9 sm:h-4.5 md:w-10 md:h-5 text-cheesie-gold shrink-0" />
    </span>

    <span className="text-cheesie-gold/60 font-serif select-none">—</span>
    <span className="hover:text-cheesie-gold transition-colors">Tacos Pháp Nướng Giòn</span>

    <span className="text-cheesie-gold/60 font-serif select-none">—</span>
    <span className="hover:text-cheesie-gold transition-colors">Burger Bò Tươi Ngon</span>

    <span className="text-cheesie-gold/60 font-serif select-none">—</span>
    <span className="hover:text-cheesie-gold transition-colors">Gà Tender Giòn Tan</span>

    <span className="text-cheesie-gold/60 font-serif select-none">—</span>
    <span className="hover:text-cheesie-gold transition-colors">Mì Ý Kem TomYum</span>

    <span className="text-cheesie-gold/60 font-serif select-none">—</span>
  </div>
);

export const Ticker: React.FC = () => {
  return (
    <div
      className="ticker relative overflow-hidden bg-[#181B1E] border-y border-[#3A2225] py-2.5 sm:py-3 select-none"
      aria-label="Cheesie Station Railway Marquee"
    >
      {/* Top railway illuminated track highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cheesie-burgundy via-cheesie-gold/70 to-cheesie-burgundy opacity-80"
        aria-hidden="true"
      />

      {/* Continuously Animated Seamless Track */}
      <div className="ticker-track flex w-max items-center">
        {/* First Half */}
        <div className="flex items-center shrink-0">
          <MarqueeUnit />
          <MarqueeUnit />
        </div>
        {/* Second Half (Exact clone for seamless loop transition) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          <MarqueeUnit />
          <MarqueeUnit />
        </div>
      </div>

      {/* Bottom railway illuminated track highlight */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cheesie-burgundy via-cheesie-gold/70 to-cheesie-burgundy opacity-80"
        aria-hidden="true"
      />
    </div>
  );
};
