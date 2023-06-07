// ДЗ:
//
// Винести базу даних в json.file, при створенні записувати туда нових юзерів через fs, при видаленні - видаляти
// При створенні валідацію на імія і вік, імя повинно бути більше 3 символів, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є

import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/user.model";
import { IUser } from "./types/user.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.userId);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const createdUser = await User.create(req.body);

      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { userId } = req.params;
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { returnDocument: "after" }
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get("/welcome", (req: Request, res: Response) => {
  console.log("WELCOME!!!");
  res.send("WELCOME!!!");
  // res.end();
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log("Server OK ");
});
