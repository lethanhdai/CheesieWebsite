# Cheesie Station — Website

Dự án website chính thức của **Cheesie - Tacos and burger** (102 Đ. Lê Lai, Ninh Kiều, Cần Thơ), được thiết kế theo chủ đề ga tàu điện Cheesie Station đỏ logo–xám bạc.

## Cấu trúc thư mục

- [`app/`](./app): Ứng dụng chính thức viết bằng **React 19 + TypeScript + Vite**, kiến trúc phân lớp, kiểm thực domain độc lập, giao diện responsive và tương tác Tacos Express trực quan.
- [`prototype/`](./prototype): Bản mẫu tĩnh gốc đỏ–bạc để đối chiếu giao diện và hành vi.
- [`data/`](./data): Dữ liệu thông tin quán (`restaurant.json`) và thực đơn (`menu.json`).
- [`references/`](./references): Ảnh chuẩn duyệt thiết kế (`approved-prototype.png`).
- [`SPEC.md`](./SPEC.md), [`PROTOTYPE_NOTES.md`](./PROTOTYPE_NOTES.md), [`START_HERE.md`](./START_HERE.md): Hồ sơ thiết kế và bàn giao ban đầu.

## Khởi động nhanh ứng dụng (`app/`)

```bash
cd app
npm install
npm run dev
```

### Chạy kiểm thử tự động
```bash
cd app
npm test
```

### Đóng gói Production & Xem thử
```bash
cd app
npm run build
npm run preview
```

Chi tiết tài liệu kiến trúc, bảng phân định quy tắc và lộ trình giai đoạn 2 xem tại [app/README.md](./app/README.md).
