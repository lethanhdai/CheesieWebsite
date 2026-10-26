export type TacosSizeKey = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type IngredientKind = 'protein' | 'sauce' | 'extra';

export interface TacosSizeConfig {
  price: number;
  protein: number;
  sauce: number;
  base: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  kind: IngredientKind;
  color: string;
  icon: string;
  price?: number;
  note?: string;
  sauceId?: string;
}

export type SelectedIngredients = Record<string, number>;

export type MenuItemCategory =
  | 'tacos'
  | 'burger'
  | 'chicken'
  | 'fries'
  | 'pasta'
  | 'combo'
  | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuItemCategory;
  image?: string;
  emoji?: string;
  tag?: string;
  desc: string;
  comboItems?: string[];
  options?: {
    portion?: string;
    sauceCount?: number;
    sauces?: string[];
  };
}

export interface RestaurantInfo {
  name: string;
  identity: string;
  language: string;
  currency: string;
  address: string;
  phoneDisplay: string;
  phone: string;
  email: string;
  openingHours: {
    from: string;
    to: string;
    timezone: string;
    note: string;
  };
  links: {
    facebook: string;
    shopeeFood: string;
    grabFood: string;
  };
  design: {
    red: string;
    silver: string;
    graphite: string;
    background: string;
    font: string;
    fontLocation: string;
    reference: string;
  };
  ordering: {
    mode: string;
    directOrderSubmission: boolean;
    automaticMarketplaceCartSync: boolean;
  };
}

export interface CartTacosSelection {
  size: TacosSizeKey;
  selected: SelectedIngredients;
  note: string;
  hasVegetables?: boolean;
}

export interface CartItem {
  id: string; // unique cart row id
  key: string; // signature for deduplication
  type: 'tacos' | 'menu-item';
  name: string;
  details: string;
  unitPrice: number;
  qty: number;
  tacosConfig?: CartTacosSelection;
  menuItemId?: string;
}
