import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { Hero } from '../Hero';
import { MenuSection } from '../MenuSection';
import { TacosBuilder } from '../TacosBuilder';
import { SpaceSection } from '../SpaceSection';
import { Footer } from '../Footer';
import menuData from '@/data/menu.json';
import type { MenuItem } from '@/types';

describe('Phase 07: Brand Personality & Editorial Polish', () => {
  beforeEach(() => {
    localStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('loại bỏ hoàn toàn hệ thống đánh số PLATFORM 01, 02, 03 khỏi toàn bộ giao diện', () => {
    const { container } = render(<App />);

    // Kiểm tra không còn bất kỳ chữ PLATFORM nào xuất hiện
    expect(container.textContent).not.toContain('PLATFORM 01');
    expect(container.textContent).not.toContain('PLATFORM 02');
    expect(container.textContent).not.toContain('PLATFORM 03');
    expect(container.textContent).not.toContain('PLATFORM 00');
  });

  it('xác thực các nhãn editorial eyebrow chuẩn hóa với dấu chấm burgundy tinh tế', () => {
    // 1. Hero Eyebrow
    const { container: heroContainer } = render(<Hero />);
    expect(heroContainer.textContent).toContain('GA CHEESIE / TRẠM ĐỒ NGON');

    // 2. Menu Eyebrow
    const { container: menuContainer } = render(
      <MenuSection
        menuItems={menuData.items as MenuItem[]}
        onSelectDish={vi.fn()}
        onViewOriginalMenu={vi.fn()}
      />
    );
    expect(menuContainer.textContent).toContain('MENU NHÀ CHEESIE');

    // 3. Tacos Builder Eyebrow
    const { container: builderContainer } = render(
      <TacosBuilder
        size="M"
        selected={{}}
        note=""
        folded={false}
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
    expect(builderContainer.textContent).toContain('TỰ CUỐN TACOS');

    // 4. Restaurant Eyebrow
    const { container: spaceContainer } = render(
      <SpaceSection onOpenRestaurantInfo={vi.fn()} />
    );
    expect(spaceContainer.textContent).toContain('GHÉ CHEESIE');
  });

  it('cập nhật chuẩn xác bản dịch và câu chữ tiếng Việt tự nhiên, ấm áp theo phê duyệt', () => {
    // 1. Hero copy
    render(<Hero />);
    expect(screen.getByText(/Đói rồi\?/i)).toBeDefined();
    expect(
      screen.getByText(
        /Tacos đầy nhân, burger đậm vị, gà giòn rụm\. Thích món nào cứ chọn, còn chiếc tacos đúng gu thì bạn tự tay quyết định\./i
      )
    ).toBeDefined();

    // 2. Menu copy & CTA
    render(
      <MenuSection
        menuItems={menuData.items as MenuItem[]}
        onSelectDish={vi.fn()}
        onViewOriginalMenu={vi.fn()}
      />
    );
    expect(screen.getByText(/Mỗi cơn đói\./i)).toBeDefined();
    expect(screen.getByText(/Một món đúng gu\./i)).toBeDefined();
    expect(
      screen.getByText(/Tacos, burger, gà giòn, mì Ý… Món nào hợp gu bạn hôm nay\?/i)
    ).toBeDefined();
    expect(
      screen.getByText(/Muốn tacos đúng gu\? Tự cuốn một chiếc nhé ↗/i)
    ).toBeDefined();

    // 3. Tacos Builder copy
    render(
      <TacosBuilder
        size="M"
        selected={{}}
        note=""
        folded={false}
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
    expect(screen.getByText(/Chiếc tacos này,/i)).toBeDefined();
    expect(screen.getByText(/bạn làm chủ\./i)).toBeDefined();
    expect(
      screen.getByText(/Chọn size, chọn nhân, thêm sốt\./i)
    ).toBeDefined();
    expect(
      screen.getByText(/Chiếc tacos ngon nhất là chiếc đúng ý bạn\./i)
    ).toBeDefined();

    // 4. Space Section copy
    render(<SpaceSection onOpenRestaurantInfo={vi.fn()} />);
    expect(screen.getByText(/Một trạm dừng,/i)).toBeDefined();
    expect(screen.getByText(/đủ món ngon\./i)).toBeDefined();

    // 5. Footer copy
    render(<Footer onViewOriginalMenu={vi.fn()} />);
    expect(screen.getByText(/Design by Daniel/i)).toBeDefined();
  });
});
