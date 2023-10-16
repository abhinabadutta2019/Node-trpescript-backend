"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginUser = exports.registerUser = exports.getAllUser = void 0;
const User_1 = require("../models/User");
const userValidator_1 = require("../validators/userValidator");
const zod_validation_error_1 = require("zod-validation-error");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id: _id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
//
// const check = jwt.verify(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJjYTgwZDNjMTY5YjZhMTZlZjdlMDAiLCJpYXQiOjE2OTc0MzM2NDUsImV4cCI6MTY5NzQzNzI0NX0.jiRcnwbOP7olqeIYIGod7A5ZeKTEUCOenSqSJtlkENI",
//   process.env.JWT_SECRET as string
// );
// console.log(check, "check");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({});
        res.json({ users: users });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.getAllUser = getAllUser;
//
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        console.log(req.body, "req.body of registerUser");
        //
        const { username, password } = req.body;
        //
        //
        const validatedTask = userValidator_1.UserSchema.safeParse({
            username: username,
            password: password,
        });
        //
        if (!validatedTask.success) {
            //zod messa in a string showing
            return res
                .status(400)
                .json({ error: (0, zod_validation_error_1.fromZodError)(validatedTask.error).message });
        }
        //
        const validatedData = validatedTask.data;
        // Generate a salt and hash the user's password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(validatedData.password, salt);
        //
        const user = new User_1.User({
            username: validatedData.username,
            password: hashedPassword,
        });
        yield user.save();
        // jwt token
        const token = createToken(user._id.toString());
        res.json({
            //   message: "user created",
            token: token,
            username: user.username,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.registerUser = registerUser;
//
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    console.log(req.body, "req.body of loginUser");
    //
    try {
        const { username, password } = req.body;
        // need to be findOne(find giving error )
        const user = yield User_1.User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ messsage: "user not found" });
        }
        console.log(user.password, "user");
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        //
        console.log(user._id, "user._id");
        // jwt token
        const token = createToken(user._id.toString());
        //
        console.log(token, "token");
        res.status(200).json({
            //   message: "login successful",
            token: token,
            username: user.username,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.loginUser = loginUser;
//
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        const deletedUser = yield User_1.User.findByIdAndDelete({ _id: user._id });
        res.status(200).json({ message: "user deleted" });
        //
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.deleteUser = deleteUser;
