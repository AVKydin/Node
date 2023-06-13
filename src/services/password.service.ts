import bcrypt from "bcrypt";

import { configs } from "../configs/config";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, configs.SECRET_SALT);
  }
  public async compare(
    password: string,
    hashedRassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedRassword);
  }
}

export const passwordService = new PasswordService();
