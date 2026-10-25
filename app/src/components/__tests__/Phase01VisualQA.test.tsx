import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Topline } from '../Topline';
import { Header } from '../Header';
import { Hero } from '../Hero';
import { MenuSection } from '../MenuSection';
import { ProductCard } from '../ProductCard';
import menuData from '@/data/menu.json';
import type { MenuItem } from '@/types';

describe('Phase 01 Visual QA & Responsive Integrity', () => {
  it('render Topline đầy đủ thông tin ga tàu, giờ mở cửa và địa chỉ', () => {
    render(<Topline />);
    expect(screen.getByText(/CHEESIE STATION \/ TUYẾN ĐỒ NGON/i)).toBeDefined();
    expect(screen.getByText(/LINE 01/i)).toBeDefined();
    expect(screen.getByText(/09:30–22:30/i)).toBeDefined();
    expect(screen.getByText(/102 LÊ LAI/i)).toBeDefined();
  });

  it('render Header với logo, các liên kết điều hướng và nút túi đồ ngon', () => {
    const handleOpenBag = vi.fn();
    render(<Header bagCount={3} onOpenBag={handleOpenBag} />);

    expect(screen.getByRole('link', { name: /Cheesie trang chủ/i })).toBeDefined();
    expect(screen.getAllByText(/Menu/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Tự cuốn tacos/i).length).toBeGreaterThanOrEqual(1);

    const bagButton = screen.getByRole('button', { name: /Mở túi đồ ngon, hiện có 3 món/i });
    expect(bagButton).toBeDefined();
    expect(bagButton.textContent).toContain('3');

    fireEvent.click(bagButton);
    expect(handleOpenBag).toHaveBeenCalledTimes(1);
  });

  it('render Hero đúng headline tiếng Việt, mô tả và cấu trúc 3 bước', () => {
    render(<Hero />);
    expect(screen.getByText(/Đói rồi\?/i)).toBeDefined();
    expect(screen.getAllByText(/Cuốn/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Tacos đầy nhân, burger đẫm vị, gà giòn rụm/i)).toBeDefined();

    // CTA buttons
    const builderLinks = screen.getAllByRole('link', { name: /Tự cuốn tacos của bạn/i });
    expect(builderLinks.length).toBeGreaterThanOrEqual(1);
    expect(builderLinks[0].getAttribute('href')).toBe('#builder');

    const menuLinks = screen.getAllByRole('link', { name: /Khám phá menu/i });
    expect(menuLinks.length).toBeGreaterThanOrEqual(1);
    expect(menuLinks[0].getAttribute('href')).toBe('#menu');

    // 3 bước trạm tàu
    expect(screen.getByText(/CHỌN SIZE/i)).toBeDefined();
    expect(screen.getByText(/THẢ NHÂN/i)).toBeDefined();
    expect(screen.getByText(/THÊM SỐT/i)).toBeDefined();
  });

  it('render MenuSection và chuyển đổi danh mục món mượt mà', () => {
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

    // Mặc định tab "Món nên thử"
    expect(screen.getByText('Burger bò phô mai')).toBeDefined();

    // Chuyển sang Burger
    const burgerTab = screen.getByRole('button', { name: /^Burger$/i });
    fireEvent.click(burgerTab);
    expect(screen.getByText('Burger gà phô mai')).toBeDefined();

    // Chuyển sang Gà & khoai
    const chickenTab = screen.getByRole('button', { name: /Gà & khoai/i });
    fireEvent.click(chickenTab);
    expect(screen.getByText('Gà tender 1 sốt')).toBeDefined();
    expect(screen.getByText('Khoai truyền thống')).toBeDefined();

    // Chuyển sang Mì Ý
    const pastaTab = screen.getByRole('button', { name: /Mì Ý/i });
    fireEvent.click(pastaTab);
    expect(screen.getByText('Mì Ý kem Tomyum')).toBeDefined();

    // Bấm xem menu gốc
    const viewOriginalBtn = screen.getByRole('button', { name: /Xem menu gốc/i });
    fireEvent.click(viewOriginalBtn);
    expect(handleViewOriginal).toHaveBeenCalledTimes(1);
  });

  it('render ProductCard độc lập với hình ảnh, tag, giá VND và nút chọn', () => {
    const handleSelect = vi.fn();
    const item: MenuItem = {
      id: 'burger-beef',
      name: 'Burger bò phô mai',
      price: 59000,
      category: 'burger',
      image: 'burger.jpg',
      tag: 'CHEESY CLASSIC',
      desc: 'Bò & phô mai — bộ đôi hợp gu.',
    };

    render(<ProductCard item={item} onSelect={handleSelect} />);

    expect(screen.getByText('Burger bò phô mai')).toBeDefined();
    expect(screen.getByText('CHEESY CLASSIC')).toBeDefined();
    expect(screen.getByText(/59\.000/)).toBeDefined();

    const addBtn = screen.getByRole('button', { name: /Chọn Burger bò phô mai/i });
    fireEvent.click(addBtn);
    expect(handleSelect).toHaveBeenCalledWith(item);
  });
});
