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
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./configs/config");
const users_1 = require("./users");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const pathJoin = node_path_1.default.join("users.json");
app.get("/users", (req, res) => {
    res.json(users_1.users);
});
app.get("/users/:userId", (req, res) => {
    const { userId } = req.params;
    const user = users_1.users[+userId - 1];
    if (!user) {
        res.status(404).json({
            message: "юзер з таким id відсутній",
        });
    }
    else {
        res.status(200).json(user);
    }
});
app.post("/users", (req, res) => {
    const body = req.body;
    if (body.name.length > 3 &&
        body.age > -1 &&
        typeof body.status === "boolean") {
        users_1.users.push(body);
        const usersStringify = JSON.stringify(users_1.users);
        node_fs_1.default.writeFile(pathJoin, usersStringify, (err) => {
            if (err)
                throw new Error(err.message);
        });
        res.status(201).json({
            message: "User created!",
        });
    }
    else {
        res.status(404).json({
            message: "імя повинно бути більше 3 символів, вік – не менше нуля та status - boolean",
        });
    }
});
app.put("/users/:userId", (req, res) => {
    const { userId } = req.params;
    users_1.users[+userId - 1] = req.body;
    console.log(req.body);
    if (+userId > users_1.users.length || +userId < 1) {
        res.status(404).json({
            message: "юзер з таким id відсутній",
        });
    }
    else {
        const usersStringify = JSON.stringify(users_1.users);
        node_fs_1.default.writeFile(pathJoin, usersStringify, (err) => {
            if (err)
                throw new Error(err.message);
        });
        res.status(200).json({
            message: "User updated!",
            data: users_1.users[+userId],
        });
    }
});
app.delete("/users/:userId", (req, res) => {
    const { userId } = req.params;
    if (+userId > users_1.users.length || +userId < 1) {
        res.status(404).json({
            message: "юзер з таким id відсутній",
        });
    }
    else {
        users_1.users.splice(+userId - 1, 1);
        const usersStringify = JSON.stringify(users_1.users);
        node_fs_1.default.writeFile(pathJoin, usersStringify, (err) => {
            if (err)
                throw new Error(err.message);
        });
        res.status(200).json({
            message: "User deleted!",
        });
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
