import React from 'react';
import type { TacosSizeKey, SelectedIngredients } from '../types';
import { TACOS_SIZES, INGREDIENTS } from '../domain/tacos';

interface TortillaSvgProps {
  size: TacosSizeKey;
  selected: SelectedIngredients;
}

export function renderIngredientSvgPiece(icon: string, color: string): React.ReactElement {
  switch (icon) {
    case 'pork':
      return (
        <g>
          <path
            d="M12 25Q5 12 22 10L43 17Q57 30 39 43L17 44Q8 38 12 25"
            fill={color}
            stroke="#82462f"
            strokeWidth="2"
          />
          <path d="M15 24L40 30M18 16L42 22M18 35L33 38" stroke="#dfaa7d" strokeWidth="4" />
        </g>
      );
    case 'beef':
      return (
        <g>
          <path
            d="M7 21Q13 7 29 14Q48 3 52 24L45 43Q25 55 9 39Z"
            fill={color}
            stroke="#582b20"
            strokeWidth="2"
          />
          <path
            d="M14 23L42 19M16 31L43 28M19 39L39 35"
            stroke="#38251c"
            strokeWidth="3"
            opacity=".7"
          />
        </g>
      );
    case 'chicken':
      return (
        <g>
          <path
            d="M10 19L22 9L41 12L52 26L42 45L20 49L8 34Z"
            fill={color}
            stroke="#ae6a27"
            strokeWidth="2"
          />
          <path
            d="M17 19L24 17M31 23L40 21M15 32L22 29M30 38L39 35M42 29L46 26"
            stroke="#f0ba5d"
            strokeWidth="4"
          />
        </g>
      );
    case 'sausage':
      return (
        <g transform="rotate(-25 30 30)">
          <rect x="6" y="12" width="46" height="13" rx="6" fill={color} stroke="#833e2a" strokeWidth="2" />
          <rect x="11" y="33" width="46" height="13" rx="6" fill={color} stroke="#833e2a" strokeWidth="2" />
          <path
            d="M18 14L17 23M31 14L30 23M43 14L42 23M23 35L22 44M37 35L36 44"
            stroke="#dd9471"
            strokeWidth="2"
          />
        </g>
      );
    case 'sauce':
      return (
        <g>
          <ellipse cx="30" cy="33" rx="25" ry="22" fill="#f6efdd" stroke="#c8b49a" strokeWidth="2" />
          <ellipse cx="30" cy="29" rx="21" ry="17" fill={color} />
          <path
            d="M19 25Q29 18 38 25Q44 32 26 34"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            opacity=".35"
          />
        </g>
      );
    case 'bacon':
      return (
        <g>
          <path
            d="M8 10Q20 17 30 10L52 14L47 24Q32 17 24 24L5 19ZM10 31Q22 38 31 31L54 35L48 46Q32 39 25 46L6 42Z"
            fill={color}
          />
          <path d="M8 14L49 19M10 36L49 41" stroke="#efb195" strokeWidth="4" />
        </g>
      );
    case 'egg':
      return (
        <g>
          <path
            d="M29 6Q44 7 43 18Q58 20 53 36Q49 49 33 47Q15 56 9 41Q1 26 15 20Q12 7 29 6Z"
            fill="#fff9e8"
            stroke="#dfd1b2"
          />
          <circle cx="31" cy="29" r="12" fill="#efb52f" />
          <circle cx="27" cy="25" r="4" fill="#f9d56b" />
        </g>
      );
    default:
      // Cheese
      return (
        <g>
          <path d="M8 13L47 8L54 45L15 52Z" fill={color} stroke="#d4af6b" strokeWidth="2" />
          <circle cx="25" cy="24" r="4" fill="#d8a43e" opacity=".5" />
          <circle cx="40" cy="37" r="5" fill="#d8a43e" opacity=".5" />
        </g>
      );
  }
}

export function IngredientIconSvg({
  icon,
  color,
}: {
  icon: string;
  color: string;
}): React.ReactElement {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      {renderIngredientSvgPiece(icon, color)}
    </svg>
  );
}

export const TortillaSvg: React.FC<TortillaSvgProps> = ({ size, selected }) => {
  const sizeConfig = TACOS_SIZES[size];

  // Base layer pieces (Mozzarella, Trứng, Bacon có sẵn theo size)
  const baseElements: React.ReactElement[] = [];
  sizeConfig.base.forEach((name, n) => {
    const isMozz = name === 'Mozzarella';
    const isEgg = name === 'Trứng';
    const color = isMozz ? '#f4e5b6' : isEgg ? '#efb52f' : '#ac5840';
    const icon = isMozz ? 'cheese' : isEgg ? 'egg' : 'bacon';
    const pieceCount = isMozz ? 10 : 3;

    for (let k = 0; k < pieceCount; k++) {
      const a = k * 2.4 + n;
      const x = 250 + Math.cos(a) * ((k % 3) * 30 + 30);
      const y = 245 + Math.sin(a) * ((k % 3) * 30 + 30);
      baseElements.push(
        <g
          key={`base-${name}-${k}`}
          transform={`translate(${x - 22} ${y - 22}) rotate(${k * 37} 22 22) scale(.8)`}
        >
          {renderIngredientSvgPiece(icon, color)}
        </g>
      );
    }
  });

  // Food elements & Sauces
  const foodElements: React.ReactElement[] = [];
  const sauceElements: React.ReactElement[] = [];
  let foodItemIndex = 0;
  let sauceItemIndex = 0;

  // Harmonious, chef-crafted sauce drizzle curves focused over the central fillings
  const SAUCE_PATTERNS = [
    {
      d: 'M 180 195 C 220 178, 250 215, 280 205 C 315 195, 330 235, 295 260 C 260 285, 280 320, 320 315',
      gloss: 'M 182 194 C 221 177, 249 213, 279 203 C 313 194, 328 233, 294 258 C 261 283, 279 317, 318 313',
      dots: [
        { cx: 172, cy: 198, r: 2.8 },
        { cx: 326, cy: 318, r: 2.8 },
        { cx: 242, cy: 262, r: 3.2 },
      ],
    },
    {
      d: 'M 215 180 C 195 220, 235 250, 220 280 C 250 245, 290 275, 275 320 C 300 290, 320 260, 310 215',
      gloss: 'M 216 182 C 197 219, 234 248, 221 278 C 249 244, 288 273, 274 317 C 298 288, 317 259, 308 217',
      dots: [
        { cx: 210, cy: 172, r: 2.8 },
        { cx: 282, cy: 328, r: 3.2 },
        { cx: 318, cy: 210, r: 2.8 },
      ],
    },
    {
      d: 'M 190 235 C 225 210, 260 265, 295 235 C 320 218, 320 275, 280 290 C 245 305, 215 275, 195 255',
      gloss: 'M 191 234 C 224 209, 259 263, 294 234 C 318 217, 318 273, 279 288 C 246 303, 216 274, 196 254',
      dots: [
        { cx: 182, cy: 236, r: 2.8 },
        { cx: 304, cy: 230, r: 2.8 },
        { cx: 276, cy: 298, r: 3.2 },
      ],
    },
  ];

  for (const item of INGREDIENTS) {
    const amount = selected[item.id] || 0;
    if (amount <= 0) continue;

    for (let portion = 0; portion < amount; portion++) {
      if (item.kind === 'sauce' || item.sauceId) {
        const pattern = SAUCE_PATTERNS[sauceItemIndex % SAUCE_PATTERNS.length];
        const isMainSauce = item.kind === 'sauce';
        const strokeWidth = isMainSauce ? 6.5 : 5;

        sauceElements.push(
          <g key={`sauce-${item.id}-${portion}`} className="food-piece">
            {/* Base sauce ribbon */}
            <path
              d={pattern.d}
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.94"
            />
            {/* Specular gloss highlight along the ridge */}
            <path
              d={pattern.gloss}
              stroke="#FFFFFF"
              strokeWidth={isMainSauce ? 1.8 : 1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.4"
            />
            {/* Appetizing sauce droplets */}
            {pattern.dots.map((dot, dIdx) => (
              <g key={`dot-${dIdx}`}>
                <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill={item.color} opacity="0.94" />
                <circle cx={dot.cx - 0.7} cy={dot.cy - 0.7} r={dot.r * 0.45} fill="#FFFFFF" opacity="0.5" />
              </g>
            ))}
          </g>
        );
        sauceItemIndex++;
      } else {
        for (let k = 0; k < 5; k++) {
          const a = (foodItemIndex * 5 + k) * 2.39996;
          const r = Math.sqrt(((foodItemIndex * 5 + k) % 40) + 1) * 21;
          const x = 250 + Math.cos(a) * r;
          const y = 250 + Math.sin(a) * r;
          foodElements.push(
            <g
              key={`food-${item.id}-${portion}-${k}`}
              transform={`translate(${x - 25} ${y - 25}) rotate(${
                (foodItemIndex * 49 + k * 73) % 360
              } 25 25) scale(.85)`}
            >
              <g className="food-piece">{renderIngredientSvgPiece(item.icon, item.color)}</g>
            </g>
          );
        }
        foodItemIndex++;
      }
    }
  }

  return (
    <svg id="tortilla" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <radialGradient id="bread">
          <stop stopColor="#f6d897" />
          <stop offset=".75" stopColor="#efd093" />
          <stop offset="1" stopColor="#c99350" />
        </radialGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="9" stdDeviation="10" floodOpacity=".15" />
        </filter>
        <pattern id="grain" width="52" height="43" patternUnits="userSpaceOnUse">
          <ellipse cx="12" cy="14" rx="5" ry="3" fill="#af743a" opacity=".3" />
          <ellipse cx="38" cy="34" rx="8" ry="3.5" fill="#b37b3f" opacity=".22" />
          <circle cx="29" cy="9" r="1.4" fill="#a8733a" opacity=".3" />
        </pattern>
      </defs>

      {/* Tortilla Base Shape */}
      <path
        d="M248 29C358 23 463 109 468 242S374 474 250 471 29 390 30 251 123 34 248 29Z"
        fill="url(#bread)"
        filter="url(#shadow)"
      />
      <path
        d="M248 29C358 23 463 109 468 242S374 474 250 471 29 390 30 251 123 34 248 29Z"
        fill="url(#grain)"
      />

      {/* Render Layers */}
      <g id="base-layer">{baseElements}</g>
      <g id="food-layer">{foodElements}</g>
      <g id="sauce-layer">{sauceElements}</g>
    </svg>
  );
};
