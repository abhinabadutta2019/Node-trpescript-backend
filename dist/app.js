"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON requests
dotenv_1.default.config();
console.log("Hi1");
app.get("/", (req, res) => {
    res.send("Hello2");
});
//
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`server running at ${PORT}`));
//
