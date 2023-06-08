import { NextFunction, Request, Response, Router } from "express";

import { ApiError } from "../errors/api.error";
import { User } from "../models/user.model";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
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

router.get(
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

router.post(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const createdUser = await User.create(value);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/users/:userId",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const { userId } = req.params;
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...value },
        { returnDocument: "after" }
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
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
