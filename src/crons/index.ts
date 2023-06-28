import { removeOldPasswods } from "./remove-old-password.cron";
import { removeOldTokens } from "./remove-old-tokens.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswods.start();
};
