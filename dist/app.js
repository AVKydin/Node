"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./configs/config");
const user_model_1 = require("./models/user.model");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", async (req, res) => {
    try {
        const users = await user_model_1.User.find();
        return res.json(users);
    }
    catch (e) {
        console.log(e);
    }
});
app.get("/users/:userId", async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.userId);
        return res.json(user);
    }
    catch (e) {
        console.log(e);
    }
});
app.post("/users", async (req, res) => {
    try {
        const createdUser = await user_model_1.User.create(req.body);
        return res.status(201).json(createdUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.put("/users/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await user_model_1.User.findOneAndUpdate({ _id: userId }, { ...req.body }, { returnDocument: "after" });
        return res.status(200).json(updatedUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.delete("/users/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        await user_model_1.User.deleteOne({ _id: userId });
        return res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
    }
});
app.get("/welcome", (req, res) => {
    console.log("WELCOME!!!");
    res.send("WELCOME!!!");
});
app.listen(config_1.configs.PORT, () => {
    mongoose.connect(config_1.configs.DB_URL);
    console.log("Server OK ");
});
