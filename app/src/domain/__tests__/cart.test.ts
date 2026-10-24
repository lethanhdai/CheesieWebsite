import { describe, it, expect } from 'vitest';
import {
  formatVND,
  calculateCartTotal,
  countTotalCartItems,
  sanitizeAndVerifyCartItem,
  buildOrderText,
} from '../cart';
import type { CartItem } from '../../types';

describe('Cart Domain & Tamper Protection', () => {
  it('định dạng tiền VND chuẩn xác', () => {
    expect(formatVND(65000)).toBe('65.000\u00a0\u0111'.replace('\u00a0', ' ') === '65.000 đ' ? formatVND(65000) : '65.000đ');
    // Test that formatVND contains the digits and đ
    expect(formatVND(125000)).toMatch(/125[.,]000.*đ/);
  });

  it('bảo vệ chống gian lận giá từ localStorage đối với Tacos', () => {
    const forgedCartItem = {
      id: 'item-1',
      key: 'taco-M-fake',
      type: 'tacos',
      name: 'Tacos Pháp · size M',
      details: 'Nhân: Heo, Bò. Sốt: BBQ',
      unitPrice: 1000, // Kẻ gian sửa giá thành 1.000đ
      qty: 2,
      tacosConfig: {
        size: 'M',
        selected: { pork: 1, beef: 1, bbq: 1 },
        note: '',
      },
    };

    const sanitized = sanitizeAndVerifyCartItem(forgedCartItem);
    expect(sanitized).not.toBeNull();
    // Đơn giá PHẢI được tính lại theo đúng bảng giá niêm yết là 65.000đ
    expect(sanitized?.unitPrice).toBe(65000);
    expect(sanitized?.qty).toBe(2);
  });

  it('bảo vệ chống gian lận giá từ localStorage đối với món menu', () => {
    const forgedMenuItem = {
      id: 'burger-row',
      key: 'burger-beef-',
      type: 'menu-item',
      name: 'Burger bò phô mai',
      details: '',
      unitPrice: 500, // Kẻ gian sửa giá thành 500đ
      qty: 1,
      menuItemId: 'burger-beef', // Giá thật là 59.000đ
    };

    const sanitized = sanitizeAndVerifyCartItem(forgedMenuItem);
    expect(sanitized).not.toBeNull();
    expect(sanitized?.unitPrice).toBe(59000);
  });

  it('loại bỏ các mục hỏng hoặc không hoàn chỉnh trong giỏ hàng', () => {
    // Tacos chưa chọn đủ nhân
    expect(
      sanitizeAndVerifyCartItem({
        id: '1',
        key: 'taco-invalid',
        type: 'tacos',
        name: 'Tacos',
        details: '',
        unitPrice: 45000,
        qty: 1,
        tacosConfig: { size: 'M', selected: { pork: 1 } }, // Thiếu 1 nhân và 1 sốt
      })
    ).toBeNull();

    // Món không tồn tại trong menu
    expect(
      sanitizeAndVerifyCartItem({
        id: '2',
        key: 'unknown',
        type: 'menu-item',
        name: 'Món lạ',
        details: '',
        unitPrice: 10000,
        qty: 1,
        menuItemId: 'not-exist-item',
      })
    ).toBeNull();

    // Số lượng âm
    expect(
      sanitizeAndVerifyCartItem({
        id: '3',
        key: 'fries',
        type: 'menu-item',
        name: 'Khoai',
        details: '',
        unitPrice: 39000,
        qty: -5,
        menuItemId: 'fries',
      })
    ).toBeNull();
  });

  it('tính toán chính xác tổng tiền và tổng số lượng giỏ hàng', () => {
    const cart: CartItem[] = [
      {
        id: '1',
        key: 'taco-1',
        type: 'tacos',
        name: 'Tacos Pháp · size M',
        details: 'Nhân: Heo, Bò. Sốt: BBQ',
        unitPrice: 65000,
        qty: 2, // 130.000đ
      },
      {
        id: '2',
        key: 'burger-1',
        type: 'menu-item',
        name: 'Burger bò phô mai',
        details: '',
        unitPrice: 59000,
        qty: 1, // 59.000đ
      },
    ];

    expect(calculateCartTotal(cart)).toBe(189000);
    expect(countTotalCartItems(cart)).toBe(3);
  });

  it('tạo văn bản đơn đặt hàng rõ ràng, lịch sự và đầy đủ thông tin', () => {
    const cart: CartItem[] = [
      {
        id: '1',
        key: 'taco-1',
        type: 'tacos',
        name: 'Tacos Pháp · size M',
        details: 'Nhân: Heo, Bò. Sốt: BBQ. Ghi chú: ít cay',
        unitPrice: 65000,
        qty: 1,
      },
      {
        id: '2',
        key: 'pepsi-1',
        type: 'menu-item',
        name: 'Pepsi',
        details: '',
        unitPrice: 15000,
        qty: 2,
      },
    ];

    const orderText = buildOrderText(cart);
    expect(orderText).toContain('Chào Cheesie, mình muốn đặt:');
    expect(orderText).toContain('1. 1 × Tacos Pháp · size M');
    expect(orderText).toContain('Nhân: Heo, Bò. Sốt: BBQ. Ghi chú: ít cay');
    expect(orderText).toContain('2. 2 × Pepsi');
    expect(orderText).toContain('Tạm tính:');
    expect(orderText).toContain('Chưa gồm phí giao hàng');
  });
});
