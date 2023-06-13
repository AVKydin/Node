import { model, Schema } from "mongoose";

import { EGenders } from "../enums/User.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      nim: [1, "Minimum 1"],
      max: [130, "Maximum 130"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
