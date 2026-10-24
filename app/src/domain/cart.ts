import type { CartItem, MenuItem } from '../types';
import {
  computeTacosPrice,
  isTacosReady,
  isValidSize,
  validateSelectedCounts,
} from './tacos';
import menuData from '../data/menu.json';

export const CART_STORAGE_KEY = 'cheesie-cart-v2';

export const MENU_ITEMS: MenuItem[] = menuData.items as MenuItem[];
export const MENU_ITEM_MAP: Map<string, MenuItem> = new Map(
  MENU_ITEMS.map((item) => [item.id, item])
);

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + 'đ';
}

export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}

export function countTotalCartItems(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Xác thực và đối chiếu một bản ghi giỏ hàng để tránh dữ liệu hỏng hoặc bị giả mạo giá.
 * Nếu hợp lệ, trả về CartItem với đơn giá ĐƯỢC TÍNH LẠI CHÍNH XÁC từ nguồn dữ liệu.
 */
export function sanitizeAndVerifyCartItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== 'object') return null;

  const item = raw as Partial<CartItem>;
  if (
    typeof item.name !== 'string' ||
    typeof item.details !== 'string' ||
    typeof item.key !== 'string' ||
    typeof item.qty !== 'number' ||
    !Number.isInteger(item.qty) ||
    item.qty <= 0
  ) {
    return null;
  }

  // Giới hạn số lượng an toàn
  const qty = Math.min(Math.max(1, item.qty), 99);
  const id = typeof item.id === 'string' && item.id.trim() ? item.id : Math.random().toString(36).slice(2, 9);

  // Món Tacos tự chọn
  if (item.type === 'tacos' && item.tacosConfig) {
    const { size, selected, note } = item.tacosConfig;
    if (
      !isValidSize(size) ||
      !validateSelectedCounts(selected) ||
      !isTacosReady(size, selected)
    ) {
      return null;
    }

    // Luôn tính lại giá theo công thức domain hiện tại, không tin giá lưu client
    const verifiedUnitPrice = computeTacosPrice(size, selected);

    return {
      id,
      key: item.key,
      type: 'tacos',
      name: `Tacos Pháp · size ${size}`,
      details: item.details,
      unitPrice: verifiedUnitPrice,
      qty,
      tacosConfig: {
        size,
        selected,
        note: typeof note === 'string' ? note.slice(0, 200) : '',
      },
    };
  }

  // Món từ menu có sẵn
  if (item.type === 'menu-item' && item.menuItemId) {
    const menuItem = MENU_ITEM_MAP.get(item.menuItemId);
    if (!menuItem) {
      return null; // Món đã ngừng bán hoặc không tồn tại trong menu
    }

    return {
      id,
      key: item.key,
      type: 'menu-item',
      name: menuItem.name,
      details: item.details.slice(0, 200),
      unitPrice: menuItem.price, // Dùng giá niêm yết hiện tại
      qty,
      menuItemId: menuItem.id,
    };
  }

  return null;
}

/**
 * Tải và làm sạch toàn bộ giỏ hàng từ localStorage.
 */
export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const validItems: CartItem[] = [];
    for (const entry of parsed) {
      const sanitized = sanitizeAndVerifyCartItem(entry);
      if (sanitized) {
        validItems.push(sanitized);
      }
    }
    return validItems.slice(0, 50);
  } catch {
    return [];
  }
}

/**
 * Lưu giỏ hàng an toàn vào localStorage.
 */
export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    const sanitizedCart = cart
      .map(sanitizeAndVerifyCartItem)
      .filter((item): item is CartItem => item !== null)
      .slice(0, 50);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(sanitizedCart));
  } catch (e) {
    console.error('Không thể lưu giỏ hàng vào storage', e);
  }
}

/**
 * Tạo nội dung đơn hàng chuyên nghiệp để gửi cho quán.
 */
export function buildOrderText(cart: CartItem[]): string {
  if (cart.length === 0) {
    return 'Giỏ hàng đang trống.';
  }

  const itemsText = cart
    .map((item, index) => {
      const lineTotal = formatVND(item.unitPrice * item.qty);
      let line = `${index + 1}. ${item.qty} × ${item.name} — ${lineTotal}`;
      if (item.details) {
        line += `\n   ${item.details}`;
      }
      return line;
    })
    .join('\n');

  const totalText = formatVND(calculateCartTotal(cart));

  return [
    'Chào Cheesie, mình muốn đặt:',
    itemsText,
    '',
    `Tạm tính: ${totalText}`,
    'Chưa gồm phí giao hàng. Nhờ quán xác nhận món, giá và thời gian giúp mình nhé.',
  ].join('\n');
}
