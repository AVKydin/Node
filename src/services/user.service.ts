import { User } from "../models/user.model";
import { IUser } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await User.find().select("-password");
  }

  public async create(data: IUser): Promise<IUser> {
    return await User.create({ ...data });
  }

  public async findById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  // public async findOneAndUpdate({ _id: userId }:string,
  //                               { ...value },
  //                               { returnDocument: "after" }){
  //   return User.findOneAndUpdate()
  //
  // }

  // public async deleteOne({ _id: userId }): Promise<IUser> {
  //   return User.deleteOne({_id});
  // }
}

export const userService = new UserService();
