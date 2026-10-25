import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TacosBuilder } from '../TacosBuilder';
import { TortillaSvg } from '../TortillaSvg';
import {
  buildTacosDetailsSummary,
  generateTacosDeduplicationKey,
} from '../../domain/tacos';
import { sanitizeAndVerifyCartItem } from '../../domain/cart';
import App from '../../App';

describe('Phase 02.3 Sauce Visualization & Vegetable Customization', () => {
  it('định dạng đúng tóm tắt rau và phân biệt key khi có rau và không rau', () => {
    const selected = { pork: 1, beef: 1, bbq: 1 };
    
    // Có rau
    const summaryWithVeg = buildTacosDetailsSummary('M', selected, '', true);
    expect(summaryWithVeg).toContain('Rau: Có rau');
    const keyWithVeg = generateTacosDeduplicationKey('M', selected, '', true);

    // Không rau
    const summaryNoVeg = buildTacosDetailsSummary('M', selected, '', false);
    expect(summaryNoVeg).toContain('Rau: Không rau');
    const keyNoVeg = generateTacosDeduplicationKey('M', selected, '', false);

    // Key phải khác nhau để không gộp nhầm trong giỏ hàng
    expect(keyWithVeg).not.toBe(keyNoVeg);
  });

  it('tương thích ngược: giỏ hàng cũ không có trường hasVegetables tự động mặc định Có rau', () => {
    const legacyItem = {
      id: 'legacy-1',
      key: 'taco-M-legacy',
      type: 'tacos',
      name: 'Tacos Pháp · size M',
      details: 'Nhân: Heo, Bò. Sốt: BBQ',
      unitPrice: 65000,
      qty: 1,
      tacosConfig: {
        size: 'M',
        selected: { pork: 1, beef: 1, bbq: 1 },
        note: '',
        // không có hasVegetables
      },
    };

    const sanitized = sanitizeAndVerifyCartItem(legacyItem);
    expect(sanitized).not.toBeNull();
    expect(sanitized?.tacosConfig?.hasVegetables).toBe(true);
  });

  it('hiển thị tùy chọn Rau trong bánh với 2 lựa chọn Có rau và Không rau, mặc định Có rau', () => {
    const onVegChange = vi.fn();
    render(
      <TacosBuilder
        size="M"
        selected={{ pork: 1, beef: 1, bbq: 1 }}
        note=""
        folded={false}
        hasVegetables={true}
        onVegetablesChange={onVegChange}
        onSizeChangeRequest={vi.fn()}
        onIngredientAdd={vi.fn()}
        onIngredientRemove={vi.fn()}
        onNoteChange={vi.fn()}
        onToggleFold={vi.fn()}
        onResetRequest={vi.fn()}
        onAddTacosToCart={vi.fn()}
        onToast={vi.fn()}
      />
    );

    // Kiểm tra tiêu đề và mô tả
    expect(screen.getByText(/Rau trong bánh/i)).toBeDefined();
    expect(screen.getByText(/Xà lách và bắp cải thái sợi/i)).toBeDefined();

    // Kiểm tra 2 nút radio
    const yesBtn = screen.getByRole('radio', { name: /Có rau/i });
    const noBtn = screen.getByRole('radio', { name: /Không rau/i });

    expect(yesBtn.getAttribute('aria-checked')).toBe('true');
    expect(noBtn.getAttribute('aria-checked')).toBe('false');

    // Bấm chọn Không rau
    fireEvent.click(noBtn);
    expect(onVegChange).toHaveBeenCalledWith(false);
  });

  it('TortillaSvg: ẩn hiện lớp rau và vẽ sốt Bézier serpentine 3D chuẩn xác', () => {
    // 1. Khi hasVegetables = true: phải có #veggie-layer
    const { container: withVegContainer } = render(
      <TortillaSvg size="M" selected={{ pork: 1, beef: 1, bbq: 1 }} hasVegetables={true} />
    );
    const veggieLayer = withVegContainer.querySelector('#veggie-layer');
    expect(veggieLayer).not.toBeNull();

    // 2. Khi hasVegetables = false: không có #veggie-layer
    const { container: noVegContainer } = render(
      <TortillaSvg size="M" selected={{ pork: 1, beef: 1, bbq: 1 }} hasVegetables={false} />
    );
    expect(noVegContainer.querySelector('#veggie-layer')).toBeNull();

    // 3. Kiểm tra sốt: có nét dày và lớp highlight specular bóng bẩy
    const sauceLayer = withVegContainer.querySelector('#sauce-layer');
    expect(sauceLayer).not.toBeNull();
    const saucePaths = sauceLayer?.querySelectorAll('path');
    expect(saucePaths?.length).toBeGreaterThanOrEqual(3); // shadow, body, highlight
  });

  it('luồng thêm vào giỏ, đổi tùy chọn rau và chỉnh sửa từ giỏ hàng trong App', () => {
    localStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    render(<App />);

    // Thêm nhân Heo, Bò
    fireEvent.click(screen.getByRole('button', { name: /Thêm Heo/i }));
    fireEvent.click(screen.getByRole('button', { name: /Thêm Bò/i }));

    // Chọn sốt BBQ
    fireEvent.click(screen.getByRole('tab', { name: /03 \/ Nước sốt/i }));
    fireEvent.click(screen.getByRole('button', { name: /Thêm BBQ/i }));

    // Chuyển sang "Không rau"
    const noVegBtn = screen.getByRole('radio', { name: /Không rau/i });
    fireEvent.click(noVegBtn);

    // Thêm vào giỏ
    fireEvent.click(screen.getByRole('button', { name: /Thêm vào túi ·/i }));

    // Mở giỏ hàng kiểm tra
    const openBagBtn = screen.getByRole('button', { name: /Túi đồ ngon/i });
    fireEvent.click(openBagBtn);

    expect(screen.getByText(/Rau: Không rau/i)).toBeDefined();
  });
});
