"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON requests
dotenv_1.default.config();
console.log("Hi1");
app.get("/", function (req, res) {
    res.send("Hello2");
});
//
var PORT = process.env.PORT || 3006;
app.listen(PORT, function () { return console.log("server running at ".concat(PORT)); });
