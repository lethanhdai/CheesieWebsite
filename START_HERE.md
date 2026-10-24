# Cheesie — Bàn giao prototype cho Antigravity

Đây là bản prototype đỏ logo + xám bạc đã được Daniel Lee chấp nhận làm hướng thiết kế. Gói này dùng độc lập, không cần tài khoản Sites hoặc Codex.

## Bắt đầu

1. Giải nén toàn bộ gói vào một thư mục mới, ví dụ `D:\Project\Cheesie-Production`.
2. Mở thư mục đó trong Antigravity.
3. Đọc hoặc dán toàn bộ `ANTIGRAVITY_PROMPT.md` vào cuộc trò chuyện của agent.
4. Yêu cầu agent triển khai project vào `app/`, giữ nguyên `prototype/` để đối chiếu.

## Xem prototype trên máy

Cài Node.js nếu máy chưa có. Mở terminal tại thư mục chứa file này và chạy:

    node preview.cjs

Mở địa chỉ được in ra (mặc định `http://127.0.0.1:4173`). Nếu cổng đã dùng, có thể chạy:

    node preview.cjs 4175

Dừng bằng Ctrl+C. Đây chỉ là máy chủ xem prototype, không phải máy chủ nhận đơn hàng.

## Trong gói có gì?

- `prototype/`: toàn bộ HTML, CSS, JavaScript, ảnh, SVG dựng trong mã, font tiếng Việt và giấy phép font.
- `references/approved-prototype.png`: ảnh hướng thiết kế đỏ–bạc gần nhất.
- `SPEC.md`: thiết kế, nghiệp vụ, giá và tiêu chí nghiệm thu.
- `PROTOTYPE_NOTES.md`: những phần đã có, giới hạn và các giả định cần xác nhận.
- `data/restaurant.json`: thông tin quán, giờ mở cửa, các link đặt món.
- `data/menu.json`: menu, size, nhân, sốt, topping và giá ở dạng dữ liệu.
- `tests/prototype-model.test.cjs`: kiểm tra tham chiếu cho quy tắc tacos. Chạy bằng `node tests/prototype-model.test.cjs`.
- `ANTIGRAVITY_PROMPT.md`: prompt triển khai dự án thực tế.

## Lưu ý

Menu gốc nằm ở `prototype/assets/menu.jpg` và `combos.jpg`. Ảnh món có ảnh cắt từ menu, độ phân giải hạn chế; một số món dùng ảnh đại diện hoặc emoji. Thay bằng ảnh sản phẩm thật chất lượng cao trước khi ra mắt nếu quán có.

Prototype chỉ lưu túi món trong trình duyệt, tạo nội dung đơn để sao chép và mở các kênh bên ngoài. Nó không gửi đơn đến quán, không thu tiền và không đồng bộ giỏ hàng với ShopeeFood/GrabFood.

Không có khóa bí mật, thông tin đăng nhập, Git history hoặc cấu hình nhận diện Sites trong gói xuất này. Không upload file `.env` có giá trị thật vào Git khi phát triển tiếp.
