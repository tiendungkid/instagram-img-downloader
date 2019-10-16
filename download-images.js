const fs = require("fs");
const download = require('image-downloader')
const resultFolder = "./result";
const source = "./result/response.json";
(async () => {
    let links, totalLink;
    let ImgFailed = 0,
        Imgsuccess = 0;
    let options = {
        url: null,
        dest: resultFolder
    };
    let readLinkImages = async () => {
        return JSON.parse(fs.readFileSync(source, "utf8"));
    };
    try {
        links = await readLinkImages();
        totalLink = links.length;
        let getStatus = (stt) => {
            if (stt) {
                Imgsuccess++;
            } else {
                ImgFailed++;
            }
            if (Imgsuccess + ImgFailed == totalLink) {
                console.log("Tatal Images: ", totalLink);
                console.log("Imgages Success: " + Imgsuccess);
                console.log("Imgages Failed: " + ImgFailed);
            }
        };
        links.map(link => {
            options.url = link;
            download.image(options)
                .then(() => {
                    getStatus(true);
                })
                .catch(() => {
                    getStatus(false);
                })
        });
    } catch (e) {
        console.log('Error to download images. Please Check !');
    }
})();