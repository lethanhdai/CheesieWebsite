# Ghi chú về prototype

## Bản gốc cần giữ

`prototype/` là bản HTML/CSS/JS độc lập, không phải ứng dụng đã có backend. Đường dẫn bản xem thử hiện tại là https://cheesie-tacos-and-burger.maplebean11.chatgpt.site (riêng tư, có thể yêu cầu đăng nhập). Dùng source và ảnh trong gói làm tham chiếu chính để không phụ thuộc quyền truy cập đường dẫn này.

Thứ tự CSS hiện tại: `fonts.css` → `style.css` → `station.css`. `station.css` là lớp thiết kế đỏ–bạc mới nhất. Khi chuyển sang components, hợp nhất thành design tokens và stylesheet gọn, không bỏ lớp này hoặc quay về giao diện cũ.

`app.js` dùng HTML string và DOM toàn cục để làm prototype nhanh. Không cần port nguyên xi; nên tách components, domain model và state. `model.js` chứa các quy tắc cơ bản nhưng không phải validator đủ chặt cho đầu vào không đáng tin.

## Những phần đã có

Menu lọc theo nhóm; chọn tacos size S–XXL; kéo thả HTML trên desktop; nút thêm/bớt; giới hạn không lặp nhân/sốt; tính giá; xem bánh cuốn; lưu giỏ trên trình duyệt; nội dung đơn để copy; link gian hàng; thông tin quán và ảnh menu gốc.

Đã kiểm tra tương tác chọn M (Heo + Bò + BBQ) = 65.000đ, giỏ và link đặt món; kéo phần bò vào bánh trên desktop; kiểm tra DOM các luồng, bộ quy tắc 5 size. Bản đỏ–bạc đã được xem trực tiếp ở desktop và màn hình rộng 390px. Các kiểm tra đó không thay thế kiểm thử của ứng dụng mới.

## Những việc cần làm trước khi dùng thật

- Hoàn thiện touch/pointer drag; prototype desktop drag không bảo đảm hoạt động giống nhau trên mọi điện thoại. Luôn giữ nút thêm/bớt.
- Không tin giá và công thức khôi phục từ localStorage. Dựng validator domain riêng cho loại thành phần, size, không lặp, giới hạn, topping và công thức hợp lệ.
- Quy tắc sauce thêm cần xem xét lại khi bỏ sốt chính hoặc đổi size. Validator phải phát hiện xung đột ngay cả khi state được nhập trực tiếp, không chỉ chặn ở nút bấm.
- Chính sách lặp topping trả phí chưa được quán xác nhận. Phân biệt với quy tắc nhân/sốt theo size đã chốt.
- Một số ảnh dùng đại diện cho cả nhóm món; pasta/đồ uống dùng emoji. Không dựng hình minh họa thành ảnh sản phẩm thật hoặc tự tạo khẳng định về món.
- Giỏ prototype chưa có luồng sửa một công thức sau khi đã thêm. Ứng dụng mới cần có nếu nằm trong phạm vi giai đoạn 1.
- Chưa có database, dashboard, API nhận đơn, thanh toán, thông báo tự động, tài khoản khách hoặc đồng bộ đơn với sàn. Đó là phạm vi phát triển riêng.
- Giờ mở cửa do chủ cung cấp; chưa có lịch ngày nghỉ/ngày lễ. Không tự kết luận quán đang mở theo ngày trong tuần.
- Quán cần duyệt giá, ảnh, nội dung và quy định món trước khi public. Không tạo testimonial, rating, khuyến mại hoặc chính sách thiếu căn cứ.

## Website tham khảo do Daniel cung cấp

- https://www.cravburgers.shop/ — tham khảo cách trình bày đồ ăn, bố cục và cảm giác sinh động; không sao chép thương hiệu hoặc nội dung.
- https://pizza-project-claude-design.vercel.app/ — tham khảo tương tác làm món trực quan; Cheesie dùng tacos Pháp và quy tắc size riêng.

## Tài nguyên

Ảnh/logo/menu do người dùng cung cấp trong Cheesie.rar. Dùng cho dự án của quán, không xem là ảnh stock được cấp quyền tái phân phối ngoài dự án này. Font Be Vietnam Pro đi kèm SIL OFL trong `prototype/assets/fonts/OFL.txt`. Giữ giấy phép khi chuyển font sang ứng dụng mới. Bộ font hiện tại là TTF, nên cân nhắc tối ưu thành WOFF2 với đủ glyph Việt, rồi kiểm tra trực quan.
