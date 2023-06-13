import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IUser } from "../types/user.type";
import { passwordService } from "./password.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const heshedPassword = await passwordService.hash(data.password);
      await User.create({ ...data, password: heshedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
