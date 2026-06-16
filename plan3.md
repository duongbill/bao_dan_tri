# KẾ HOẠCH TRIỂN KHAI XÂY DỰNG TRANG CON CHI TIẾT BÀI BÁO (ARTICLE DETAIL)

Kế hoạch này tập trung vào việc phân rã cấu trúc giao diện trang chi tiết bài viết dựa trên layout thực tế của `dantri.com.vn` và định hình các khối thành phần (Component-based Layout) bằng HTML/CSS tĩnh.

---

## 📌 Khởi Tạo Cấu Trúc File (Setup)
- [ ] Tạo file giao diện mới: `detail.html` (Dùng chung file `css/style.css` với trang chủ để tái sử dụng Header/Footer, tránh viết lặp code).
- [ ] Đảm bảo tính nhất quán của hệ thống mã màu (`:root`) và font chữ hệ thống đã định nghĩa ở trang chủ.

---

## 🧱 Phần 1: Phân Rã & Phát Triển Layout Thân Trang (Main Content)

Trang con sử dụng bố cục **2 cột lệch**: Cột trái chứa nội dung bài viết và các công cụ tương tác (Chiếm khoảng 70% chiều rộng), Cột phải là danh sách tin đọc nhiều liên quan (Chiếm khoảng 30%).

### 1. Khung Điều Hướng Phụ & Tiêu Đề Bài Viết (Breadcrumb & Header Article)
- [ ] **Breadcrumb (Thư mục con):** * Hiển thị danh mục cha (Ví dụ: "Thời tiết") kèm thời gian xuất bản ở bên phải (`Thứ ba, 16/06/2026 - 16:02`). Căn chỉnh bằng Flexbox.
- [ ] **Main Title (`<h1>`):** * Định dạng font chữ cỡ lớn (`font-size: 32px` - `36px`), in đậm, khoảng cách dòng thoáng (`line-height: 1.4`).
- [ ] **Author Block (Thông tin tác giả):**
  * Dựng Flexbox nằm ngang: Ảnh đại diện tròn (`border-radius: 50%`) -> Tên tác giả -> Trình trình phát Audio (Đọc bài báo) kèm dropdown chọn giọng đọc vùng miền.

### 2. Khối Nội Dung Chính (Article Body) & Thanh Tiện Ích Trái (Social Share Bar)
Sử dụng Flexbox hoặc Grid để chia khu vực này thành 2 phần nhỏ:
- [ ] **Thanh tiện ích trái (Sticky Social Bar):**
  * Chứa các icon: Bình luận, Chia sẻ, Lưu bài viết, In ấn.
  * Sử dụng `position: sticky; top: 100px; align-self: flex-start;` để thanh này chạy dọc theo màn hình khi người dùng cuộn đọc bài viết.
- [ ] **Nội dung bài viết (`.article-content`):**
  * Đoạn mở đầu (Sapo): Chữ in đậm, đặt trong dấu ngoặc đơn `(Dân trí) - ...`.
  * Khối text nội dung: Định dạng khoảng cách đoạn (`margin-bottom: 15px`), khoảng cách chữ và dòng tối ưu cho việc đọc dài.
  * Khối hình ảnh minh họa (`<figure>` & `<figcaption>`): Ảnh bo góc nhẹ, có dòng chú thích ảnh màu xám, căn giữa phía dưới ảnh.

### 3. Cột Phải - Đọc Nhiều Trong Mục (Sidebar)
- [ ] Thiết kế hộp "ĐỌC NHIỀU TRONG [TÊN MỤC]" với đường kẻ gạch chân màu xanh thương hiệu.
- [ ] Dựng danh sách số thứ tự tự động hoặc thủ công từ 1 đến 5 (Màu hồng/đỏ nổi bật).
- [ ] Mỗi hàng tin sử dụng Flexbox ngang: Số thứ tự / Tiêu đề nằm bên trái -> Ảnh thumbnail vuông nhỏ nằm bên phải.

---

## 💬 Phần 2: Khối Tương Tác & Tin Liên Quan (Bottom Components)

Nằm ở phía dưới cùng của cột nội dung chính.

### 1. Bộ Chọn Cảm Xúc (Reaction Box)
- [ ] Dựng khung "Bài viết hay? Ấn để tương tác".
- [ ] Sử dụng Flexbox để dàn hàng ngang các nút cảm xúc (Thích, Yêu thích, Ngưỡng mộ,...).
- [ ] Định dạng các nút: Nền xám nhạt, bo góc tròn (`border-radius: 20px`), hiển thị icon kèm số đếm lượt tương tác. Thêm hiệu ứng `:hover` đổi màu nền đậm hơn.

### 2. Danh Sách Tin Gợi Ý Dưới Bài Viết (Related Articles Line)
- [ ] Dựng các thẻ bài viết liên quan dạng hình chữ nhật nằm ngang.
- [ ] Cấu trúc: Ảnh nền bên trái -> Tiêu đề và Sapo tóm tắt ngắn nằm bên phải.

### 3. Khung Bình Luận (Comment Section)
- [ ] Tiêu đề: "Bình luận (X)" với X là số lượng bình luận, sử dụng màu xanh chủ đạo.
- [ ] Khung nhập liệu (`<textarea>`): Bản chất là một form nhận text, bo góc, nền xám siêu nhạt. 
- [ ] Nút "Gửi": Nằm ở góc phải dưới, bo tròn, mặc định màu xám (hoặc xanh khi có chữ).
- [ ] **Tags Block:** Hiển thị danh sách các từ khóa liên quan dưới dạng các nút bo tròn xếp cạnh nhau (`display: flex; flex-wrap: wrap; gap: 8px;`).

---

## 📋 Phần 3: Chân Trang Hệ Thống (Footer)

Khối này chiếm toàn bộ chiều rộng ở đáy trang, chia làm 3 cột thông tin chính bằng Flexbox hoặc Grid:

- [ ] **Cột 1: Thông tin Tòa soạn & Pháp lý**
  * Hiển thị Logo Dân Trí phiên bản màu xanh lớn.
  * Các thông tin text nhỏ: Cơ quan chủ quản, Tổng biên tập, Giấy phép, Địa chỉ, Hotline, Email. Định dạng chữ màu xám sẫm, giãn dòng hẹp.
- [ ] **Cột 2: RSS & Liên hệ quảng cáo**
  * Các đường link danh mục phụ: RSS, Liên hệ tòa soạn, Liên hệ quảng cáo, Chính sách bảo mật.
- [ ] **Cột 3: Tải ứng dụng (Mobile Apps) & Mạng xã hội**
  * Hiển thị 2 ảnh badge download từ App Store và Google Play (Xếp cạnh nhau hoặc chồng lên nhau).
  * Hàng icon Mạng xã hội theo dõi: Facebook, Youtube, Tiktok, Telegram (Sử dụng Flexbox ngang, khoảng cách đều).
- [ ] **Dòng Bản Quyền (Copyright):**
  * Text một dòng chạy ngang dưới cùng, ngăn cách bằng một đường kẻ mảnh (`border-top: 1px solid #eee`).

---

## 📱 Phần 4: Tối Ưu Responsive Cho Trang Con

- [ ] **Màn hình Máy tính bảng (Tablet < 992px):**
  * Chuyển cột phải (Sidebar tin đọc nhiều) xuống dưới cùng của nội dung bài viết. Giao diện lúc này đưa về dạng 1 cột dọc chính.
- [ ] **Màn hình Điện thoại (Mobile < 768px):**
  * Thu nhỏ kích thước tiêu đề bài viết `<h1>` xuống khoảng `24px` - `26px` để tránh tràn viền.
  * Ẩn thanh tiện ích trái (Sticky Social Bar) hoặc chuyển nó thành một thanh bar cố định nằm ở đáy màn hình điện thoại (`position: fixed; bottom: 0;`).
  * Padding lề trái/phải của toàn bộ trang giảm xuống còn `10px` - `15px` để tối ưu không gian hiển thị text.