# Thiệp cưới Hoàng Thanh & Hải My — bản gửi ông bà

Bản này được tách từ thiệp đang chạy, ngày 18/11/2026.
Tên chú rể đứng trước cô dâu trong lời mời, bìa và tiêu đề chia sẻ.
Lời mời: Trân trọng kính mời ông bà đến chung vui cùng gia đình chúng con và lưu giữ khoảnh khắc đẹp nhất trong hành trình yêu thương.

## Deploy thành link riêng

1. Giải nén ZIP này. Tạo repository GitHub MỚI tên `hoang-thanh-hai-my-wedding` (Private cũng được).
2. Trong repository mới chọn Add file → Upload files. Mở thư mục vừa giải nén trên máy, chọn toàn bộ NỘI DUNG bên trong (api, public, package.json, vercel.json, README.md), kéo thả vào trang upload. Không upload nguyên file ZIP. Commit changes.
3. Trên Vercel chọn Add New → Project, import repository MỚI `hoang-thanh-hai-my-wedding`.
4. Project Name: `hoang-thanh-hai-my-wedding`; Framework Preset: Other; Root Directory: ./; Build Command: npm run build; Output Directory: public. vercel.json cũng đã khai báo các giá trị này.
5. Trong Environment Variables của project mới, thêm GMAIL_USER và GMAIL_APP_PASSWORD, dùng cùng các giá trị đã cấu hình cho thiệp bạn bè. Chọn Production. Không đưa mật khẩu vào source hoặc GitHub.
6. Bấm Deploy. Nếu tên miền còn trống, link sẽ là https://hoang-thanh-hai-my-wedding.vercel.app/. Nếu Vercel báo tên miền đã được dùng, chọn tên khác như hoang-thanh-hai-my-30112026, rồi cập nhật các URL trong phần head của public/index.html cho khớp tên miền thực tế.
7. Sau khi Ready, mở link mới, kiểm tra thứ tự Hoàng Thanh → Hải My và lời mời ông bà. Thử gửi xác nhận; kiểm tra cả hai hộp thư của vợ chồng.

Không upload các file này vào repository thiệp gửi bạn bè. Repository và project mới giúp giữ nguyên link cũ.

## Dữ liệu lời chúc và xác nhận

Bản mới dùng chung backend và sổ lưu bút với thiệp hiện tại: lời chúc gửi ở một link sẽ có thể xuất hiện ở cả hai link. Email vẫn gửi đến nohatte2108@gmail.com và haimypcy888@gmail.com khi cấu hình Gmail ở project mới.
Backend lưu dữ liệu vẫn là dịch vụ đã dùng cho thiệp hiện tại; đây là bản giao diện và Vercel API, không phải bản sao cơ sở dữ liệu độc lập.
