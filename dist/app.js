"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
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
const PORT = 5100;
app.listen(PORT, () => {
    console.log("Server OK ");
});
