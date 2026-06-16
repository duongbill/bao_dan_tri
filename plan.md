# KE HOACH CHINH SUA GIAO DIEN TRANG CHU THEO DANTRI.COM.VN

Muc tieu cua plan nay la dung lai trang chu theo phong cach `https://dantri.com.vn/` voi scope uu tien la `chi HTML/CSS` cho phan giao dien. Phan upload bai bao tu file `PDF`, `DOC`, `DOCX` duoc bo sung thanh mot luong chuc nang rieng o muc cuoi de tranh lech scope giao dien, nhung van san sang cho giai doan tiep theo.

## 1. Dinh nghia lai scope cho dung yeu cau

- [ ] Chi xay dung giao dien bang `HTML` va `CSS`.
- [ ] Khong dua `Firebase`, `database`, `API`, `iframe render PDF`, `localStorage`, hoac bat ky logic render dong nao vao pham vi clone giao dien chinh.
- [ ] Neu can demo du lieu, dung du lieu mau hard-code trong HTML.
- [ ] JavaScript khong nam trong plan giao dien chinh. Phan "upload bai bao" duoc ghi thanh plan logic tach rieng de xu ly sau khi giao dien da on.

## 2. Muc tieu giao dien can bam sat Dan Tri

- [ ] Tai hien dung tinh than trang chu Dan Tri: sach, nhieu lop noi dung, nhan manh tin noi bat o trung tam, nhieu khoi tin bao quanh, mat do thong tin cao nhung van de doc.
- [ ] Giu tong the mau sac gan voi Dan Tri:
  - Mau nhan dien xanh la dam.
  - Nen trang hoac xam rat nhat.
  - Tieu de den dam.
  - Meta text, thoi gian, mo ta dung xam trung tinh.
- [ ] Uu tien bo cuc rong, can giua trang, nhieu khoi ngang noi tiep nhau.
- [ ] Biet ro day la `clone giao dien`, khong can sao chep 100% tung module dong cua trang that, nhung cac cum bo cuc chinh phai nhin vao la lien tuong ngay den Dan Tri.

## 3. Cau truc thu muc de dung HTML/CSS thuan

- [ ] To chuc lai du an theo dang toi gian:

```text
/
|-- index.html
|-- css/
|   `-- style.css
`-- assets/
    |-- images/
    `-- icons/
```

- [ ] Khong tao thu muc `js/` trong pham vi plan giao dien.
- [ ] Chuan bi san logo, thumbnail, banner, icon menu, icon search, icon user, icon trending, icon weather neu can.

## 4. Phan tich giao dien Dan Tri de lam khung bo cuc

### 4.1. Lop dau trang

- [ ] Thanh tren cung co tinh chat thong tin nhanh:
  - Logo Dan Tri ben trai.
  - Cac lien ket he sinh thai hoac chuyen muc dac biet o vung tren.
  - Khu vuc ben phai cho thong tin thoi gian, thoi tiet, tim kiem, tai khoan.
- [ ] Ben duoi la thanh navigation ngang rat dai:
  - Nhieu chuyen muc cap 1.
  - Khoang cach deu.
  - Tieu de ngan gon.
  - Co trang thai hover/gach chan de giong cam giac trang tin tuc.
- [ ] Header can co cam giac gon, phang, sach, khong bong bay qua muc.

### 4.2. Lop xu huong va diem nong

- [ ] Ngay duoi header co mot cum `Xu huong` / hashtag noi bat.
- [ ] Cac the trend duoc xep ngang, co border nhe hoac nen xam nhat.
- [ ] Day la lop giup giao dien giong Dan Tri rat ro, nen khong bo qua.

### 4.3. Khoi tin dau trang noi bat

- [ ] Day la vung quan trong nhat cua homepage.
- [ ] Bo cuc nen theo dang 3 cot, trong do:
  - Cot giua rong nhat chua bai noi bat.
  - Cot trai chua cac bai phu dang card doc.
  - Cot phai chua danh sach tin nhanh, cum doc nhieu, hoac box diem nhan.
- [ ] Bai noi bat o giua can co:
  - Anh lon.
  - Tieu de lon dam.
  - Sapo 2-4 dong.
  - Meta nho hon.
- [ ] Cot trai va cot phai khong duoc thiet ke qua "blog", ma phai ra chat trang bao:
  - Nhieu bai ngan.
  - Canh le chac.
  - Hinh va text co cap bac ro.

### 4.4. Cac tang noi dung tiep theo

- [ ] Phia duoi khoi top can co nhieu section noi tiep, moi section la mot cum tin theo chuyen muc.
- [ ] Moi section nen mo phong cach Dan Tri:
  - Tieu de chuyen muc nam ngang.
  - Mot bai lon ben trai hoac o giua.
  - Cac bai nho xep ben canh.
  - Co duong ke mong, khoang trang ro rang.
- [ ] Nen co mot vai cum dac trung de giong trang that hon:
  - Khu video / media.
  - Khu magazine / long-form.
  - Khu doc nhieu / tin moi.
  - Khu chuyen muc theo hang ngang.

### 4.5. Chan trang

- [ ] Footer can theo phong cach bao dien tu:
  - Logo nho.
  - Thong tin toa soan / lien he / ban quyen.
  - Cac lien ket chuyen muc hoac dich vu.
- [ ] Footer dung mau nen nhat hon phan noi dung chinh va chia cot ro rang.

## 5. Ke hoach dung HTML chi tiet

### 5.1. Khung trang tong

- [ ] Tao wrapper tong cho toan bo trang voi `max-width` phu hop de giong layout Dan Tri.
- [ ] Tach cac vung thanh cac `section` ro nghia:
  - `topbar`
  - `site-header`
  - `main-nav`
  - `trend-strip`
  - `hero-news`
  - `category-section`
  - `media-section`
  - `magazine-section`
  - `footer`

### 5.2. Header HTML

- [ ] Dung cau truc semantic:
  - `header`
  - `nav`
  - `ul/li/a`
- [ ] Chuan bi san HTML cho:
  - Logo.
  - O thong tin thoi gian.
  - Nut tim kiem gia.
  - Nut tai khoan gia.
  - Danh sach chuyen muc cap 1.

### 5.3. Khoi hero HTML

- [ ] Dung `main` chua mot `section.hero-news`.
- [ ] Ben trong chia 3 cot bang cac block HTML ro rang:
  - `hero-left`
  - `hero-center`
  - `hero-right`
- [ ] Moi bai viet dung mot mau card thong nhat:
  - Anh.
  - Tieu de.
  - Sapo neu can.
  - Meta.

### 5.4. Khoi section noi dung ben duoi

- [ ] Moi chuyen muc dung mot section rieng co:
  - Tieu de section.
  - Bai noi bat.
  - Cum bai phu.
- [ ] Co the tao 4-6 section demo de du mat do giao dien:
  - Thoi su
  - The gioi
  - Kinh doanh
  - The thao
  - Giai tri
  - Giao duc

### 5.5. Footer HTML

- [ ] Footer chia nhieu cot thong tin.
- [ ] Co dong ban quyen, dia chi, email, hotline gia lap.

## 6. Ke hoach dung CSS chi tiet

### 6.1. Nen tang style chung

- [ ] Viet reset CSS co ban.
- [ ] Dinh nghia bien mau trong `:root`.
- [ ] Dinh nghia bien cho:
  - mau chu dao
  - mau nen
  - mau border
  - mau text chinh
  - mau text phu
- [ ] Dat he thong font uu tien an toan, de doc, gan phong cach bao dien tu.

### 6.2. Header va nav

- [ ] Dung `flex` cho topbar va header.
- [ ] Dung `flex` cho menu ngang.
- [ ] Them `border-bottom` mong, hover underline, active color.
- [ ] Neu can, dung `position: sticky` cho thanh menu de giong trai nghiem trang tin.

### 6.3. Hero 3 cot

- [ ] Dung `grid` de chia 3 cot, uu tien ti le gan trang that:
  - trai hep vua
  - giua rong nhat
  - phai hep vua
- [ ] Tieu de bai noi bat lon hon ro ret so voi bai phu.
- [ ] Anh bai noi bat co ti le on dinh, khong meo.
- [ ] Bai o cot phai uu tien layout thumbnail nho + text.

### 6.4. Section noi dung

- [ ] Dung `grid` hoac `flex` tuy section, nhung phai giu mot he thong nhat quan.
- [ ] Tieu de section co duong gach, mau nhan dien, khoang cach tren duoi dung chat bao.
- [ ] Card tin bai phu gioi han so dong tieu de de tranh vo layout.

### 6.5. Tinh chi tiet de giao dien giong Dan Tri hon

- [ ] Canh le theo he thong 8px/12px/16px/24px.
- [ ] Border rat nhe, khong lam card qua "app-like".
- [ ] Han che bo goc qua nhieu, Dan Tri nghien ve su gon gang hon la mem hoa.
- [ ] Shadow neu dung thi rat nhe.
- [ ] Co line separator giua cac khoi tin ngan.

## 7. Responsive chi tiet

- [ ] `>= 1200px`: giu du 3 cot va nhieu cum section.
- [ ] `< 1200px`: gian khoang cach nav, giam kich thuoc tieu de lon.
- [ ] `< 992px`: hero chuyen tu 3 cot sang 2 cot, cot phai day xuong duoi hoac an bot module phu.
- [ ] `< 768px`: toan bo ve 1 cot, menu xu ly thanh hang cuon ngang.
- [ ] `< 576px`: toi uu spacing, anh thumb nho lai, giam so dong sapo.

## 8. Noi dung mau can chuan bi de demo dung tinh chat Dan Tri

- [ ] 1 bai headline chinh.
- [ ] 4-6 bai phu o cum dau trang.
- [ ] 12-20 bai chia cho cac section phia duoi.
- [ ] 1 cum trend hashtag.
- [ ] 1 cum "doc nhieu" hoac "tin moi nhat".
- [ ] 1 cum mang tinh long-form nhu magazine.

## 9. Tieu chi danh gia ban clone

- [ ] Nhin tong the la ra giao dien bao dien tu, khong ra landing page, blog ca nhan, hay dashboard.
- [ ] Hero section phai la diem nhan ro nhat.
- [ ] Header + trend strip + menu nhin vao phai lien tuong Dan Tri.
- [ ] Mat do noi dung phai day vua du, co phan cap thi giac ro.
- [ ] Mobile van de doc, khong vo cot, khong tran anh, khong dinh chu.

## 10. Bo sung plan logic upload bai bao tu PDF/Word

Phan nay khong nam trong scope `HTML/CSS only`, nhung duoc them vao de sau khi clone xong giao dien co the noi tiep chuc nang upload bai bao dung nhu yeu cau.

### 10.1. Muc tieu logic

- [ ] Cho phep nguoi quan tri upload bai viet tu file:
  - `.pdf`
  - `.doc`
  - `.docx`
- [ ] Sau khi upload, he thong trich xuat noi dung va chuyen thanh du lieu bai bao de do vao cac block giao dien da clone.

### 10.2. Luong xu ly nghiep vu de dua vao plan

1. Nguoi dung bam nut `Upload bai bao`.
2. He thong mo hop chon file va chi chap nhan `PDF`, `DOC`, `DOCX`.
3. He thong kiem tra:
   - Dung dinh dang file.
   - Dung gioi han dung luong.
   - Khong co file rong/loi.
4. He thong doc noi dung file.
5. He thong trich xuat cac truong can thiet:
   - Tieu de
   - Sapo
   - Noi dung than bai
   - Anh dai dien neu co
   - Chu de/chuyen muc neu co metadata
6. He thong dua noi dung ve mot cau truc du lieu chuan.
7. Nguoi quan tri xem man hinh preview.
8. Nguoi quan tri chinh sua tay neu noi dung trich xuat chua dep.
9. Nguoi quan tri bam xac nhan dang bai.
10. Bai viet moi duoc dua vao danh sach de hien thi tren trang chu.

### 10.3. Quy tac xu ly rieng cho tung loai file

- [ ] Voi `PDF`:
  - Uu tien doc text layer neu PDF co san text.
  - Neu PDF la dang scan anh, can OCR o giai doan backend sau nay.
- [ ] Voi `DOC/DOCX`:
  - Uu tien lay heading dau tien lam tieu de.
  - Doan mo dau hoac doan in dam dau tien co the map thanh sapo.
  - Cac doan con lai map vao than bai.

### 10.4. Dau ra du lieu sau upload

- [ ] Chuan hoa du lieu bai viet thanh mot object logic gom:
  - `title`
  - `summary`
  - `content`
  - `category`
  - `author`
  - `publishDate`
  - `thumbnail`
  - `sourceFileType`
- [ ] Tu object nay moi bind vao giao dien HTML clone hoac dua vao CMS sau nay.

### 10.5. Luu y de khong lech yeu cau hien tai

- [ ] Trong ban lam hien tai, chi can viet plan cho luong upload.
- [ ] Khong code upload that neu ban dang bi gioi han `chi HTML/CSS`.
- [ ] Neu muon demo tren giao dien, chi dat san mot nut/khung placeholder "Upload bai bao" ma khong gan xu ly that.

## 11. Thu tu trien khai de it sai scope nhat

1. Dung khung `index.html`.
2. Dung `style.css` cho layout tong, header, nav, trend strip.
3. Dung xong hero 3 cot giong Dan Tri.
4. Dung tiep cac section noi dung ben duoi.
5. Hoan thien footer.
6. Responsive desktop, tablet, mobile.
7. Kiem lai do giong ve bo cuc va mat do thong tin so voi `dantri.com.vn`.
8. Sau cung moi tach sang giai doan logic upload `PDF/Word`.

## 12. Ket qua mong muon

- [ ] Co mot ban clone trang chu Dan Tri bang `HTML/CSS` sach, de doc, bo cuc sat trang that.
- [ ] Plan khong con chua cac phan cloud/dynamic khong dung scope.
- [ ] Da co san mot plan logic ro rang cho viec upload bai bao tu `PDF/Word` de noi tiep o phase sau.
