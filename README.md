
![alt text](https://raw.githubusercontent.com/tiendungkid/instagram-images-downloader/master/instagram.png)

# Instagram-images-downloader

Download images instargram auto and smart !
Tutorial video: https://tiendungkid.com/isdownloader
## Chức năng - Function:

- Download all images of a personal page(Images only)
- Backup images links in result/response.json
- Public user only

## Base: NodeJS + PHP

- pupperteer
- fs
- images-downloader
- Chrome core

## Sử dụng - How to use:

! If you have not installed nodejs environment, please refer and download here: https://nodejs.org

- Step 1: Change your instagram link (in file index.js)
- Step 2: If you install chrome in a different directory than the default directory, change the path to chrome.exe file (executablePath in file index.js)
- Step 3: Run terminal and enter: node index
- Step 4: Enter mode
  - 1: Get links square images
  - 2: Get links full size images
- Step 5: + IF MODE 1 RUN: node download-images + IF MODE 2 RUN: node get-request + IN MODE 2 WHEN SUCCESS RUN: node download-images
  --> Result in folder result (Images + link of images)

## Author: Tiendungkid(GITHUB)
Donte: https://www.buymeacoffee.com/tiendungkid
