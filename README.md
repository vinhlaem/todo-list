# Todo Extension — Chrome Popup (Next.js static)

This repository is a small Chrome extension that provides a Todo list usable from the browser toolbar. The UI is built with Next.js (App Router) and styled with Tailwind CSS, and the project is exported as a static site so the resulting files can be loaded as a Chrome extension popup.

## Key features

- Add new tasks
- Edit existing tasks
- Delete tasks (trash icon)
- Toggle complete / incomplete (checkbox)
- Filter tasks: All / Active / Completed
- Persists data using `chrome.storage.local` when running as a Chrome extension, with a `localStorage` fallback for web/dev debugging

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Chrome Extension APIs (`chrome.storage.local`)

## Important configuration

- `next.config.mjs` is configured with `output: 'export'` so `next build` produces a static export in the `out/` folder.
- `public/manifest.json` is a Manifest V3 file that defines the extension popup and requests the `storage` permission.

## File overview

- `app/page.tsx` — client-side popup UI
- `hooks/useTodoStorage.ts` — custom hook that handles reading/writing todos to storage
- `app/globals.css` — Tailwind directives only
- `next.config.mjs` — static export configuration
- `public/manifest.json` — Chrome extension manifest (MV3)

## Installation & build

1. Clone the repository:

```bash
git clone <repo-url>
cd todo-extension
```

2. Install dependencies:

```bash
npm install
```

If you encounter peer-dependency conflicts, try:

```bash
npm install --legacy-peer-deps
# or
npm install --force
```

3. Build the static export:

```bash
npm run build
```

The static site will be output to the `out/` directory.

4. Load the extension in Chrome / Chromium:

- Open `chrome://extensions`
- Enable `Developer mode`
- Click `Load unpacked` and select the `out/` directory from this project

The extension popup will use the exported `index.html` as the UI.

## Notes / Implementation details

- The popup UI is sized for an approximately 400px width to fit Chrome's popup area.
- `useTodoStorage` automatically uses `chrome.storage.local` when available and listens for storage changes so multiple extension contexts stay in sync.
- When running in a regular browser session for development, the hook falls back to `localStorage` so you can debug easily.

If you want help packaging, signing, or publishing the extension to the Chrome Web Store, I can add instructions and scripts for that.

# Todo Extension — Chrome Popup (Next.js static)

Một Chrome Extension đơn giản cho quản lý Todo, được triển khai bằng Next.js (App Router) và Tailwind CSS, xuất ra trang tĩnh để dùng làm popup extension.

**Tính năng chính**

- Thêm task mới
- Chỉnh sửa nội dung task
- Xóa task (icon thùng rác)
- Đánh dấu hoàn thành / bỏ hoàn thành (checkbox)
- Lọc danh sách: All / Active / Completed
- Lưu trữ dùng `chrome.storage.local` khi chạy trong môi trường Chrome extension, và fallback về `localStorage` khi chạy trên web (hỗ trợ debug)

**Tech stack**

- Next.js (App Router) — giao diện, xuất tĩnh
- TypeScript — an toàn type
- Tailwind CSS — utility-first styling
- Chrome Extension APIs (`chrome.storage.local`) — persist dữ liệu

**Cấu hình quan trọng**

- `next.config.mjs` được cấu hình `output: 'export'` để xuất trang tĩnh vào thư mục `out/` sau khi build.
- `public/manifest.json` theo chuẩn Manifest V3, định nghĩa popup là `index.html` và yêu cầu quyền `storage`.

Hệ thống file liên quan:

- `app/page.tsx` — giao diện popup (client component)
- `hooks/useTodoStorage.ts` — custom hook quản lý lưu/truy xuất todo
- `app/globals.css` — chỉ gồm các directive Tailwind
- `next.config.mjs` — cấu hình xuất tĩnh
- `public/manifest.json` — manifest của extension

**Cài đặt & chạy**

1. Clone repository:

```bash
git clone <repo-url>
cd todo-extension
```

2. Cài dependencies:

```bash
npm install
```

Ghi chú: nếu gặp lỗi peer-deps (tùy môi trường) có thể chạy:

```bash
npm install --legacy-peer-deps
# hoặc
npm install --force
```

3. Build static export:

```bash
npm run build
```

4. Load extension vào Chrome (hoặc Chromium):
   - Mở `chrome://extensions`
   - Bật `Developer mode`
   - Chọn `Load unpacked`
   - Chọn thư mục `out/` trong dự án (sau khi build, Next xuất trang tĩnh vào `out/`)

Sau khi load, icon của extension sẽ mở `index.html` (popup) chứa giao diện Todo.

**Ghi chú kỹ thuật / Lưu ý**

- Giao diện popup có kích thước cố định (khoảng 400px width) để tương thích với popup Chrome.
- Hook `useTodoStorage` tự động sử dụng `chrome.storage.local` khi môi trường hỗ trợ, và lắng nghe thay đổi storage để đồng bộ UI.
- Khi chạy ở môi trường web (dev), dữ liệu được lưu trong `localStorage` để dễ debug.

Nếu cần thêm hướng dẫn đóng gói, signing hay publish lên Chrome Web Store, mình có thể giúp mở rộng README với các bước đó.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
