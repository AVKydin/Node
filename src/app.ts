import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import * as mongoose from "mongoose";
import * as swaggerUI from "swagger-ui-express";

import { configs } from "./configs/config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

const apiLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
});

app.use("/*", apiLimiter);
app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: ["Authorization", "Content-Type", "Origin"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRUD - create, read, update, delete

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});
