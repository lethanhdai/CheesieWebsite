# Prompt cho Antigravity — xây project Cheesie Station

Bạn là kỹ sư frontend kiêm product designer thực hiện dự án Cheesie cho Daniel Lee. Tôi đã có một prototype được chấp nhận về hướng thiết kế và nghiệp vụ. Hãy dùng nó làm nền để xây project thực tế, có cấu trúc, dễ bảo trì và có thể deploy. Tôi muốn bạn trực tiếp triển khai, không chỉ đưa kế hoạch hoặc tạo một mockup mới.

## Việc đầu tiên

Đọc `START_HERE.md`, `SPEC.md`, `PROTOTYPE_NOTES.md`, `data/restaurant.json`, `data/menu.json`, rồi kiểm tra toàn bộ `prototype/`. Chạy `node preview.cjs` và xem giao diện thật nếu môi trường hỗ trợ. Ảnh chuẩn tại `references/approved-prototype.png`.

Kiểm tra thư mục hiện có trước khi tạo project. Nếu đã có code ứng dụng thì đọc và đề xuất cách tiếp tục, không ghi đè. Nếu thư mục trống ngoài bộ bàn giao này, tạo ứng dụng mới trong `app/`; giữ nguyên `prototype/` làm đối chiếu.

## Định hướng sản phẩm và thiết kế

Cheesie - Tacos and burger là quán ăn thật tại Cần Thơ, mang chủ đề tàu điện / ga tàu. Hãy giữ hướng thiết kế mới nhất: đỏ logo #6a1b20, xám bạc #c7cdd1, nền #eef0f1, graphite #252c30; cửa sổ toa tàu, biển tuyến, trạm dừng và bảng Tacos Express. Tham chiếu cả ảnh quán thật trong assets.

Không tự thiết kế lại thành website nhà hàng đại trà, không quay về màu kem-vàng chủ đạo, không biến thành portfolio. Cải thiện độ chỉn chu và khả năng dùng trên điện thoại trong cùng hướng thiết kế. Tái sử dụng logo và ảnh thật, giữ rõ ảnh nào là đại diện. Font tiếng Việt phải thống nhất: Be Vietnam Pro cục bộ, đủ dấu, không trộn serif thiếu glyph hoặc ép letter-spacing làm các dấu/chữ dính nhau. Giữ giấy phép font.

## Phạm vi thực hiện ngay: giai đoạn 1

Xây frontend có thể triển khai thực tế cho giới thiệu quán, menu và tạo công thức tacos, chuyển khách sang các kênh đặt món hiện có. Nếu cần chọn stack, mặc định React + TypeScript + Vite, component có thể tái sử dụng và CSS/design tokens rõ ràng. Có thể dùng giải pháp tương đương nếu có lý do cụ thể. Kiểm tra tài liệu chính thức trước khi cài dependency, dùng phiên bản tương thích, không thêm thư viện lớn khi không cần.

Tách dữ liệu quán, menu và các quy tắc khỏi UI. Tách domain validation/tính giá khỏi components và animation. Hợp nhất stylesheet khi chuyển đổi; nhớ rằng `station.css` đang chứa giao diện đỏ–bạc mới nhất.

Các phần phải có:

1. Trang chủ, menu phân nhóm, phần giới thiệu không gian, địa chỉ/giờ mở cửa/điện thoại/email/bản đồ và kênh đặt món theo dữ liệu đã cung cấp.
2. Tacos builder là điểm nhấn: chiếc bánh mở, kéo nhân/sốt vào bánh có hiệu ứng hợp lý, nút +/− cho touch/keyboard, phản hồi phần còn thiếu và giá tức thời. Chọn size, topping thêm, preview bánh đã cuốn, mở lại để chỉnh và reset có xác nhận.
3. Giỏ món có công thức/ghi chú, thêm/bớt số lượng, xóa và sửa công thức. Hai công thức khác nhau không được gộp nhầm. Khôi phục giỏ có kiểm tra schema và giá hiện tại, xử lý dữ liệu cũ/hỏng.
4. Xuất nội dung đơn để sao chép, mở Facebook của quán để khách tự gửi. Mở đúng ShopeeFood/GrabFood. Phân biệt rõ “đã thêm vào túi”, “đã sao chép” và “đơn đã gửi”; không tạo thông báo nhận đơn giả.

## Quy tắc tacos bắt buộc

S 45.000đ = 1 nhân + 1 sốt.
M 65.000đ = 2 nhân + 1 sốt, đã gồm Mozzarella.
L 75.000đ = 3 nhân + 2 sốt, đã gồm Mozzarella.
XL 95.000đ = 4 nhân + 3 sốt, đã gồm Mozzarella + trứng.
XXL 115.000đ = 5 nhân + 4 sốt, đã gồm Mozzarella + trứng + bacon.

5 nhân và 4 sốt có trong `data/menu.json`. Mỗi loại nhân/sốt theo size chỉ chọn một lần. Cần đúng đủ số loại mới thêm tacos vào giỏ. Ví dụ M với Heo + Bò + BBQ là 65.000đ, còn M với Bò + Bò không hợp lệ. Không âm thầm xóa lựa chọn khi giảm size. Thành phần miễn phí của size phải được tách khỏi topping trả phí để không thu tiền hai lần.

Topping thêm: Heo/Bò/Gà/Bacon/Mozzarella 15k; Cheddar 10k; trứng 5k; sốt thêm 5k. Đọc các mục chưa xác nhận trong SPEC và NOTES. Chính sách lặp và số lượng topping trả phí chưa phải quy định đã chốt. Tách chúng thành cấu hình, ghi rõ giả định dùng tạm; không lấy logic lỏng của prototype làm validator production. Không tự bịa quy tắc mới và không để điểm chưa chốt cản việc hoàn thiện những phần độc lập.

Dùng VND số nguyên. Kiểm tra trạng thái hợp lệ tại tầng domain, kể cả dữ liệu nhập trực tiếp hoặc khôi phục từ trình duyệt. Nếu sau này có backend nhận đơn, backend phải tính và xác thực lại giá/công thức; không tin tổng tiền từ client.

## Giới hạn tích hợp

Không có API hoặc quyền tích hợp giỏ hàng ShopeeFood/GrabFood được cung cấp. Không tuyên bố đồng bộ công thức vào hai ứng dụng đó. Không tự gửi tin nhắn Facebook hoặc email. Không tự bổ sung thanh toán online, tài khoản khách, dashboard vận hành hay hệ thống shipper ở giai đoạn này.

Nếu muốn nhận đơn trực tiếp, hãy đề xuất giai đoạn 2 riêng: quy trình đơn hàng, backend/database, giao diện chủ quán, xác thực, trạng thái đơn, thông báo, bảo vệ endpoint và chống spam. Chỉ triển khai phần có tác động bên ngoài khi tôi chọn phạm vi và cung cấp cấu hình cần thiết. Không đặt secret vào frontend; chỉ tạo `.env.example` với tên biến nếu thật sự có nhu cầu.

## Cách triển khai và nghiệm thu

Nêu ngắn gọn những gì bạn hiểu và kiến trúc sẽ dùng, rồi triển khai một lát cắt hoàn chỉnh: menu → builder → giỏ → nội dung đơn/kênh đặt món. Tiếp tục hoàn thiện toàn bộ giai đoạn 1. Hỏi tôi chỉ khi thiếu thông tin quyết định; các lựa chọn triển khai thông thường hãy tự xử lý và ghi lại.

Kiểm tra responsive ở 360/390/768/1440px, chữ tiếng Việt, không tràn ngang, keyboard/focus/dialog/Esc, tương phản và reduced motion. Có nút dự phòng cho drag trên điện thoại. Không thêm hiệu ứng làm chậm việc chọn món hoặc che thông tin.

Viết kiểm thử cho quy tắc 5 size, không lặp, phần đã gồm, topping, đổi size, trạng thái không hợp lệ, khôi phục giỏ và tính tổng theo số lượng. Tham khảo `tests/prototype-model.test.cjs`, nhưng đừng chỉ sao chép test để khớp code. Kiểm tra luồng người dùng hoàn chỉnh bằng browser/E2E nếu môi trường hỗ trợ, không gửi đơn thật trong test. Chạy build production và sửa lỗi trước khi bàn giao.

Bàn giao mã nguồn trong `app/`, README chạy local/build/preview và phương án deploy, kiểm thử đã chạy và kết quả, các giới hạn còn lại và danh sách thông tin quán cần xác nhận trước khi public. Mở preview để tôi xem. Chuẩn bị bản deploy nhưng không tự công khai website hoặc mua dịch vụ/tên miền khi tôi chưa yêu cầu.
