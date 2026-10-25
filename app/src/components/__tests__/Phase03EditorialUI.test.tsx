import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Hero } from '../Hero';
import { MenuSection } from '../MenuSection';
import { ProductCard } from '../ProductCard';
import { TacosBuilder } from '../TacosBuilder';
import { SpaceSection } from '../SpaceSection';
import { Footer } from '../Footer';
import type { MenuItem, SelectedIngredients } from '@/types';

describe('Phase 03 Premium Editorial UI Refinement', () => {
  it('render Hero với 3 bước lộ trình tự cuốn theo phong cách editorial station route', () => {
    render(<Hero />);

    const journeyTrack = screen.getByLabelText(/3 bước tự cuốn tacos/i);
    expect(journeyTrack).toBeDefined();

    // 3 milestones
    expect(within(journeyTrack).getByText(/CHỌN SIZE/i)).toBeDefined();
    expect(within(journeyTrack).getByText(/THẢ NHÂN/i)).toBeDefined();
    expect(within(journeyTrack).getByText(/THÊM SỐT/i)).toBeDefined();

    // Numbers 01, 02, 03
    expect(within(journeyTrack).getByText('01')).toBeDefined();
    expect(within(journeyTrack).getByText('02')).toBeDefined();
    expect(within(journeyTrack).getByText('03')).toBeDefined();
  });

  it('render ProductCard theo phong cách editorial nhẹ nhàng, không bọc Card thô cứng', () => {
    const mockItem: MenuItem = {
      id: 'burger-beef',
      name: 'Burger bò phô mai',
      desc: 'Bò nướng than, sốt phô mai kéo sợi',
      price: 55000,
      category: 'burger',
      tag: 'Bán chạy',
    };
    const handleSelect = vi.fn();

    render(<ProductCard item={mockItem} onSelect={handleSelect} />);

    expect(screen.getByText('Burger bò phô mai')).toBeDefined();
    expect(screen.getByText('55.000đ')).toBeDefined();
    expect(screen.getByText('Bán chạy')).toBeDefined();

    const addBtn = screen.getByRole('button', { name: /Chọn Burger bò phô mai/i });
    expect(addBtn).toBeDefined();
    fireEvent.click(addBtn);
    expect(handleSelect).toHaveBeenCalledWith(mockItem);
  });

  it('render MenuSection với thanh lọc nhóm món dạng phân đoạn thanh lịch', () => {
    const mockItems: MenuItem[] = [
      { id: 'taco', name: 'Tacos tự cuốn', desc: 'Chọn theo gu', price: 40000, category: 'tacos' },
      { id: 'burger-beef', name: 'Burger bò phô mai', desc: 'Bò nướng than', price: 55000, category: 'burger' },
    ];
    const handleSelect = vi.fn();
    const handleViewOriginal = vi.fn();

    render(
      <MenuSection
        menuItems={mockItems}
        onSelectDish={handleSelect}
        onViewOriginalMenu={handleViewOriginal}
      />
    );

    const toolbar = screen.getByRole('group', { name: /Nhóm món ăn/i });
    expect(toolbar).toBeDefined();

    const burgerBtn = within(toolbar).getByRole('button', { name: /^Burger$/i });
    fireEvent.click(burgerBtn);
    expect(screen.getByText('Burger bò phô mai')).toBeDefined();
  });

  it('render TacosBuilder với size selector phân đoạn, bảng khởi hành, và khung tóm tắt đơn', () => {
    const defaultProps = {
      size: 'M' as const,
      selected: { beef: 1 } as SelectedIngredients,
      note: 'Ít cay',
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

    // Segmented sizes
    const sizeGroup = screen.getByRole('group', { name: /Chọn size tacos/i });
    expect(sizeGroup).toBeDefined();

    // Ingredient selection
    const proteinTab = screen.getByRole('tab', { name: /02 \/ Nhân bánh/i });
    expect(proteinTab).toBeDefined();

    // Vegetable preference
    const veggieGroup = screen.getByRole('radiogroup', { name: /Tùy chọn rau trong bánh/i });
    expect(veggieGroup).toBeDefined();
    const noVeggieBtn = within(veggieGroup).getByRole('radio', { name: /Không rau/i });
    fireEvent.click(noVeggieBtn);
    expect(defaultProps.onVegetablesChange).toHaveBeenCalledWith(false);

    // Summary ticket
    expect(screen.getByText(/CHIẾC TACOS CỦA BẠN/i)).toBeDefined();
    expect(screen.getAllByText(/65\.000đ/i).length).toBeGreaterThanOrEqual(1);
  });

  it('render SpaceSection và Footer với credit thiết kế nguyên bản', () => {
    const handleInfo = vi.fn();
    const handleOriginal = vi.fn();

    const { unmount } = render(<SpaceSection onOpenRestaurantInfo={handleInfo} />);
    expect(screen.getByText(/Trạm dừng/i)).toBeDefined();
    expect(screen.getByText(/102 Lê Lai, Ninh Kiều, Cần Thơ/i)).toBeDefined();
    unmount();

    render(<Footer onViewOriginalMenu={handleOriginal} />);
    expect(screen.getByText(/© 2026 Cheesie/i)).toBeDefined();
    expect(screen.getByText(/Design by Daniel/i)).toBeDefined();
    expect(screen.getByRole('link', { name: /Cheesie trang chủ/i })).toBeDefined();
  });
});
