const req = require('request');
const fs = require("fs");
const pathLinks = "./result/response.json";
const url = "http://tiendungkid2.000webhostapp.com/provided/instagram-crawler/";
let option = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    url: url,
    method: "POST",
    form: {
        url: null
    },
    json: true
};
(async () => {
    try {
        let links, linkFullSize = [];
        let getLink = (option) => {
            return new Promise((resolve, reject) => {
                req(option, (err, res, body) => {
                    if (err) return reject(err);
                    try {
                        resolve(body.url);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
        }
        links = JSON.parse(fs.readFileSync(pathLinks, "utf8"));
        await links.map(
            (link, index) => {
                option.form.url = link;
                getLink(option)
                    .then(res => {
                        linkFullSize.push(res);
                        if (linkFullSize.length == links.length) {
                            fs.writeFileSync(pathLinks, JSON.stringify(linkFullSize), "utf8");
                            console.log('Get images link success !');
                        }
                    }).catch(err => {
                        console.log(err);
                    });
            });
    } catch (e) {
        console.log('Has been error \n', e);
    }
})();