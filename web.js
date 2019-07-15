const express = require("express");
const app = express();
const server = require("http").Server(app).listen("3000",()=>{
    console.log("Listen -*- 3000");
});