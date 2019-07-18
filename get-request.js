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
let fullLinks = [];
let run = async (option) => {
    return new Promise((resolve, reject) => {
        req(option, (err, res, body) => {
            if (err) return reject({
                status: false,
                mess: "failed to connect server"
            });
            try {
                resolve({
                    status: true,
                    url: body.url
                });
            } catch (error) {
                reject({
                    status: false,
                    mess: "can't get url"
                });
            }
        })
    })
}
let writeSuccessLink = async (res) => {
    if (res.status) {
        fullLinks.push(res.url);
    }
};
(async () => {
    try {
        let success_link = 0,
            error_link = 0,
            links,
            totalLink = 0;
        links = JSON.parse(fs.readFileSync(pathLinks, "utf8"));
        totalLink = links.length;
        success_link = parseInt(success_link);
        error_link = parseInt(error_link);
        totalLink = parseInt(totalLink);
        await links.map(async (link, index) => {
            option.form.url = link;
            let res = await run(option);
            if (res.status) {
                success_link++;
                await writeSuccessLink(res);
            } else {
                error_link++;
            }
            if (success_link + error_link == totalLink) {
                console.log('Success: ' + success_link);
                console.log('Failed: ' + error_link);
                fs.writeFileSync(pathLinks, JSON.stringify(fullLinks), "utf8");
            }
        });
    } catch (e) {
        console.log('Has been error');
    }
})();