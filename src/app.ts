// ДЗ:
//
// Винести базу даних в json.file, при створенні записувати туда нових юзерів через fs, при видаленні - видаляти
// При створенні валідацію на імія і вік, імя повинно бути більше 3 символів, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є

import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  return res.status(status).json(error.message);
});

// app.get("/welcome", (req: Request, res: Response) => {
//   console.log("WELCOME!!!");
//   res.send("WELCOME!!!");
//   // res.end();
// });

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log("Server OK ");
});
