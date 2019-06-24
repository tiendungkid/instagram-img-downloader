const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require("express");
const app = express();
const server = require("http").Server(app).listen("3000",()=>{
    console.log("Listen -*- 3000");
});
let option = {
    // headless: true,
    headless: false,
    defaultViewport: false,
    executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
}
const extractItems = async ()=>{
    const extractedElements = Array.from(document.querySelectorAll('article img'));
    const items = extractedElements.map(i => i.getAttribute("src"));
    return items;
}
const Main = async (url,m) => {
    const browser = await puppeteer.launch(option);
    const page = await browser.newPage();
    await page.goto(url);
    const items = await scrapeInfiniteScrollItems(page, extractItems,m, 100);
    await browser.close();
    return items;
}
app.get("/",async (req,res)=>{
    let url = req.query.url;
    let m = req.query.m;
    try{
        m = parseInt(m);
        if(url!==""&&url!==undefined&&url!==NaN&&url!==null&&m!==""&&m!==undefined&&m!==NaN&&m!==null&&typeof m =='number'){
            let items = await Main(url,m);
            res.send(items);
        }else{
            res.send("Value error !");
        }
    }catch(e){
        res.send("Value error !");
    }
})
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