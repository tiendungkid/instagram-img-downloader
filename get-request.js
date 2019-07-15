const req = require('request');
const fs = require("fs");
const express = require('express');
const app = express();
const pathLinks = "./result/response.json";
const bodyParser = require('body-parser')
const download = require('images-downloader').images;
const header = {'content-type' : 'application/x-www-form-urlencoded'};
const url = "http://tiendungkid2.000webhostapp.com/provided/";
const method = "POST";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let option = {
    headers: 'Request-Promise',
    url: url,
    method: method,
    form: {
        url:"/p/Bjy3rABAuHZ/"
    },
    json: true
};
/**
 * Run
 */
(async()=>{
    await req.post(option,(err, res,body)=>{
        if(err) console.log(err);
        else console.log(JSON.parse(res));
    })
})()