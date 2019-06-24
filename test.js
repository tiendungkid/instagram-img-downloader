const fs = require('fs');
const puppeteer = require('puppeteer');
let option = {
    // headless: true,
    headless: false,
    defaultViewport: false,
    executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
};
(async () => {
    const browser = await puppeteer.launch(option);
    const page = await browser.newPage();
    let url = "https://www.instagram.com/linhyasha/";
    await page.goto(url);
    const items = await scrapeInfiniteScrollItems(page, 100);
    console.log(items);
    await browser.close()
    console.log("Images: ",items.length);
})();
async function scrapeInfiniteScrollItems(
    page,
    extractItems,
    itemTargetCount,
    scrollDelay = 1000,
  ) {
    let items = [];
    try {
      let previousHeight;
      while (items.length < itemTargetCount) {
        items = await page.evaluate(extractItems);
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
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