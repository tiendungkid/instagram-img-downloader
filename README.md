# instagram-images-downloader
Download images instargram auto and smart !
## Chức năng:
  - Tải toàn bộ ảnh trong trang cá nhân người dùng(Images only)
  - Backup dữ liệu link ảnh trong response.json
  - Chỉ tải được ảnh từ các trang công khai(public)
## Bases: NodeJS
  - pupperteer
  - fs
  - images-downloader
  - Chrome core
## Sử dụng - How to use:
  - Step 1: Run terminal: node index
  - Step 2: Enter mode
    + 1: Get links square images
    + 2: Get links full size images
  - Step 3:
    + IF MODE 1 RUN: node download-images
    + IF MODE 2 RUN: node get-request
    + IN MODE 2 WHEN SUCCESS RUN: node download-images
--> Result in folder result (Images + link of images)
## Author: Tiendungkid(GITHUB)
## Thank for read !
