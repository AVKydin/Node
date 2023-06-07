import Joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGenders } from "../enums/User.enum";

export class UserValidator {
  static userName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(1).max(130);
  static gender = Joi.valid(EGenders);
  static email = Joi.string().regex(regexConstants.EMAIL).lowercase().trim();
  static password = Joi.string().regex(regexConstants.PASSWORD);

  static create = Joi.object({
    name: this.userName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });
  static update = Joi.object({
    name: this.userName,
    age: this.age,
    gender: this.gender,
  });
}
