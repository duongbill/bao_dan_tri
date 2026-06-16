# PLAN 2 - LOGIN DON GIAN + DANG BAI TU PDF/DOCX TRONG MOI TRUONG DEV

Muc tieu cua phase nay la bo sung mot luong quan tri toi gian cho trang hien tai:

- Co `dang nhap` don gian, khong co `dang ky`.
- Sau khi dang nhap thanh cong, header xuat hien them nut `Dang bai`.
- Nguoi dung dang bai bang cach upload file `.pdf` hoac `.docx`.
- Sau khi upload xong, bai vua upload se duoc dua vao khu vuc chinh giua trang, thay cho bai headline mac dinh.
- Luu y quan trong: upload va xu ly file chi hoat dong trong `code dev`. Khi dua len web tinh, trang van chi la giao dien tinh voi du lieu mau, khong co upload that.

## 1. Scope phase nay

- [ ] Giu trang hien tai la frontend nhe, uu tien `HTML + CSS + JS` toi gian.
- [ ] Khong lam dang ky tai khoan.
- [ ] Khong xay dung CMS day du.
- [ ] Khong luu bai viet len database that trong ban web tinh.
- [ ] Co the cho phep logic local trong dev de demo duoc luong dang nhap va dang bai.

## 2. Cach hieu yeu cau de tranh lech scope

Co 2 che do can tach ro:

### 2.1. Che do dev

- [ ] Cho phep dang nhap gia lap.
- [ ] Cho phep bam nut `Dang bai`.
- [ ] Cho phep chon file `.pdf` hoac `.docx`.
- [ ] Parse noi dung file trong moi truong local/dev.
- [ ] Render bai moi upload vao `hero-center`.
- [ ] Co the luu tam du lieu bang bo nho runtime hoac `localStorage` neu can cho demo.

### 2.2. Che do web tinh

- [ ] Khong upload that.
- [ ] Khong co xu ly file that tren hosting tinh.
- [ ] Nut `Dang bai` co the an di, vo hieu hoa, hoac chi hien thong bao day la demo dev-only.
- [ ] Bai headline mac dinh van la noi dung hard-code.

## 3. Muc tieu giao dien va hanh vi

### 3.1. Truoc dang nhap

- [ ] Header hien `Dang nhap`.
- [ ] Chua hien `Dang bai`.
- [ ] Hero-center hien bai mac dinh nhu hien tai.

### 3.2. Sau dang nhap

- [ ] Header doi tu `Dang nhap` thanh trang thai da dang nhap.
- [ ] Xuat hien nut `Dang bai`.
- [ ] Co nut `Dang xuat`.

### 3.3. Sau khi dang bai

- [ ] Bai moi upload duoc dua vao vi tri bai trung tam.
- [ ] Co tieu de, sapo, noi dung rut gon hien thi dep trong layout hien co.
- [ ] Neu file khong doc duoc, hien thong bao loi than thien.

## 4. De xuat kien truc phu hop voi repo hien tai

Repo hien tai dang rat don gian:

- `index.html`
- `css/style.css`

De thuc hien phase nay gon va de kiem soat, nen tach them:

```text
/
|-- index.html
|-- css/
|   `-- style.css
`-- js/
    |-- app.js
    |-- auth.js
    `-- upload.js
```

Huong toi gian hon nua neu muon nhanh:

```text
/
|-- index.html
|-- css/style.css
`-- js/app.js
```

De xuat uu tien:

- [ ] Phase 1 dung `js/app.js` duy nhat de lam nhanh.
- [ ] Neu code bat dau dai, tach `auth.js` va `upload.js` sau.

## 5. Ke hoach login don gian

### 5.1. Pham vi login

- [ ] Chi can 1 tai khoan admin gia lap.
- [ ] Khong can trang dang ky.
- [ ] Khong can quen mat khau.
- [ ] Khong can phan quyen phuc tap.

### 5.2. Cach trien khai de don gian nhat

Phuong an de xuat:

- [ ] Bam `Dang nhap` mo mot modal nho.
- [ ] Modal gom:
  - `Ten dang nhap`
  - `Mat khau`
  - nut `Dang nhap`
- [ ] Tai khoan duoc hard-code trong JS dev, vi du:
  - username: `admin`
  - password: `123456`

### 5.3. Trang thai dang nhap

- [ ] Sau khi dang nhap thanh cong, luu trang thai dang nhap trong `localStorage` de khong mat khi refresh luc dev.
- [ ] Key goi y:
  - `dt_admin_logged_in`
  - `dt_admin_name`

### 5.4. Hanh vi UI sau login

- [ ] An link `Dang nhap`.
- [ ] Hien `Xin chao, admin` hoac `Quan tri`.
- [ ] Hien nut `Dang bai`.
- [ ] Hien nut `Dang xuat`.

## 6. Ke hoach upload bai

### 6.1. Cach mo luong upload

- [ ] Nut `Dang bai` mo modal hoac panel nho.
- [ ] Trong do co:
  - o nhap tieu de thu cong du phong
  - input file nhan `.pdf,.docx`
  - nut `Tai len`
  - vung hien thong bao / preview

### 6.2. Dinh dang file ho tro

- [ ] Ho tro `.pdf`
- [ ] Ho tro `.docx`
- [ ] Khong uu tien `.doc` vi xu ly tren frontend kho hon va kem on dinh hon `.docx`

Ghi chu:

- [ ] User dang yeu cau `pdf hoac docx`, vi vay scope nen chot la `.pdf` va `.docx`.
- [ ] Neu can them `.doc`, nen de thanh phase sau hoac can backend chuyen doi.

### 6.3. Logic xu ly file trong dev

- [ ] Voi `PDF`:
  - dung thu vien parse text phia client trong dev
  - lay text tu file
- [ ] Voi `DOCX`:
  - dung thu vien doc text tu `.docx`
  - rut tieu de va cac doan dau

### 6.4. Quy tac trich xuat noi dung

De don gian va phu hop demo:

- [ ] Dong dau tien co y nghia nhat se map thanh `title`.
- [ ] Doan tiep theo map thanh `summary`.
- [ ] Cac doan sau ghep thanh `content`.
- [ ] Neu file qua ngan, cho phep admin nhap tay tieu de/sapo truoc khi dang.

### 6.5. Object du lieu bai viet de thong nhat

```js
{
  id: "post_001",
  title: "Tieu de bai viet",
  summary: "Sapo ngan hien o hero-center",
  content: "Noi dung text day du da trich xuat",
  sourceType: "pdf" | "docx",
  fileName: "ten-file.pdf",
  createdAt: "2026-06-16T10:00:00+07:00",
  author: "admin"
}
```

## 7. Ke hoach render bai upload vao chinh giua trang

### 7.1. Vi tri can thay doi

- [ ] Khu vuc `hero-center`
- [ ] Card `.headline-card`
- [ ] Phan `.headline-copy`

### 7.2. Cach render

- [ ] Giu san mot template headline mac dinh trong HTML.
- [ ] Khi co bai moi upload thanh cong:
  - thay `h1`
  - thay `p` sapo
  - co the doi `img` sang mot anh placeholder mac dinh cho bai upload

### 7.3. Van de anh dai dien

Vi file `pdf/docx` thuong khong co anh dep de dua len ngay, nen phase nay de xuat:

- [ ] Tam thoi dung 1 anh placeholder mac dinh cho bai moi upload.
- [ ] Hoac cho admin chon them 1 URL anh / file anh o phase sau.

## 8. Cach phan biet dev-only va web tinh

Day la diem quan trong nhat cua phase nay.

### 8.1. Cach lam de xuat

- [ ] Dung mot co cau hinh trong JS, vi du:

```js
const DEV_UPLOAD_ENABLED = true;
```

- [ ] Khi build/public static:

```js
const DEV_UPLOAD_ENABLED = false;
```

### 8.2. Hanh vi theo flag

- [ ] Neu `true`:
  - hien login
  - cho phep dang bai
  - cho phep xu ly file
- [ ] Neu `false`:
  - an nut `Dang bai`
  - co the giu `Dang nhap` chi de trung giao dien, nhung khong xu ly that
  - khong nap thu vien parse file khong can thiet

### 8.3. Ghi chu quan trong

- [ ] Web tinh khong co server nen khong the xem la upload that.
- [ ] Neu muon host len web ma van co upload that, phase sau can co backend/API hoac mot dich vu luu tru.

## 9. Thu vien co the can trong moi truong dev

Neu du an cho phep them JS library, co the can:

- [ ] `pdf.js` hoac thu vien parse text PDF
- [ ] `mammoth.js` cho `.docx`

Luu y:

- [ ] Day la thu vien phuc vu dev/demo logic.
- [ ] Ban web tinh cuoi cung co the khong bat upload nen khong nhat thiet phai giu luon trong ban public.

## 10. Chi tiet cac buoc implementation

### Buoc 1. Chuan bi cau truc HTML cho auth va upload

- [ ] Them modal `Dang nhap` vao `index.html`
- [ ] Them vung action admin trong header
- [ ] Them modal/panel `Dang bai`
- [ ] Them input file nhan `.pdf,.docx`
- [ ] Them vung thong bao trang thai

### Buoc 2. Them file JS va bootstrap logic

- [ ] Tao `js/app.js`
- [ ] Gan script vao cuoi `index.html`
- [ ] Viet logic init sau khi DOM load

### Buoc 3. Lam auth gia lap

- [ ] Hard-code tai khoan admin
- [ ] Bat su kien submit dang nhap
- [ ] Validate username/password
- [ ] Luu session local bang `localStorage`
- [ ] Render lai header theo trang thai login

### Buoc 4. Lam logic dang xuat

- [ ] Xoa trang thai login khoi `localStorage`
- [ ] Reset giao dien header
- [ ] Dong modal dang bai neu dang mo

### Buoc 5. Lam giao dien va validate upload

- [ ] Chi mo upload khi da dang nhap
- [ ] Kiem tra co file duoc chon
- [ ] Kiem tra duoi file la `.pdf` hoac `.docx`
- [ ] Kiem tra dung luong file hop ly
- [ ] Hien loi ro rang neu file khong hop le

### Buoc 6. Parse file trong dev

- [ ] Neu la PDF, doc text file
- [ ] Neu la DOCX, doc text file
- [ ] Rut title / summary / content

### Buoc 7. Render bai upload vao hero-center

- [ ] Tao object bai viet tu ket qua parse
- [ ] Cap nhat UI cua `.headline-card`
- [ ] Gan them metadata nhu tac gia, thoi gian neu can
- [ ] Cuon len dau khu headline neu dang o duoi

### Buoc 8. Fallback cho web tinh

- [ ] Them flag `DEV_UPLOAD_ENABLED`
- [ ] Khi tat flag, tat toan bo auth/upload logic nang
- [ ] Dam bao trang van chay nhu mot homepage tinh binh thuong

## 11. Rui ro ky thuat can biet truoc

- [ ] Parse `PDF` tren frontend khong on dinh 100%, nhat la file scan.
- [ ] Parse `.docx` de lay dung cau truc bai bao chi o muc demo, khong nen ky vong chuan CMS.
- [ ] `.doc` cu khong nen ho tro o phase nay.
- [ ] Site hien tai dang la static page, nen moi state chi la tam thoi trong dev/browser.
- [ ] Neu refresh trong che do khong luu bai vao `localStorage`, bai vua upload se mat.

## 12. Cach chot pham vi cho phase nay

De vua nhanh vua dung yeu cau, phase nay nen chot nhu sau:

- [ ] Co login gia lap, khong co dang ky.
- [ ] Co upload `.pdf` va `.docx` chi trong dev.
- [ ] Co render bai vua upload vao giua trang.
- [ ] Khong co backend.
- [ ] Khong co luu tru that.
- [ ] Ban public/static chi giu giao dien va du lieu mau.

## 13. Tieu chi hoan thanh

- [ ] User bam `Dang nhap` va vao duoc bang tai khoan admin gia lap.
- [ ] Sau login thay duoc nut `Dang bai`.
- [ ] User chon duoc file `.pdf` hoac `.docx` trong dev.
- [ ] Sau khi xu ly xong, bai moi xuat hien o `hero-center`.
- [ ] Khi tat che do dev upload, trang van hien thi on nhu trang tinh.

## 14. Thu tu thuc hien de xuat

1. Chinh HTML header va them modal login.
2. Them modal/panel dang bai.
3. Tao `js/app.js` va lam auth gia lap.
4. Render header theo trang thai login.
5. Them validate file upload.
6. Noi parser cho `.pdf` va `.docx` trong dev.
7. Bind bai vua upload vao `hero-center`.
8. Them `DEV_UPLOAD_ENABLED` de phan tach dev/public.
9. Test lai desktop va mobile de dam bao header khong vo layout.

## 15. Ghi chu cho phase implementation tiep theo

Khi bat dau code theo plan nay, nen uu tien:

- [ ] Lam xong auth gia lap truoc.
- [ ] Sau do moi them nut `Dang bai`.
- [ ] Sau cung moi noi parser file.

Ly do:

- [ ] Neu lam parser truoc se ton cong nhung chua co luong admin ro rang.
- [ ] Auth + UI state la xuong song cua toan bo yeu cau tiep theo.
