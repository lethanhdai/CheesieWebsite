import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../../App';
import { MenuSection } from '../MenuSection';
import { DishDetailModal } from '../DishDetailModal';
import { OriginalMenuModal } from '../OriginalMenuModal';
import menuData from '@/data/menu.json';
import type { MenuItem } from '@/types';

describe('Phase 05: Complete Menu & Mobile Ordering Experience', () => {
  beforeEach(() => {
    localStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('xác thực danh mục menu đầy đủ 22 món với các danh mục chính xác', () => {
    const items = menuData.items as MenuItem[];
    expect(items.length).toBe(22);

    const categories = new Set(items.map((i) => i.category));
    expect(categories.has('tacos')).toBe(true);
    expect(categories.has('burger')).toBe(true);
    expect(categories.has('chicken')).toBe(true);
    expect(categories.has('fries')).toBe(true);
    expect(categories.has('pasta')).toBe(true);
    expect(categories.has('combo')).toBe(true);
    expect(categories.has('drinks')).toBe(true);

    // Kiểm tra 5 combos
    const combos = items.filter((i) => i.category === 'combo');
    expect(combos.length).toBe(5);
    expect(combos.map((c) => c.name)).toEqual([
      'Combo Chicken & Fries',
      'Combo Best Seller Nhà Cheesie',
      'Combo Bestie No Nê',
      'Combo Cheesie Signature Mega',
      'Combo Cheesie Big Feast',
    ]);

    // Kiểm tra giá combos theo menu gốc
    expect(combos.find((c) => c.id === 'combo-chicken-fries')?.price).toBe(99000);
    expect(combos.find((c) => c.id === 'combo-best-seller')?.price).toBe(119000);
    expect(combos.find((c) => c.id === 'combo-bestie')?.price).toBe(159000);
    expect(combos.find((c) => c.id === 'combo-mega')?.price).toBe(219000);
    expect(combos.find((c) => c.id === 'combo-big-feast')?.price).toBe(315000);
  });

  it('chuyển đổi danh mục menu lập tức hiển thị món, không để lại khoảng trống', () => {
    const handleSelectDish = vi.fn();
    const handleViewOriginal = vi.fn();
    const items = menuData.items as MenuItem[];

    render(
      <MenuSection
        menuItems={items}
        onSelectDish={handleSelectDish}
        onViewOriginalMenu={handleViewOriginal}
      />
    );

    // Mặc định "Tất cả" hiển thị đầy đủ
    expect(screen.getByText('Combo Best Seller Nhà Cheesie')).toBeDefined();
    expect(screen.getByText('Burger bò phô mai')).toBeDefined();

    // Chuyển sang Combo
    const comboTab = screen.getByRole('button', { name: /^Combo$/i });
    fireEvent.click(comboTab);
    expect(screen.getByText('Combo Chicken & Fries')).toBeDefined();
    expect(screen.getByText('Combo Cheesie Big Feast')).toBeDefined();
    expect(screen.queryByText('Pepsi')).toBeNull(); // Không bị lẫn nước uống

    // Chuyển sang Khoai
    const friesTab = screen.getByRole('button', { name: /^Khoai$/i });
    fireEvent.click(friesTab);
    expect(screen.getByText('Khoai truyền thống')).toBeDefined();
    expect(screen.getByText('Khoai bacon')).toBeDefined();
    expect(screen.queryByText('Burger bò phô mai')).toBeNull();

    // Chuyển sang Nước uống
    const drinksTab = screen.getByRole('button', { name: /^Nước uống$/i });
    fireEvent.click(drinksTab);
    expect(screen.getByText('Pepsi')).toBeDefined();
    expect(screen.getByText('7 Up')).toBeDefined();
    expect(screen.getByText('Nước suối')).toBeDefined();
  });

  it('hỗ trợ tùy chọn vị sốt trong DishDetailModal cho Gà tender', () => {
    const chickenItem: MenuItem = {
      id: 'chicken-2',
      name: 'Gà tender 2 sốt',
      price: 60000,
      category: 'chicken',
      desc: '9 viên · Ghi chú vị sốt bạn thích.',
    };
    const handleAddToCart = vi.fn();
    const handleClose = vi.fn();

    render(
      <DishDetailModal
        item={chickenItem}
        onClose={handleClose}
        onAddToCart={handleAddToCart}
      />
    );

    expect(screen.getByText('Gà tender 2 sốt')).toBeDefined();
    expect(screen.getByText(/Chọn 2 vị sốt cho gà/i)).toBeDefined();

    // Chọn sốt Bơ tỏi mật ong
    const garlicSauceBtn = screen.getByRole('button', { name: /Bơ tỏi mật ong/i });
    fireEvent.click(garlicSauceBtn);

    // Bấm thêm vào giỏ
    const addBtn = screen.getByRole('button', { name: /Thêm vào túi đồ ngon/i });
    fireEvent.click(addBtn);

    expect(handleAddToCart).toHaveBeenCalledWith(
      chickenItem,
      1,
      expect.stringContaining('Vị sốt:')
    );
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('hỗ trợ tùy chọn combo và hiển thị danh sách món đi kèm trong DishDetailModal', () => {
    const comboItem = (menuData.items as MenuItem[]).find(
      (i) => i.id === 'combo-best-seller'
    )!;
    const handleAddToCart = vi.fn();
    const handleClose = vi.fn();

    render(
      <DishDetailModal
        item={comboItem}
        onClose={handleClose}
        onAddToCart={handleAddToCart}
      />
    );

    // Kiểm tra danh sách món bao gồm
    expect(screen.getByText(/Các món bao gồm trong combo:/i)).toBeDefined();
    expect(screen.getByText('Mì Ý kem Tomyum')).toBeDefined();

    // Kiểm tra tùy chọn nước ngọt
    expect(screen.getByText(/Chọn nước ngọt đi kèm:/i)).toBeDefined();
    const lemonPepsiBtn = screen.getByRole('button', { name: /Pepsi chanh/i });
    fireEvent.click(lemonPepsiBtn);

    // Kiểm tra tùy chọn tacos trong combo
    expect(screen.getByText(/Tùy chọn Tacos trong Combo/i)).toBeDefined();
    expect(screen.getByText('Có rau')).toBeDefined();

    // Bấm thêm vào giỏ
    const addBtn = screen.getByRole('button', { name: /Thêm vào túi đồ ngon/i });
    fireEvent.click(addBtn);

    expect(handleAddToCart).toHaveBeenCalledWith(
      comboItem,
      1,
      expect.stringContaining('Pepsi chanh')
    );
  });

  it('modal xem menu gốc OriginalMenuModal hỗ trợ chuyển trang và phóng to', () => {
    const handleClose = vi.fn();
    render(<OriginalMenuModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText(/Menu gốc nhà Cheesie/i)).toBeDefined();

    // Chuyển sang trang combo
    const comboTab = screen.getByRole('button', { name: /Trang 2 · Combo tiết kiệm/i });
    fireEvent.click(comboTab);

    const comboImg = screen.getByAltText(/Menu combo Cheesie:/i);
    expect(comboImg).toBeDefined();

    // Nút đóng
    const closeBtn = screen.getByRole('button', { name: /Đóng bảng menu gốc/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('toàn bộ luồng chọn combo từ menu và xuất hiện trong giỏ hàng chính xác giá', async () => {
    render(<App />);

    // Mở danh mục Combo
    const comboCategoryBtn = screen.getByRole('button', { name: /^Combo$/i });
    fireEvent.click(comboCategoryBtn);

    // Chọn Combo Chicken & Fries (99k)
    const selectComboBtn = screen.getByRole('button', {
      name: /Chọn Combo Chicken & Fries/i,
    });
    fireEvent.click(selectComboBtn);

    // Modal chi tiết món xuất hiện
    expect(screen.getAllByText('Combo Chicken & Fries').length).toBeGreaterThanOrEqual(1);

    // Bấm thêm vào giỏ hàng
    const addToBagBtn = screen.getByRole('button', { name: /Thêm vào túi đồ ngon/i });
    fireEvent.click(addToBagBtn);

    // Mở giỏ hàng
    const openBagBtn = screen.getByRole('button', { name: /Túi đồ ngon/i });
    expect(openBagBtn.textContent).toContain('1');
    fireEvent.click(openBagBtn);

    // Kiểm tra trong giỏ
    const cartModal = screen.getByRole('dialog', { name: /Túi đồ ngon của bạn/i });
    expect(within(cartModal).getByText('Combo Chicken & Fries')).toBeDefined();
    expect(within(cartModal).getAllByText('99.000đ').length).toBeGreaterThanOrEqual(1);
  });
});
