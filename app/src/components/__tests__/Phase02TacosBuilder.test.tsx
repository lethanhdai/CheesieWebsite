import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { TacosBuilder } from '../TacosBuilder';
import type { SelectedIngredients } from '@/types';

describe('Phase 02 Premium Tacos Builder Experience', () => {
  const defaultProps = {
    size: 'M' as const,
    selected: {} as SelectedIngredients,
    note: '',
    folded: false,
    onSizeChangeRequest: vi.fn(),
    onIngredientAdd: vi.fn(),
    onIngredientRemove: vi.fn(),
    onNoteChange: vi.fn(),
    onToggleFold: vi.fn(),
    onResetRequest: vi.fn(),
    onAddTacosToCart: vi.fn(),
    onToast: vi.fn(),
    isEditing: false,
  };

  it('hiển thị đầy đủ 5 size tacos trong bộ điều khiển phân đoạn, đúng giá niêm yết và định lượng', () => {
    render(<TacosBuilder {...defaultProps} />);

    const sizeGroup = screen.getByRole('group', { name: /Chọn size tacos/i });
    expect(sizeGroup).toBeDefined();

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'] as const;
    sizes.forEach((s) => {
      const btn = within(sizeGroup).getByRole('button', { name: new RegExp(`^${s}`, 'i') });
      expect(btn).toBeDefined();
      if (s === 'M') {
        expect(btn.getAttribute('aria-pressed')).toBe('true');
      } else {
        expect(btn.getAttribute('aria-pressed')).toBe('false');
      }
    });

    // Bấm đổi sang size L
    const lBtn = within(sizeGroup).getByRole('button', { name: /^L/i });
    fireEvent.click(lBtn);
    expect(defaultProps.onSizeChangeRequest).toHaveBeenCalledWith('L');
  });

  it('hiển thị rõ ràng bảng khởi hành Tacos Express với thông tin toa bánh và trạm tiếp theo', () => {
    render(<TacosBuilder {...defaultProps} />);

    const board = screen.getByLabelText(/Bảng khởi hành Tacos Express/i);
    expect(board).toBeDefined();
    expect(within(board).getByText(/TACOS EXPRESS/i)).toBeDefined();
    expect(within(board).getByText(/TOA BÁNH/i)).toBeDefined();
    expect(within(board).getByText(/^M$/)).toBeDefined();
    expect(within(board).getByText(/CHỌN NHÂN/i)).toBeDefined();
  });

  it('quản lý các tab nguyên liệu và thông tin hướng dẫn chọn', () => {
    render(<TacosBuilder {...defaultProps} />);

    const proteinTab = screen.getByRole('tab', { name: /02 \/ Nhân bánh/i });
    const sauceTab = screen.getByRole('tab', { name: /03 \/ Nước sốt/i });
    const extraTab = screen.getByRole('tab', { name: /Thêm chút ngon/i });

    expect(proteinTab.getAttribute('aria-selected')).toBe('true');
    expect(sauceTab.getAttribute('aria-selected')).toBe('false');
    expect(extraTab.getAttribute('aria-selected')).toBe('false');

    // Chuyển sang tab sốt
    fireEvent.click(sauceTab);
    expect(sauceTab.getAttribute('aria-selected')).toBe('true');

    // Chuyển sang tab topping thêm
    fireEvent.click(extraTab);
    expect(extraTab.getAttribute('aria-selected')).toBe('true');
  });

  it('cho phép thêm và bớt nguyên liệu qua stepper button', () => {
    const handleAdd = vi.fn();
    const handleRemove = vi.fn();

    render(
      <TacosBuilder
        {...defaultProps}
        selected={{ pork: 1 }}
        onIngredientAdd={handleAdd}
        onIngredientRemove={handleRemove}
      />
    );

    // Thêm Bò
    const addBeefBtn = screen.getByRole('button', { name: /Thêm Bò/i });
    fireEvent.click(addBeefBtn);
    expect(handleAdd).toHaveBeenCalledWith('beef');

    // Bớt Heo
    const removePorkBtn = screen.getByRole('button', { name: /Bớt Heo/i });
    fireEvent.click(removePorkBtn);
    expect(handleRemove).toHaveBeenCalledWith('pork');
  });

  it('khi đơn chưa đủ điều kiện, nút thêm vào túi bị vô hiệu hóa và giải thích rõ phần còn thiếu', () => {
    render(
      <TacosBuilder
        {...defaultProps}
        selected={{ pork: 1 }} // Size M cần 2 nhân, 1 sốt -> thiếu 1 nhân, 1 sốt
      />
    );

    const addBtn = screen.getByRole('button', { name: /Còn 1 phần nhân để hoàn thành/i });
    expect(addBtn).toBeDefined();
    expect(addBtn.hasAttribute('disabled')).toBe(true);

    const statusMsg = screen.getByRole('status');
    expect(statusMsg.textContent).toContain('Còn 1 phần nhân và 1 phần sốt để hoàn thành.');
  });

  it('khi đã chọn đủ nhân và sốt theo size, nút kích hoạt sẵn sàng và hiển thị tổng tiền', () => {
    const handleAddToCart = vi.fn();

    render(
      <TacosBuilder
        {...defaultProps}
        selected={{ pork: 1, beef: 1, bbq: 1 }} // Size M đủ 2 nhân, 1 sốt
        onAddTacosToCart={handleAddToCart}
      />
    );

    const addBtn = screen.getByRole('button', { name: /Thêm vào túi · 65\.000/i });
    expect(addBtn).toBeDefined();
    expect(addBtn.hasAttribute('disabled')).toBe(false);

    fireEvent.click(addBtn);
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

  it('hỗ trợ chế độ chỉnh sửa tacos từ giỏ hàng (isEditing)', () => {
    render(
      <TacosBuilder
        {...defaultProps}
        selected={{ pork: 1, beef: 1, bbq: 1 }}
        isEditing={true}
      />
    );

    expect(screen.getByText(/ĐANG CHỈNH SỬA TỪ GIỎ HÀNG/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Cập nhật chiếc tacos · 65\.000/i })).toBeDefined();
  });

  it('hỗ trợ nhập ghi chú và kích hoạt làm lại (reset)', () => {
    const handleNote = vi.fn();
    const handleReset = vi.fn();

    render(
      <TacosBuilder
        {...defaultProps}
        selected={{ pork: 1 }}
        onNoteChange={handleNote}
        onResetRequest={handleReset}
      />
    );

    const noteInput = screen.getByLabelText(/Ghi chú cho chiếc tacos/i);
    fireEvent.change(noteInput, { target: { value: 'Không hành tây' } });
    expect(handleNote).toHaveBeenCalledWith('Không hành tây');

    const resetBtn = screen.getByRole('button', { name: /Làm lại chiếc tacos này/i });
    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
