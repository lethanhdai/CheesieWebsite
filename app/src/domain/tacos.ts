import type {
  TacosSizeKey,
  TacosSizeConfig,
  Ingredient,
  IngredientKind,
  SelectedIngredients,
} from '../types';
import { CONFIRMED_RULES, UNCONFIRMED_ASSUMPTIONS } from './rules';

export const TACOS_SIZES: Record<TacosSizeKey, TacosSizeConfig> = {
  S: {
    price: CONFIRMED_RULES.sizePrices.S,
    protein: CONFIRMED_RULES.sizePortions.S.protein,
    sauce: CONFIRMED_RULES.sizePortions.S.sauce,
    base: [...CONFIRMED_RULES.sizeBase.S],
  },
  M: {
    price: CONFIRMED_RULES.sizePrices.M,
    protein: CONFIRMED_RULES.sizePortions.M.protein,
    sauce: CONFIRMED_RULES.sizePortions.M.sauce,
    base: [...CONFIRMED_RULES.sizeBase.M],
  },
  L: {
    price: CONFIRMED_RULES.sizePrices.L,
    protein: CONFIRMED_RULES.sizePortions.L.protein,
    sauce: CONFIRMED_RULES.sizePortions.L.sauce,
    base: [...CONFIRMED_RULES.sizeBase.L],
  },
  XL: {
    price: CONFIRMED_RULES.sizePrices.XL,
    protein: CONFIRMED_RULES.sizePortions.XL.protein,
    sauce: CONFIRMED_RULES.sizePortions.XL.sauce,
    base: [...CONFIRMED_RULES.sizeBase.XL],
  },
  XXL: {
    price: CONFIRMED_RULES.sizePrices.XXL,
    protein: CONFIRMED_RULES.sizePortions.XXL.protein,
    sauce: CONFIRMED_RULES.sizePortions.XXL.sauce,
    base: [...CONFIRMED_RULES.sizeBase.XXL],
  },
};

export const INGREDIENTS: Ingredient[] = [
  // Proteins (Nhân)
  { id: 'pork', name: 'Heo', kind: 'protein', color: '#a45940', icon: 'pork' },
  { id: 'beef', name: 'Bò', kind: 'protein', color: '#71402b', icon: 'beef' },
  { id: 'chicken', name: 'Gà', kind: 'protein', color: '#c98531', icon: 'chicken' },
  { id: 'cheese-sausage', name: 'Xúc xích phô mai', kind: 'protein', color: '#bc5d3f', icon: 'sausage' },
  { id: 'sausage', name: 'Xúc xích ngon', kind: 'protein', color: '#b04b37', icon: 'sausage' },

  // Sauces (Sốt Tacos)
  { id: 'tacos-sauce', name: 'Sốt Tacos', kind: 'sauce', color: '#de7839', icon: 'sauce', note: 'Sốt đặc trưng của quán' },
  { id: 'bbq', name: 'BBQ', kind: 'sauce', color: '#9e3022', icon: 'sauce', note: 'Chua ngọt đậm đà' },
  { id: 'pesto', name: 'Pesto', kind: 'sauce', color: '#7f9b5b', icon: 'sauce', note: 'Ngọt nhẹ, béo từ hạt điều' },
  { id: 'andalouse', name: 'Andalouse', kind: 'sauce', color: '#d49b50', icon: 'sauce', note: 'Vị cay nhẹ, chua béo' },

  // Extras (Topping thêm & Sốt thêm)
  { id: 'extra-pork', name: 'Heo thêm', kind: 'extra', price: 15000, color: '#a45940', icon: 'pork' },
  { id: 'extra-beef', name: 'Bò thêm', kind: 'extra', price: 15000, color: '#71402b', icon: 'beef' },
  { id: 'extra-chicken', name: 'Gà thêm', kind: 'extra', price: 15000, color: '#c98531', icon: 'chicken' },
  { id: 'bacon', name: 'Bacon', kind: 'extra', price: 15000, color: '#a34d38', icon: 'bacon' },
  { id: 'mozzarella', name: 'Mozzarella', kind: 'extra', price: 15000, color: '#f2e4bd', icon: 'cheese' },
  { id: 'cheddar', name: 'Cheddar', kind: 'extra', price: 10000, color: '#efb23d', icon: 'cheese' },
  { id: 'egg', name: 'Trứng', kind: 'extra', price: 5000, color: '#edb932', icon: 'egg' },
  { id: 'extra-tacos-sauce', name: 'Sốt Tacos thêm', kind: 'extra', price: 5000, color: '#de7839', icon: 'sauce', sauceId: 'tacos-sauce' },
  { id: 'extra-bbq', name: 'BBQ thêm', kind: 'extra', price: 5000, color: '#9e3022', icon: 'sauce', sauceId: 'bbq' },
  { id: 'extra-pesto', name: 'Pesto thêm', kind: 'extra', price: 5000, color: '#7f9b5b', icon: 'sauce', sauceId: 'pesto' },
  { id: 'extra-andalouse', name: 'Andalouse thêm', kind: 'extra', price: 5000, color: '#d49b50', icon: 'sauce', sauceId: 'andalouse' },
];

export const INGREDIENT_MAP: Map<string, Ingredient> = new Map(
  INGREDIENTS.map((i) => [i.id, i])
);

export function getIngredient(id: string): Ingredient | undefined {
  return INGREDIENT_MAP.get(id);
}

export function isValidSize(size: string): size is TacosSizeKey {
  return size in TACOS_SIZES;
}

export function countIngredientKind(
  selected: SelectedIngredients,
  kind: IngredientKind
): number {
  let count = 0;
  for (const [id, qty] of Object.entries(selected)) {
    if (qty > 0) {
      const ing = getIngredient(id);
      if (ing && ing.kind === kind) {
        count += qty;
      }
    }
  }
  return count;
}

export function validateSelectedCounts(selected: unknown): selected is SelectedIngredients {
  if (!selected || typeof selected !== 'object' || Array.isArray(selected)) {
    return false;
  }
  for (const [id, count] of Object.entries(selected as Record<string, unknown>)) {
    if (!INGREDIENT_MAP.has(id)) return false;
    if (typeof count !== 'number' || !Number.isInteger(count) || count < 0 || count > 20) {
      return false;
    }
  }
  return true;
}

export function canAddIngredient(
  size: TacosSizeKey,
  selected: SelectedIngredients,
  id: string
): boolean {
  const item = getIngredient(id);
  const sizeConfig = TACOS_SIZES[size];
  if (!item || !sizeConfig || !validateSelectedCounts(selected)) {
    return false;
  }

  const currentCount = selected[id] || 0;

  // Với sốt thêm: không cho chọn vị sốt trùng với sốt chính và phải chọn đủ sốt theo size
  if (item.sauceId) {
    if (
      UNCONFIRMED_ASSUMPTIONS.uniqueFlavorForExtraSauce &&
      (selected[item.sauceId] || 0) > 0
    ) {
      return false;
    }
    if (
      UNCONFIRMED_ASSUMPTIONS.extraSauceRequiresIncludedSaucesComplete &&
      countIngredientKind(selected, 'sauce') !== sizeConfig.sauce
    ) {
      return false;
    }
  }

  // Với sốt chính: nếu đã chọn phiên bản sốt thêm của nó thì không chọn trùng
  if (item.kind === 'sauce' && (selected['extra-' + item.id] || 0) > 0) {
    return false;
  }

  // Topping thêm
  if (item.kind === 'extra') {
    return currentCount < UNCONFIRMED_ASSUMPTIONS.maxPerExtraOption;
  }

  // Nhân hoặc sốt theo size: chỉ được chọn tối đa 1 lần mỗi loại (không chọn lặp)
  if (currentCount >= 1) {
    return false;
  }

  // Kiểm tra hạn mức size
  const currentKindCount = countIngredientKind(selected, item.kind);
  return currentKindCount < sizeConfig[item.kind];
}

export function isTacosReady(
  size: TacosSizeKey,
  selected: SelectedIngredients
): boolean {
  const sizeConfig = TACOS_SIZES[size];
  if (!sizeConfig || !validateSelectedCounts(selected)) {
    return false;
  }

  // Phải đúng và đủ số phần nhân & sốt theo size
  if (countIngredientKind(selected, 'protein') !== sizeConfig.protein) {
    return false;
  }
  if (countIngredientKind(selected, 'sauce') !== sizeConfig.sauce) {
    return false;
  }

  // Mỗi loại nhân/sốt chính chỉ được chọn tối đa 1 phần
  for (const item of INGREDIENTS) {
    if (item.kind !== 'extra' && (selected[item.id] || 0) > 1) {
      return false;
    }
  }

  return true;
}

export function doesSelectionFitSize(
  size: TacosSizeKey,
  selected: SelectedIngredients
): boolean {
  const sizeConfig = TACOS_SIZES[size];
  if (!sizeConfig || !validateSelectedCounts(selected)) {
    return false;
  }
  return (
    countIngredientKind(selected, 'protein') <= sizeConfig.protein &&
    countIngredientKind(selected, 'sauce') <= sizeConfig.sauce
  );
}

export function computeTacosPrice(
  size: TacosSizeKey,
  selected: SelectedIngredients
): number {
  const sizeConfig = TACOS_SIZES[size];
  if (!sizeConfig || !validateSelectedCounts(selected)) {
    throw new Error('Dữ liệu công thức tacos không hợp lệ để tính giá.');
  }

  let total = sizeConfig.price;
  for (const item of INGREDIENTS) {
    if (item.kind === 'extra' && item.price) {
      const qty = selected[item.id] || 0;
      total += qty * item.price;
    }
  }

  return Math.round(total);
}

export function formatSelectedNames(
  selected: SelectedIngredients,
  kind: IngredientKind
): string {
  const matched = INGREDIENTS.filter(
    (i) => i.kind === kind && (selected[i.id] || 0) > 0
  );
  return matched
    .map((i) => {
      const count = selected[i.id];
      return count > 1 ? `${count} × ${i.name}` : i.name;
    })
    .join(', ');
}

export function buildTacosDetailsSummary(
  size: TacosSizeKey,
  selected: SelectedIngredients,
  note?: string
): string {
  const sizeConfig = TACOS_SIZES[size];
  const proteinText = formatSelectedNames(selected, 'protein') || 'Chưa chọn';
  const sauceText = formatSelectedNames(selected, 'sauce') || 'Chưa chọn';
  const extraText = formatSelectedNames(selected, 'extra');

  let text = `Nhân: ${proteinText}. Sốt: ${sauceText}.`;
  if (sizeConfig.base.length > 0) {
    text += ` Đã gồm: ${sizeConfig.base.join(', ')}.`;
  }
  if (extraText) {
    text += ` Thêm: ${extraText}.`;
  }
  if (note && note.trim()) {
    text += ` Ghi chú: ${note.trim()}`;
  }
  return text;
}

export function generateTacosDeduplicationKey(
  size: TacosSizeKey,
  selected: SelectedIngredients,
  note: string = ''
): string {
  const sortedEntries = Object.entries(selected)
    .filter(([, v]) => v > 0)
    .sort(([a], [b]) => a.localeCompare(b));
  return `taco-${size}-${JSON.stringify(sortedEntries)}-${note.trim().toLowerCase()}`;
}
