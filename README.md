# bao_dan_tri

## Chạy local dev

- Chạy `npm run dev`
- Mở `http://localhost:3210`
- Đăng nhập admin bằng `admin / admin`
- Sau khi đăng nhập sẽ hiện nút `Đăng bài`

## Ghi chú

- Luồng đăng nhập và upload chỉ hiện khi trang đang chạy qua local dev server.
- Bản giao diện tĩnh/public sẽ tự ẩn toàn bộ control admin.
- Bài viết mới sẽ được lưu trực tiếp vào dự án:
  - File gốc: `uploads/`
  - Bài JSON lưu trữ: `data/articles/`
  - Bài headline mới nhất: `data/latest-article.json`
