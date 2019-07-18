// const req = require('request');
// const fs = require("fs");
// const pathLinks = "./result/response.json";
// const url = "http://tiendungkid2.000webhostapp.com/provided/instagram-crawler/";
// let option = {
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//     },
//     url: url,
//     method: "POST",
//     form: {
//         url: null
//     },
//     json: true
// };
// let run = async (option)=>{
//         return new Promise((resolve, reject) => {
//             req(option, (err, res, body) => {
//                 if (err) return reject(err);
//                 try {
//                     resolve(body.url);
//                 } catch (error) {
//                     reject(error);
//                 }
//             })
//         })
// };
// (async () => {
//     try {
//         let links, linkFullSize = [];
//         links = JSON.parse(fs.readFileSync(pathLinks, "utf8"));
//         let success_link = 0, error_link = 0;
//         await links.map(
//             (link, index) => {
//                 option.form.url = link;
//                 getLink(option)
//                     .then(res => {
//                         success++;
//                         linkFullSize.push(res);
//                         console.log(index + "Succ");
//                         if ((success_link+error_link) == links.length) {
//                             fs.writeFileSync(pathLinks, JSON.stringify(linkFullSize), "utf8");
//                         }
//                     }).catch(err => {
//                         error_link++;
//                         console.log(index + "Err");
//                     });
//             });
//     } catch (e) {
//         console.log('Has been error \n', e);
//     }
// })();
// maintenance