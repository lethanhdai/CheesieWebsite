# Specification — Cheesie Station

## 1. Mục tiêu và phạm vi

Website giới thiệu quán Cheesie, trình bày menu và giúp khách tạo công thức tacos trực quan trước khi đặt qua Facebook, ShopeeFood hoặc GrabFood. Chủ dự án: Daniel Lee, làm tặng người chị đang vận hành quán.

Giai đoạn 1: xây một frontend có cấu trúc, có thể triển khai thực tế, giữ hướng prototype. Không cần đăng ký tài khoản khách, thu tiền online, hệ thống tài xế hoặc marketplace nhiều quán. Đặt trực tiếp với backend và dashboard vận hành là giai đoạn sau, cần chủ quán duyệt quy trình.

## 2. Hướng thiết kế đã chốt

- Chủ đề: ga tàu / tàu điện, lấy cảm hứng từ ảnh không gian thật của Cheesie Station.
- Đỏ logo `#6a1b20`, xám bạc `#c7cdd1`, nền sáng `#eef0f1`, graphite `#252c30`.
- Khung ảnh như cửa sổ toa tàu; viền kim loại tiết chế; số tuyến, trạm, biển chỉ dẫn; bảng điện tử Tacos Express.
- Không quay về hướng bảo tàng Daniel Lee, tông kem-vàng chủ đạo hoặc font serif trang trí ở tiêu đề tiếng Việt.
- Be Vietnam Pro được lưu kèm tại chỗ; dùng thống nhất cho tiếng Việt. Logo gốc là ảnh riêng, không tái tạo logo bằng font body.
- Giữ cấu trúc chính: hero → menu → tacos builder → không gian/thông tin quán → kênh đặt món.
- Mobile ưu tiên, nút dễ chạm; keyboard có thể thao tác toàn bộ builder mà không cần kéo thả.

## 3. Dữ liệu quán

Nguồn cấu hình: `data/restaurant.json`. Địa chỉ 102 Đ. Lê Lai, Ninh Kiều, Cần Thơ. Giờ 9:30–22:30. Điện thoại 078 878 6283. Email cheesieburgersandtacos@gmail.com. Link Facebook / ShopeeFood / GrabFood phải giữ nguyên như trong dữ liệu, không dùng link tìm kiếm thay cho gian hàng.

Không tự suy luận ngày nghỉ, giờ giao hàng, phí ship, ưu đãi, đánh giá, thời gian làm món hoặc chính sách dinh dưỡng.

## 4. Quy tắc tacos đã xác nhận

| Size | Giá VND | Số phần nhân | Số phần sốt | Thành phần đã gồm theo menu |
|---|---:|---:|---:|---|
| S | 45.000 | 1 | 1 | Không ghi thêm |
| M | 65.000 | 2 | 1 | Mozzarella |
| L | 75.000 | 3 | 2 | Mozzarella |
| XL | 95.000 | 4 | 3 | Mozzarella + trứng |
| XXL | 115.000 | 5 | 4 | Mozzarella + trứng + bacon |

Nhân: Heo, Bò, Gà, Xúc xích phô mai, Xúc xích ngon (giữ tên theo menu, có thể đổi nhãn nếu quán xác nhận).

Sốt tacos: Tacos, BBQ, Pesto, Andalouse. Đây là danh sách riêng, không trộn với sốt gà tender.

Mỗi loại nhân và mỗi loại sốt trong phần chọn theo size chỉ được chọn một lần. Phải chọn đúng đủ số phần trước khi thêm tacos vào giỏ. Ví dụ M chọn Heo + Bò + BBQ hợp lệ; M chọn Bò + Bò không hợp lệ. XXL cần đủ cả 5 loại nhân và 4 loại sốt.

Giảm size khi lựa chọn vượt giới hạn phải hỏi trước; không âm thầm xóa. Topping miễn phí đi theo size được cập nhật rõ, không tính tiền hai lần.

## 5. Topping tính thêm

Heo/Bò/Gà/Bacon/Mozzarella: 15.000đ mỗi phần. Cheddar: 10.000đ. Trứng: 5.000đ. Sốt thêm: 5.000đ. Tham khảo dữ liệu và ảnh menu gốc.

Chưa xác nhận: số phần tối đa cho topping thêm, việc lặp lại nhân đã có dưới dạng topping trả tiền, gọi thêm phô mai/trứng/bacon vốn đã gồm theo size, việc gọi sốt thêm cùng vị. Prototype có một số giới hạn thử nghiệm; không xem đó là quy định đã chốt của quán. Tách cấu hình và ghi rõ các điểm này trong bàn giao.

## 6. Menu còn lại

Nguồn đã chép: `data/menu.json`. Burger bò phô mai 59k, gà phô mai 55k; bản thêm bacon tương ứng 65k và 60k. Gà tender 6 viên/1 sốt 55k, 9 viên/2 sốt 60k, 12 viên/3 sốt 70k. Khoai truyền thống 39k, khoai bacon 49k. Mì Ý kem Tomyum 60k, cua phô mai 70k, bò bằm tiêu đen 60k. Pepsi/Pepsi chanh/7up 15k; nước suối 12k.

Combo có trong ảnh `prototype/assets/combos.jpg`; prototype chỉ hiển thị menu ảnh, chưa cấu hình combo trong giỏ. Có thể bổ sung sau khi đối chiếu chính xác thành phần và lựa chọn tacos trong combo. Không tự coi combo là đã triển khai đầy đủ.

## 7. Tương tác cần giữ và hoàn thiện

- Chọn size; kéo nhân/sốt vào bánh; có nút +/− thay thế trên mobile và bàn phím.
- Nhân xuất hiện trực quan, sốt hiển thị trên bánh; cập nhật số phần còn thiếu và giá ngay.
- Xem trước bánh cuốn; mở lại để chỉnh sửa; làm lại có xác nhận nếu đã chọn.
- Thành phần đi theo size hiển thị riêng; không để tooltip/animation che nút.
- Giỏ lưu các công thức khác nhau thành các dòng riêng; chỉ gộp món có cùng công thức và ghi chú. Điều chỉnh số lượng/xóa/sửa món.
- Tổng tiền = giá size + topping thêm, nhân với số lượng. VND dạng số nguyên, không dùng số thập phân để tính tiền.
- Khôi phục giỏ từ trình duyệt phải kiểm tra schema, đối chiếu giá hiện tại và xử lý món đã ngừng bán. Không tin giá lưu trong localStorage.
- Tạo nội dung đơn, copy được, fallback khi clipboard bị chặn; mở Facebook của quán để khách tự gửi. Không báo đơn thành công khi khách chỉ bấm copy hoặc mở link.
- Mở đúng ShopeeFood/GrabFood. Không tuyên bố công thức tự đồng bộ qua các nền tảng.

## 8. Tiêu chí nghiệm thu

1. Build production thành công, README có bước chạy/build/preview/deploy rõ ràng.
2. Giao diện bám prototype, font Việt không trộn nét, không mất dấu và không cắt dấu.
3. Không tràn ngang ở 360, 390, 768 và 1440px; menu và builder thao tác được bằng chuột, touch và bàn phím.
4. Quy tắc 5 size, không chọn trùng, giới hạn sốt và tính topping được kiểm thử độc lập; kiểm tra cả dữ liệu giả mạo/không hợp lệ.
5. Có kiểm tra luồng chọn tacos → giỏ → chỉnh số lượng → nội dung đơn → đúng link đặt món; không gửi đơn thật trong test.
6. Ảnh có alt, các control có tên truy cập, dialog quản lý focus và Esc; tôn trọng reduced motion.
7. Thông tin quán, menu và giá không rải rác trong UI; không có khóa bí mật trong frontend hoặc Git.
8. Giữ rõ phạm vi nhận đơn qua kênh ngoài; những phần cần quán xác nhận được liệt kê, không âm thầm tự quyết.
