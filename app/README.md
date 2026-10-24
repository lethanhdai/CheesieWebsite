# Cheesie Station — Production Frontend Application

Dự án frontend chính thức của **Cheesie - Tacos and burger** (Cheesie Station, 102 Đ. Lê Lai, Ninh Kiều, Cần Thơ), được chuyển đổi và nâng cấp từ bản prototype đỏ logo–xám bạc đã được phê duyệt.

Ứng dụng được xây dựng hoàn chỉnh với React 19, TypeScript và Vite, tuân thủ nguyên tắc thiết kế ga tàu điện (red line / silver carriage), dữ liệu nhà hàng thật và font tiếng Việt Be Vietnam Pro cục bộ (SIL OFL).

---

## 1. Hướng dẫn chạy và triển khai

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18+ (khuyên dùng Node 20 hoặc 24 LTS)
- **NPM**: Phiên bản 9+

### Cài đặt và Chạy Development
```bash
# Di chuyển vào thư mục ứng dụng
cd app

# Cài đặt thư viện phụ thuộc
npm install

# Khởi động máy chủ dev (HMR)
npm run dev
```
Trình duyệt mở tại: `http://localhost:5173`

### Chạy Kiểm thử (Unit & Integration Tests)
Bộ kiểm thử sử dụng **Vitest** với môi trường JSDOM, kiểm tra toàn bộ domain rules, schema validation, tính giá, bảo vệ chống gian lận dữ liệu và luồng người dùng:
```bash
npm test
```

### Build Production & Preview
```bash
# Biên dịch TypeScript và đóng gói tĩnh
npm run build

# Xem thử bản build production trên máy cục bộ
npm run preview
```
Bản xuất tĩnh nằm trong thư mục `app/dist/`.

---

## 2. Kiến trúc ứng dụng (`app/src/`)

```
app/src/
├── domain/               # Tầng nghiệp vụ độc lập không phụ thuộc UI
│   ├── rules.ts          # Định nghĩa & phân định quy tắc đã chốt vs giả định
│   ├── tacos.ts          # Quy tắc 5 size, tính giá VND, kiểm thực quota, đổi size
│   ├── cart.ts           # Validate giỏ hàng, chống sửa giá client, format đơn
│   └── __tests__/        # Bộ test domain (13 unit tests)
├── data/                 # Nguồn dữ liệu tham chiếu
│   ├── restaurant.json   # Thông tin quán, giờ mở cửa, link fanpage & gian hàng
│   └── menu.json         # Danh mục món, hình ảnh/emoji, giá niêm yết
├── components/           # Các component React tái sử dụng
│   ├── Header.tsx        # Thanh điều hướng trạm ga tàu, logo, giỏ đồ ngon
│   ├── Topline.tsx       # Tuyến đồ ngon, giờ mở cửa, địa chỉ
│   ├── Hero.tsx          # Cửa sổ toa tàu, ảnh feast.jpg, stamp tròn
│   ├── Ticker.tsx        # Dải marquee chạy chữ ga tàu
│   ├── MenuSection.tsx   # Danh mục phân nhóm, thẻ món, mở modal chi tiết
│   ├── TacosBuilder.tsx  # Điểm nhấn Tacos Express: bảng điện tử, tương tác bánh
│   ├── TortillaSvg.tsx   # Đồ họa SVG bánh mở, nhân, topping và sốt
│   ├── SpaceSection.tsx  # Giới thiệu không gian thật quán Cheesie
│   ├── LastCall.tsx      # Lời chào & nút chọn kênh đặt món
│   ├── Footer.tsx        # Chân trang, bản quyền, link xem menu gốc
│   ├── CartModal.tsx     # Túi đồ ngon, tăng giảm số lượng, sửa công thức
│   ├── OrderHandoffModal.tsx # Tạo nội dung đơn, copy clipboard, link gian hàng
│   ├── DishDetailModal.tsx   # Modal chọn số lượng và ghi chú cho món menu
│   ├── ChangeSizeConfirmModal.tsx # Xác nhận đổi sang size nhỏ hơn
│   ├── ResetConfirmModal.tsx      # Xác nhận làm lại chiếc tacos từ bánh trống
│   ├── Toast.tsx         # Thông báo nổi tức thời
│   └── __tests__/        # Test luồng tích hợp hoàn chỉnh (AppFlow.test.tsx)
├── styles/
│   ├── fonts.css         # Khai báo font Be Vietnam Pro (400 - 900)
│   └── station.css       # Toàn bộ design tokens, railway layout, animation
├── types/                # TypeScript interfaces và types
└── App.tsx               # Root component điều phối state & modal
```

---

## 3. Phân định quy tắc nghiệp vụ: Đã xác nhận vs Giả định

### A. Các quy tắc đã xác nhận (Confirmed Rules)
1. **5 Size & Giá niêm yết**:
   - **S** (45.000đ): 1 phần nhân + 1 phần sốt.
   - **M** (65.000đ): 2 phần nhân + 1 phần sốt; đã gồm phô mai Mozzarella.
   - **L** (75.000đ): 3 phần nhân + 2 phần sốt; đã gồm phô mai Mozzarella.
   - **XL** (95.000đ): 4 phần nhân + 3 phần sốt; đã gồm Mozzarella + Trứng.
   - **XXL** (115.000đ): 5 phần nhân + 4 phần sốt; đã gồm Mozzarella + Trứng + Bacon.
2. **Quy tắc không chọn trùng nhân/sốt**:
   - Trong định mức đi kèm của size, mỗi loại nhân và mỗi loại sốt chỉ được chọn tối đa một lần (ví dụ: size M chọn Heo + Bò là hợp lệ; chọn Bò + Bò là không hợp lệ).
3. **Điều kiện hoàn thành (Ready State)**:
   - Phải chọn đúng và đủ số lượng nhân và sốt theo quy định của size trước khi thêm vào giỏ.
4. **Đổi size an toàn**:
   - Khi giảm size mà số lượng nhân/sốt hiện tại vượt quá định mức size mới, ứng dụng luôn hiển thị modal xác nhận chứ không âm thầm xóa của người dùng.
5. **Thành phần miễn phí theo size**:
   - Mozzarella, Trứng, Bacon đi kèm theo size được tách bạch rõ trong chi tiết và không bị tính tiền hai lần.
6. **Tiền tệ**:
   - Toàn bộ tính toán sử dụng số nguyên VND (`Math.round`), không sử dụng số thập phân.

### B. Các giả định còn lại cần chủ quán duyệt (Unconfirmed Assumptions)
| Hạng mục | Trạng thái hiện tại | Cần quán duyệt |
|---|---|---|
| **Định mức Topping thêm** | Tạm giới hạn tối đa 1 phần mỗi loại topping trong bản thử. | Khách có được gọi 2-3 phần phô mai/thịt thêm không? |
| **Trùng nhân chính với topping thêm** | Cho phép gọi Heo/Bò/Gà thêm độc lập với nhân theo size. | Có hạn chế lặp nhân giữa nhân size và topping trả phí không? |
| **Gọi thêm thành phần đã có trong size** | Cho phép mua thêm Mozzarella/Trứng/Bacon trả phí dù size đã gồm. | Quán có đồng ý cho khách mua thêm các thành phần này không? |
| **Sốt thêm** | Chỉ mở sau khi đã chọn đủ sốt theo size; không chọn vị trùng sốt chính. | Có cho phép gọi sốt thêm cùng vị với sốt chính không? |
| **Lịch ngày nghỉ / lễ** | Hiện chỉ hiển thị khung giờ 9:30–22:30. | Cần danh sách ngày nghỉ/lễ chính xác nếu có. |

---

## 4. Giới hạn tích hợp & Đề xuất Giai đoạn 2

### Giới hạn giai đoạn 1
- **Không gửi đơn ngầm**: Ứng dụng tạo nội dung đơn hàng được chuẩn hóa để khách sao chép và tự gửi qua Facebook của quán.
- **Không tự đồng bộ giỏ hàng ShopeeFood / GrabFood**: Các sàn không cung cấp public cart-injection API cho bên thứ 3. Ứng dụng dẫn link trực tiếp tới gian hàng chính xác của quán tại Cần Thơ.
- **Không thanh toán online trực tiếp**: Tránh rủi ro tài chính khi quy trình vận hành và kiểm tra tồn kho của quán chưa được thiết lập.

### Đề xuất Giai đoạn 2 (Đặt trực tiếp & Dashboard vận hành)
Nếu Daniel Lee và chủ quán muốn tiến tới nhận đơn trực tiếp trên website:
1. **Hệ thống Backend & Database**: Node.js/Go backend, PostgreSQL lưu đơn hàng, lịch sử, trạng thái (Chờ xác nhận → Đang chuẩn bị → Đang giao → Hoàn thành).
2. **Dashboard Chủ Quán (Merchant App)**: Giao diện riêng cho thu ngân/bếp với chuông báo âm thanh khi có đơn mới, nút nhận đơn/từ chối, cập nhật tình trạng hết nguyên liệu theo thời gian thực.
3. **Bảo mật & Chống Spam**: Rate limiting theo IP/Device, mã OTP xác thực số điện thoại khách hàng qua Zalo ZNS / SMS trước khi gửi đơn thật.
4. **Cổng thanh toán**: Tích hợp mã VietQR động tự điền số tiền và mã đơn hàng (không mất phí cổng) hoặc PayOS / MoMo.

---

## 5. Phương án Deploy Production

Vì ứng dụng được build thành tài nguyên tĩnh hoàn chỉnh (`app/dist/`), có thể deploy nhanh chóng và miễn phí trên:
- **Cloudflare Pages / Vercel / Netlify**: Kéo thả thư mục `app/dist/` hoặc liên kết repository Git với lệnh build `cd app && npm run build`, publish directory `app/dist`.
- **Nginx Web Server**: Đặt nội dung `app/dist/` vào thư mục webroot (ví dụ `/var/www/cheesie`) kèm cấu hình fallback `try_files $uri $uri/ /index.html;`.
