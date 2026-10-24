import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../../App';
import restaurantData from '../../data/restaurant.json';

describe('Cheesie Station Full User Flow', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('thực hiện toàn bộ luồng: menu -> builder M (Heo + Bò + BBQ) -> giỏ hàng -> chỉnh số lượng -> nội dung đơn & kênh đặt món', async () => {
    render(<App />);

    // 1. Kiểm tra header và branding
    expect(screen.getByText(/CHEESIE STATION \/ TUYẾN ĐỒ NGON/i)).toBeDefined();
    expect(screen.getByText(/Đói rồi\?/i)).toBeDefined();

    // 2. Tự chọn tacos trong Tacos Express (mặc định size M)
    const sizeGroup = screen.getByRole('group', { name: /Chọn size tacos/i });
    const mSizeBtn = within(sizeGroup).getByRole('button', { name: /M/i });
    expect(mSizeBtn).toBeDefined();

    // Thêm nhân Heo
    const addPorkBtn = screen.getByRole('button', { name: /Thêm Heo/i });
    fireEvent.click(addPorkBtn);

    // Thêm nhân Bò
    const addBeefBtn = screen.getByRole('button', { name: /Thêm Bò/i });
    fireEvent.click(addBeefBtn);

    // Chuyển sang tab sốt
    const sauceTab = screen.getByRole('tab', { name: /03 \/ Nước sốt/i });
    fireEvent.click(sauceTab);

    // Thêm sốt BBQ
    const addBbqBtn = screen.getByRole('button', { name: /Thêm BBQ/i });
    fireEvent.click(addBbqBtn);

    // Kiểm tra trạng thái sẵn sàng
    expect(screen.getByText(/Đủ nhân & sốt rồi\. Cuốn thôi!/i)).toBeDefined();

    // Nhập ghi chú
    const noteInput = screen.getByLabelText(/Ghi chú cho chiếc tacos/i);
    fireEvent.change(noteInput, { target: { value: 'ít cay' } });

    // Bấm Thêm vào túi (giá 65.000đ)
    const addTacoBtn = screen.getByRole('button', { name: /Thêm vào túi ·/i });
    fireEvent.click(addTacoBtn);

    // Kiểm tra badge giỏ hàng
    const openBagBtn = screen.getByRole('button', { name: /Túi đồ ngon/i });
    expect(openBagBtn.textContent).toContain('1');

    // 3. Mở giỏ hàng
    fireEvent.click(openBagBtn);

    // Kiểm tra nội dung trong giỏ
    expect(screen.getByText(/Túi đồ ngon của bạn/i)).toBeDefined();
    expect(screen.getByText(/Tacos Pháp · size M/i)).toBeDefined();
    expect(screen.getByText(/Nhân: Heo, Bò\. Sốt: BBQ\. Đã gồm: Mozzarella\. Ghi chú: ít cay/i)).toBeDefined();

    // Tăng số lượng lên 2
    const plusQtyBtn = screen.getByRole('button', { name: /Thêm Tacos Pháp · size M/i });
    fireEvent.click(plusQtyBtn);

    // Kiểm tra tổng tạm tính: 65.000 x 2 = 130.000đ
    expect(screen.getAllByText(/130\.000/).length).toBeGreaterThanOrEqual(1);

    // 4. Mở kênh đặt món và xem nội dung đơn
    const reviewOrderBtn = screen.getByRole('button', { name: /Xem nội dung & chọn kênh đặt/i });
    fireEvent.click(reviewOrderBtn);

    // Kiểm tra màn hình bàn giao đơn
    expect(screen.getByText(/Chốt gu rồi,/i)).toBeDefined();
    const orderTextarea = screen.getByLabelText(/Nội dung đơn để sao chép/i) as HTMLTextAreaElement;
    expect(orderTextarea.value).toContain('Chào Cheesie, mình muốn đặt:');
    expect(orderTextarea.value).toContain('2 × Tacos Pháp · size M');
    expect(orderTextarea.value).toContain('Nhân: Heo, Bò. Sốt: BBQ. Đã gồm: Mozzarella. Ghi chú: ít cay');
    expect(orderTextarea.value).toContain('130.000');

    // Kiểm tra đúng link kênh đặt hàng từ restaurant.json
    const fbLink = screen.getByRole('link', { name: /Facebook/i });
    expect(fbLink.getAttribute('href')).toBe(restaurantData.links.facebook);

    const shopeeLink = screen.getByRole('link', { name: /ShopeeFood/i });
    expect(shopeeLink.getAttribute('href')).toBe(restaurantData.links.shopeeFood);

    const grabLink = screen.getByRole('link', { name: /GrabFood/i });
    expect(grabLink.getAttribute('href')).toBe(restaurantData.links.grabFood);
  });

  it('kích hoạt modal xác nhận khi giảm size vượt quá hạn mức nhân/sốt', () => {
    render(<App />);

    const sizeGroup = screen.getByRole('group', { name: /Chọn size tacos/i });

    // Chọn size L (cần 3 nhân, 2 sốt)
    const lSizeBtn = within(sizeGroup).getByRole('button', { name: /^L/i });
    fireEvent.click(lSizeBtn);

    // Thêm 3 nhân: Heo, Bò, Gà
    fireEvent.click(screen.getByRole('button', { name: /Thêm Heo/i }));
    fireEvent.click(screen.getByRole('button', { name: /Thêm Bò/i }));
    fireEvent.click(screen.getByRole('button', { name: /Thêm Gà/i }));

    // Đổi xuống size S (chỉ cho phép 1 nhân, 1 sốt)
    const sSizeBtn = within(sizeGroup).getByRole('button', { name: /^S/i });
    fireEvent.click(sSizeBtn);

    // Modal xác nhận đổi size phải hiện lên
    expect(screen.getByText(/Size nhỏ hơn,/i)).toBeDefined();
    expect(screen.getByText(/Size S chỉ gồm 1 phần nhân và 1 phần sốt/i)).toBeDefined();

    // Bấm Đổi sang S
    const confirmBtn = screen.getByRole('button', { name: /Đổi sang S/i });
    fireEvent.click(confirmBtn);

    // Size hiện tại chuyển thành S và đã reset nhân
    expect(screen.getByText(/Còn 1 phần nhân và 1 phần sốt để hoàn thành/i)).toBeDefined();
  });
});
