import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import { MenuSection } from '../MenuSection';
import { ProductCard } from '../ProductCard';
import menuData from '@/data/menu.json';
import type { MenuItem } from '@/types';

describe('Phase 06: International-Quality Visual & UX Polish', () => {
  beforeEach(() => {
    localStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('xác thực hệ thống artwork phân biệt chính xác ảnh thật và placeholder thương hiệu cho 22 món', () => {
    const items = menuData.items as MenuItem[];
    expect(items.length).toBe(22);

    // 1. Tacos Pháp sử dụng ảnh thật
    const tacoItem = items.find((i) => i.id === 'taco')!;
    const { container: tacoContainer } = render(
      <ProductCard item={tacoItem} onSelect={vi.fn()} />
    );
    const tacoImg = tacoContainer.querySelector('img');
    expect(tacoImg).not.toBeNull();
    expect(tacoImg?.getAttribute('src')).toBe('/assets/tacos.jpg');

    // 2. Burger bò phô mai sử dụng ảnh burger gốc
    const beefBurgerItem = items.find((i) => i.id === 'burger-beef')!;
    const { container: beefContainer } = render(
      <ProductCard item={beefBurgerItem} onSelect={vi.fn()} />
    );
    const beefImg = beefContainer.querySelector('img');
    expect(beefImg).not.toBeNull();
    expect(beefImg?.getAttribute('src')).toBe('/assets/burger.jpg');

    // 3. Burger gà phô mai (chưa có ảnh chụp thật riêng) sử dụng placeholder thương hiệu
    const chickenBurgerItem = items.find((i) => i.id === 'burger-chicken')!;
    const { container: cbContainer } = render(
      <ProductCard item={chickenBurgerItem} onSelect={vi.fn()} />
    );
    // Không dùng ảnh lặp lại burger.jpg
    expect(cbContainer.querySelector('img')).toBeNull();
    expect(cbContainer.textContent).toContain('GÀ GIÒN');
    expect(cbContainer.textContent).toContain('CHEESIE RECIPE');

    // 4. Mì Ý kem Tomyum sử dụng placeholder mì Ý với tag độc quyền
    const pastaItem = items.find((i) => i.id === 'pasta-tomyum')!;
    const { container: pastaContainer } = render(
      <ProductCard item={pastaItem} onSelect={vi.fn()} />
    );
    expect(pastaContainer.textContent).toContain('KEM TOMYUM');
    expect(pastaContainer.textContent).toContain('CHEESIE RECIPE');
  });

  it('menu grid loại bỏ hoàn toàn min-height cứng, co giãn tự nhiên theo số lượng món', () => {
    const items = menuData.items as MenuItem[];
    const { container } = render(
      <MenuSection
        menuItems={items}
        onSelectDish={vi.fn()}
        onViewOriginalMenu={vi.fn()}
      />
    );

    const grid = container.querySelector('#menu-grid');
    expect(grid).not.toBeNull();
    // Đảm bảo không chứa min-h-[280px] gây khoảng trống vô lý
    expect(grid?.className).not.toContain('min-h-[280px]');
    expect(grid?.className).toContain('min-h-0');
  });

  it('thanh cuộn ngang danh mục trên di động có affordance hiển thị chỉ dẫn', () => {
    const items = menuData.items as MenuItem[];
    const { container } = render(
      <MenuSection
        menuItems={items}
        onSelectDish={vi.fn()}
        onViewOriginalMenu={vi.fn()}
      />
    );

    const categoryTabs = container.querySelector('.category-tabs');
    expect(categoryTabs).not.toBeNull();
    expect(categoryTabs?.getAttribute('role')).toBe('group');
  });

  it('toàn bộ luồng đặt món minh bạch kênh tiếp nhận, không giả lập cổng thanh toán trực tiếp', async () => {
    render(<App />);

    // Thêm một món vào giỏ
    const addBurgerBtn = screen.getByRole('button', { name: /^Chọn Burger bò phô mai$/i });
    fireEvent.click(addBurgerBtn);

    // Mở modal chi tiết món và thêm
    const submitAddBtn = screen.getByRole('button', { name: /Thêm vào túi đồ ngon/i });
    fireEvent.click(submitAddBtn);

    // Mở túi đồ ngon
    const openBagBtn = screen.getByRole('button', { name: /Mở túi đồ ngon/i });
    fireEvent.click(openBagBtn);

    // Kiểm tra thông tin thanh toán minh bạch
    expect(
      screen.getByText(/Chưa gồm phí giao hàng/i)
    ).toBeDefined();

    // Chuyển sang bước handoff
    const handoffBtn = screen.getByRole('button', { name: /Xem nội dung & chọn kênh đặt/i });
    fireEvent.click(handoffBtn);

    // Xác nhận rõ thông điệp điều hướng kênh ngoài
    expect(
      screen.getByText(/Chưa có đơn nào được gửi từ website/i)
    ).toBeDefined();
    expect(screen.getByText('Facebook')).toBeDefined();
    expect(screen.getByText('ShopeeFood')).toBeDefined();
    expect(screen.getByText('GrabFood')).toBeDefined();
  });
});
