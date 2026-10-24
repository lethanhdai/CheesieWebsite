import { describe, it, expect } from 'vitest';
import {
  TACOS_SIZES,
  canAddIngredient,
  isTacosReady,
  doesSelectionFitSize,
  computeTacosPrice,
  validateSelectedCounts,
  buildTacosDetailsSummary,
  generateTacosDeduplicationKey,
} from '../tacos';

describe('Tacos Domain Rules', () => {
  it('xác thực đúng 5 size, đơn giá niêm yết và cấu hình định lượng', () => {
    expect(TACOS_SIZES.S.price).toBe(45000);
    expect(TACOS_SIZES.M.price).toBe(65000);
    expect(TACOS_SIZES.L.price).toBe(75000);
    expect(TACOS_SIZES.XL.price).toBe(95000);
    expect(TACOS_SIZES.XXL.price).toBe(115000);

    expect(TACOS_SIZES.S).toMatchObject({ protein: 1, sauce: 1, base: [] });
    expect(TACOS_SIZES.M).toMatchObject({ protein: 2, sauce: 1, base: ['Mozzarella'] });
    expect(TACOS_SIZES.L).toMatchObject({ protein: 3, sauce: 2, base: ['Mozzarella'] });
    expect(TACOS_SIZES.XL).toMatchObject({ protein: 4, sauce: 3, base: ['Mozzarella', 'Trứng'] });
    expect(TACOS_SIZES.XXL).toMatchObject({ protein: 5, sauce: 4, base: ['Mozzarella', 'Trứng', 'Bacon'] });
  });

  it('tuân thủ nghiêm ngặt quy tắc không chọn trùng nhân/sốt theo size', () => {
    const selected: Record<string, number> = {};

    // Chọn nhân bò lần đầu -> cho phép
    expect(canAddIngredient('M', selected, 'beef')).toBe(true);
    selected['beef'] = 1;

    // Chọn nhân bò lần hai -> BỊ CHẶN (không lặp nhân)
    expect(canAddIngredient('M', selected, 'beef')).toBe(false);

    // Chọn thêm nhân heo -> cho phép (vì M cần 2 nhân)
    expect(canAddIngredient('M', selected, 'pork')).toBe(true);
    selected['pork'] = 1;

    // Đã đủ 2 nhân cho size M -> không thể thêm nhân gà
    expect(canAddIngredient('M', selected, 'chicken')).toBe(false);

    // Thêm sốt BBQ -> cho phép
    expect(canAddIngredient('M', selected, 'bbq')).toBe(true);
    selected['bbq'] = 1;

    // M chỉ có 1 sốt -> không thể thêm sốt tacos
    expect(canAddIngredient('M', selected, 'tacos-sauce')).toBe(false);

    // Kiểm tra trạng thái hoàn thành (Ready)
    expect(isTacosReady('M', selected)).toBe(true);
    expect(computeTacosPrice('M', selected)).toBe(65000);
  });

  it('bắt buộc chọn đúng và đủ số lượng thành phần trước khi cho phép cuốn/thêm vào giỏ', () => {
    // M thiếu 1 nhân
    expect(isTacosReady('M', { pork: 1, 'tacos-sauce': 1 })).toBe(false);

    // M thiếu sốt
    expect(isTacosReady('M', { pork: 1, beef: 1 })).toBe(false);

    // M lặp nhân (dữ liệu giả mạo: 2 bò) -> không hợp lệ
    expect(isTacosReady('M', { beef: 2, 'tacos-sauce': 1 })).toBe(false);

    // XXL yêu cầu cả 5 nhân và 4 sốt
    const xxlSelected = {
      pork: 1,
      beef: 1,
      chicken: 1,
      'cheese-sausage': 1,
      sausage: 1,
      'tacos-sauce': 1,
      bbq: 1,
      pesto: 1,
      andalouse: 1,
    };
    expect(isTacosReady('XXL', xxlSelected)).toBe(true);
    expect(computeTacosPrice('XXL', xxlSelected)).toBe(115000);
  });

  it('tính toán chính xác giá topping thêm (VND số nguyên)', () => {
    const selected = {
      pork: 1,
      'tacos-sauce': 1,
      cheddar: 1, // +10.000đ
      egg: 1, // +5.000đ
      bacon: 1, // +15.000đ
    };

    expect(isTacosReady('S', selected)).toBe(true);
    // 45.000 + 10.000 + 5.000 + 15.000 = 75.000đ
    expect(computeTacosPrice('S', selected)).toBe(75000);
  });

  it('kiểm tra quy tắc đổi size và tương thích định lượng (fits)', () => {
    const mSelected = {
      pork: 1,
      beef: 1,
      bbq: 1,
    };

    // M có 2 nhân, 1 sốt -> Không vừa size S (chỉ có 1 nhân, 1 sốt)
    expect(doesSelectionFitSize('S', mSelected)).toBe(false);

    // M vừa size L (3 nhân, 2 sốt) và XL (4 nhân, 3 sốt)
    expect(doesSelectionFitSize('L', mSelected)).toBe(true);
    expect(doesSelectionFitSize('XL', mSelected)).toBe(true);
  });

  it('từ chối dữ liệu số lượng hoặc ID nguyên liệu không hợp lệ', () => {
    expect(validateSelectedCounts({ pork: -1 })).toBe(false);
    expect(validateSelectedCounts({ fake_ingredient: 1 })).toBe(false);
    expect(validateSelectedCounts({ pork: 1.5 })).toBe(false);
    expect(validateSelectedCounts(null)).toBe(false);
    expect(validateSelectedCounts('invalid')).toBe(false);
  });

  it('tạo tóm tắt thành phần chi tiết và key nhận diện công thức', () => {
    const selected = {
      pork: 1,
      beef: 1,
      bbq: 1,
      cheddar: 1,
    };
    const summary = buildTacosDetailsSummary('M', selected, 'ít cay');
    expect(summary).toContain('Nhân: Heo, Bò');
    expect(summary).toContain('Sốt: BBQ');
    expect(summary).toContain('Đã gồm: Mozzarella');
    expect(summary).toContain('Thêm: Cheddar');
    expect(summary).toContain('Ghi chú: ít cay');

    const key1 = generateTacosDeduplicationKey('M', selected, 'ít cay');
    const key2 = generateTacosDeduplicationKey('M', selected, 'ít cay');
    const keyDiffNote = generateTacosDeduplicationKey('M', selected, 'nhiều ớt');
    expect(key1).toBe(key2);
    expect(key1).not.toBe(keyDiffNote);
  });
});
