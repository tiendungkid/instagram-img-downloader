const fs = require('fs');
const puppeteer = require('puppeteer-core');
const download = require('images-downloader').images;
const resultFile = "./result/response.json";
const resultFolder = "./result";
const rq = require('request');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const option = {
  headless: false,
  defaultViewport: false,
  executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}
const timeout = {
  timeout: 3000
}
const url = "https://www.instagram.com/tiendungkid/";
/**
 * @param noparams
 * @author tiendungkid
 * @description get square images
 */
let square = async () => {
  if (!fs.existsSync('./result')) fs.mkdirSync("./result");
  const browser = await puppeteer.launch(option);
  const page = await browser.newPage();
  await page.goto(url);
  const items = await scrapeInfiniteScrollItems(page, extractItems, 100);
  let dataJson = JSON.stringify(items);
  fs.writeFileSync(resultFile, dataJson, (err) => {
    console.log("Write json success !");
  });
  await browser.close();
  console.log("Get images source success !");
  console.log("Backup link in result/response.json");
  console.log("\n \n If you want get square image now run: node download-images.js and type 1| Or you can get full size image you need to run: node get-request.js and then run: node download-images.js and type 2");
}
async function scrapeInfiniteScrollItems(page, extractItems, scrollDelay = 500) {
  let items = [];
  let TempItems = [];
  try {
    let oldHeight = 0;
    let currentHeight = await page.evaluate('document.body.scrollHeight');
    while (oldHeight < currentHeight) {
      TempItems = await page.evaluate(extractItems);
      await TempItems.map(i => {
        if (items.indexOf(i) === -1) items.push(i);
      });
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      oldHeight = currentHeight;
      await page.waitForFunction("document.body.scrollHeight > " + currentHeight, timeout);
      let newHeight = await page.evaluate('document.body.scrollHeight');
      currentHeight = newHeight;
      await page.waitFor(scrollDelay);
    }
  } catch (e) {}
  return items;
}
const extractItems = async () => {
  const extractedElements = Array.from(document.querySelectorAll('article img'));
  const items = extractedElements.map(i => i.getAttribute("src"));
  return items;
}
/**
 * @param noparams
 * @author tiendungkid
 * @description get all link images to get full width of images
 */
let fullszie = async () => {
  if (!fs.existsSync('./result')) fs.mkdirSync("./result");
  const browser = await puppeteer.launch(option);
  const page = await browser.newPage();
  await page.goto(url);
  const items = await scrapeInfiniteScrollItems2(page, extractLinkImages2, 100);
  let dataJson = JSON.stringify(items);
  fs.writeFileSync(resultFile, dataJson, (err) => {
    console.log("Write json success !");
  });
  await browser.close();
  console.log("Get images source success !");
  console.log("Backup link in result/response.json");
  console.log("\n \n If you want get square image now run: node download-images.js and type 1| Or you can get full size image you need to run: node get-request.js and then run: node download-images.js and type 2");
}
async function scrapeInfiniteScrollItems2(page, extractLinkImages, scrollDelay = 500) {
  let items = [];
  let TempItems = [];
  try {
    let oldHeight = 0;
    let currentHeight = await page.evaluate('document.body.scrollHeight');
    while (oldHeight < currentHeight) {
      TempItems = await page.evaluate(extractLinkImages);
      await TempItems.map(i => {
        if (items.indexOf(i) === -1) items.push(i);
      });
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      oldHeight = currentHeight;
      await page.waitForFunction("document.body.scrollHeight > " + currentHeight, timeout);
      let newHeight = await page.evaluate('document.body.scrollHeight');
      currentHeight = newHeight;
      await page.waitFor(scrollDelay);
    }
  } catch (e) {}
  return items;
}
const extractLinkImages2 = async () => {
    const extractedElements = Array.from(document.querySelectorAll('article a'));
    const items = extractedElements.map(i => i.getAttribute("href"));
    return items;
  }
  (async () => {
    console.log('\n');
    console.log('Step 1: node index');
    console.log('Step 2: Chooser mode');
    console.log('\t 1: Get links square images');
    console.log('\t 2: Get links full size images');
    console.log('Step 3:');
    console.log('\t IF MODE 1 RUN - node download-images');
    console.log('\t IF MODE 2 RUN - node get-request - and wait');
    console.log('\t IN MODE 2 WHEN SUCCESS RUN - node download-images');
    console.log('--------------------------------------');
    readline.question(`Square type 1 | Full size type 2: \n`, (number) => {
      if (number === undefined || number === "" || number == null) {
        console.log("1 OR 2 !");
        readline.close();
      } else {
        let mode = parseInt(number);
        if (typeof mode !== 'number' || isNaN(mode)) {
          console.log("1 OR 2 please !");
          readline.close();
        } else if (mode > 2 || mode < 1) {
          console.log('1 OR 2 please !');
        } else {
          if (mode === 1) {
            square();
            readline.close()
          }
          if (mode === 2) {
            fullszie();
            readline.close()
          }
        }
      }
    });
  })();