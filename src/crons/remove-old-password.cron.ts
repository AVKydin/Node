import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { OldPassword } from "../models/oldPassword.model";

dayjs.extend(utc);
const oldPasswordsRemover = async () => {
  const previousYaer = dayjs().utc().subtract(1, "year");

  await OldPassword.deleteMany({
    createdAt: { $lte: previousYaer },
  });
};

export const removeOldPasswods = new CronJob(
  "0 0 0 * * *",
  oldPasswordsRemover
);
