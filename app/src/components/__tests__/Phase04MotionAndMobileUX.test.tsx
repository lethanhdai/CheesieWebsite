import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Header } from '../Header';
import { TacosBuilder } from '../TacosBuilder';
import type { SelectedIngredients } from '@/types';

describe('Phase 04 Motion Design, Navigation & Mobile Ordering UX', () => {
  it('render Header với nút hamburger trên mobile và mở Sheet điều hướng khi bấm', () => {
    const handleOpenBag = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <Header
        bagCount={2}
        onOpenBag={handleOpenBag}
        activeSection="menu"
        onNavigateSection={handleNavigate}
      />
    );

    // Desktop nav has active state for menu
    const menuLinks = screen.getAllByRole('link', { name: /Menu nhà Cheesie/i });
    expect(menuLinks.length).toBeGreaterThanOrEqual(1);

    // Hamburger button
    const hamburger = screen.getByRole('button', { name: /Mở menu điều hướng/i });
    expect(hamburger).toBeDefined();
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');

    // Click hamburger to open sheet
    fireEvent.click(hamburger);
    expect(screen.getByRole('dialog', { name: /Menu điều hướng di động/i })).toBeDefined();

    // Sheet contains transit info
    const sheet = screen.getByRole('dialog', { name: /Menu điều hướng di động/i });
    expect(within(sheet).getByText(/THÔNG TIN GA TÀU/i)).toBeDefined();
    expect(within(sheet).getByText(/102 Lê Lai, Ninh Kiều, Cần Thơ/i)).toBeDefined();
    expect(within(sheet).getByText(/078 878 6283/i)).toBeDefined();

    // Click navigation item in sheet
    const sheetTacosLink = within(sheet).getByRole('link', { name: /Tự cuốn tacos/i });
    fireEvent.click(sheetTacosLink);
    expect(handleNavigate).toHaveBeenCalledWith('builder');

    // Sheet should close after selection
    expect(screen.queryByRole('dialog', { name: /Menu điều hướng di động/i })).toBeNull();
  });

  it('đóng Mobile Sheet khi bấm phím Escape', () => {
    render(<Header bagCount={0} onOpenBag={vi.fn()} />);

    const hamburger = screen.getByRole('button', { name: /Mở menu điều hướng/i });
    fireEvent.click(hamburger);
    expect(screen.getByRole('dialog', { name: /Menu điều hướng di động/i })).toBeDefined();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /Menu điều hướng di động/i })).toBeNull();
  });

  it('Tacos Builder hiển thị hướng dẫn khi đã đủ phần nhân và gợi ý chuyển sang sốt', () => {
    const defaultProps = {
      size: 'S' as const, // size S requires 1 protein & 1 sauce
      selected: { pork: 1 } as SelectedIngredients, // đã đủ 1 protein, thiếu 1 sauce
      note: '',
      hasVegetables: true,
      folded: false,
      onSizeChangeRequest: vi.fn(),
      onIngredientAdd: vi.fn(),
      onIngredientRemove: vi.fn(),
      onVegetablesChange: vi.fn(),
      onNoteChange: vi.fn(),
      onToggleFold: vi.fn(),
      onResetRequest: vi.fn(),
      onAddTacosToCart: vi.fn(),
      onToast: vi.fn(),
      isEditing: false,
    };

    render(<TacosBuilder {...defaultProps} />);

    // Step guidance prompt
    expect(screen.getByText(/Đã đủ 1 phần nhân! Tiếp tục chọn sốt nhé/i)).toBeDefined();
    const switchSauceBtn = screen.getByRole('button', { name: /Sang tab sốt ↗/i });
    expect(switchSauceBtn).toBeDefined();

    // Missing feedback in summary
    expect(screen.getByText(/Còn thiếu 1 sốt/i)).toBeDefined();
    const quickPickSauce = screen.getByRole('button', { name: /Chọn sốt ngay ↗/i });
    expect(quickPickSauce).toBeDefined();

    // Click quick pick sauce switches tab
    fireEvent.click(quickPickSauce);
    expect(screen.getByRole('tab', { name: /03 \/ Nước sốt/i }).getAttribute('aria-selected')).toBe('true');
  });

  it('Tacos Builder hiển thị thanh đặt món sticky trên mobile với giá và hành động phù hợp', () => {
    const handleAdd = vi.fn();
    const readyProps = {
      size: 'S' as const,
      selected: { pork: 1, bbq: 1 } as SelectedIngredients, // đủ nhân & sốt
      note: '',
      hasVegetables: true,
      folded: false,
      onSizeChangeRequest: vi.fn(),
      onIngredientAdd: vi.fn(),
      onIngredientRemove: vi.fn(),
      onVegetablesChange: vi.fn(),
      onNoteChange: vi.fn(),
      onToggleFold: vi.fn(),
      onResetRequest: vi.fn(),
      onAddTacosToCart: handleAdd,
      onToast: vi.fn(),
      isEditing: false,
    };

    render(<TacosBuilder {...readyProps} />);

    // Button Add to Cart
    const addBtns = screen.getAllByRole('button', { name: /Thêm vào túi/i });
    expect(addBtns.length).toBeGreaterThanOrEqual(1);

    // Trigger add to cart
    fireEvent.click(addBtns[0]);
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
