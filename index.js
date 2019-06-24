const fs = require('fs');
const puppeteer = require('puppeteer-core');
const download = require('images-downloader').images;
const resultFile = "./result/response.json";
const resultFolder = "./result";
let option = {
    headless: true,
    // headless: false,
    defaultViewport: false,
    executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
};
(async () => {
    let Imgsuccess = 0;
    let ImgFailed = 0;
    let url = "https://www.instagram.com/tiendungkid/";
    if(!fs.existsSync('./result')) fs.mkdirSync("./result");
    const browser = await puppeteer.launch(option);
    const page = await browser.newPage();
    await page.goto(url);
    const items = await scrapeInfiniteScrollItems(page, extractItems, 100);
    let dataJson = JSON.stringify(items);
    fs.writeFileSync(resultFile,dataJson,(err)=>{
      console.log("Write json success !");
    });
    await download(items, resultFolder)
    .then(result => {
      result.map(i=>{
        if(i.status=="downloaded"){
          Imgsuccess++;
        }else{
          ImgFailed++;
        }
      })
    })
    .catch(error => ImgFailed++);
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
      await page.waitForFunction("document.body.scrollHeight > " + currentHeight);
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