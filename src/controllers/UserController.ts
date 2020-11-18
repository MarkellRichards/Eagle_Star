import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  if (users !== null) {
    return res.json(users);
  }

  return res.json({ message: "There are no users in the database" });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findOne(userId);

  if (user !== null) {
    return res.json(user);
  }
  return res.json({ message: "User not found" });
};
