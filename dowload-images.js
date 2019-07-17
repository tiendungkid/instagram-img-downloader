const fs = require("fs");
const download = require('images-downloader').images;
const resultFolder = "./result";
const source = "./result/response.json";
(async () => {
    let links, ImgFailed = 0,
        Imgsuccess = 0;
    try {
        links = JSON.parse(fs.readFileSync(source, "utf8"));
        await download(links, resultFolder).then(result => {
            result.map(i => {
                if (i.status == "downloaded") Imgsuccess++;
                else ImgFailed++;
            })
        }).catch(error => ImgFailed++);
        console.log("Imgages Success: " + Imgsuccess);
        console.log("Imgages Failed: " + ImgFailed);
        console.log("Tatal Images: ", links.length);
    } catch (e) {
        console.log('Error to download images !');
        console.log(e);
    }
})();