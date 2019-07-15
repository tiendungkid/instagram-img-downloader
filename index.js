const fs = require('fs');
const puppeteer = require('puppeteer-core');
const download = require('images-downloader').images;
const resultFile = "./result/response.json";
const resultFolder = "./result";
const rq = require('request');
const option = {
    headless: false,
    defaultViewport: false,
    executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
}
const timeout = {
  timeout: 3000
}
const url = "https://www.instagram.com/linhyasha/";
/**
 * @param noparams
 * @author tiendungkid
 * @description get square images
 */
(async () => {
    let Imgsuccess = 0;
    let ImgFailed = 0;
    if(!fs.existsSync('./result')) fs.mkdirSync("./result");
    const browser = await puppeteer.launch(option);
    const page = await browser.newPage();
    await page.goto(url);
    const items = await scrapeInfiniteScrollItems(page, extractItems, 100);
    let dataJson = JSON.stringify(items);
    fs.writeFileSync(resultFile,dataJson,(err)=>{
      console.log("Write json success !");
    });
    await download(items, resultFolder).then(result => {
      result.map(i=>{
        if(i.status=="downloaded")Imgsuccess++;
        else ImgFailed++;
      })
    }).catch(error => ImgFailed++);
    console.log("Imgsuccess: "+Imgsuccess);
    console.log("ImgFailed: "+ImgFailed);
    await browser.close();
    console.log("Images: ",items.length);
})();
async function scrapeInfiniteScrollItems(page,extractItems,scrollDelay = 500) {
  let items = [];
  let TempItems = [];
  try {
    let oldHeight = 0;
    let currentHeight = await page.evaluate('document.body.scrollHeight');
    while (oldHeight < currentHeight) {
      TempItems = await page.evaluate(extractItems);
      await TempItems.map(i=>{
        if(items.indexOf(i)===-1) items.push(i);
      });
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      oldHeight = currentHeight;
      await page.waitForFunction("document.body.scrollHeight > " + currentHeight, timeout);
      let newHeight = await page.evaluate('document.body.scrollHeight');
      currentHeight = newHeight;
      await page.waitFor(scrollDelay);
    }
  } catch(e) { }
  return items;
}
const extractItems = async ()=>{
    const extractedElements = Array.from(document.querySelectorAll('article img'));
    const items = extractedElements.map(i => i.getAttribute("src"));
    return items;
}
/**
 * @param noparams
 * @author tiendungkid
 * @description get all link images to get full width of images
 */
// (async ()=>{
//   if(!fs.existsSync('./result')) fs.mkdirSync("./result");
//   const browser = await puppeteer.launch(option);
//   const page = await browser.newPage();
//   await page.goto(url);
//   const items = await scrapeInfiniteScrollItems2(page, extractLinkImages, 100);
//   let dataJson = JSON.stringify(items);
//   fs.writeFileSync(resultFile,dataJson,(err)=>{
//     console.log("Write json success !");
//   });
//   await browser.close();
//   console.log("Get images source success !");
//   console.log("Backup link in result/response.json");
//   console.log("Start get images full width !");

// })();
// async function scrapeInfiniteScrollItems2(page,extractLinkImages,scrollDelay = 500) {
//   let items = [];
//   let TempItems = [];
//   try {
//     let oldHeight = 0;
//     let currentHeight = await page.evaluate('document.body.scrollHeight');
//     while (oldHeight < currentHeight) {
//       TempItems = await page.evaluate(extractLinkImages);
//       await TempItems.map(i=>{
//         if(items.indexOf(i)===-1) items.push(i);
//       });
//       await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
//       oldHeight = currentHeight;
//       await page.waitForFunction("document.body.scrollHeight > " + currentHeight,timeout);
//       let newHeight = await page.evaluate('document.body.scrollHeight');
//       currentHeight = newHeight;
//       await page.waitFor(scrollDelay);
//     }
//   } catch(e) { }
//   return items;
// }
// const extractLinkImages = async ()=>{
//   const extractedElements = Array.from(document.querySelectorAll('article a'));
//   const items = extractedElements.map(i => i.getAttribute("href"));
//   return items;
// }