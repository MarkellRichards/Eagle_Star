import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { CreateUserInput } from "../dto";
import { User } from "../entity/User";
import { GeneratePassword } from "../utilities/PasswordUtility";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fName, lName, age, email, password, username } = <CreateUserInput>(
    req.body
  );

    const existingUser = await User.findOne({where: {email: email}})

  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const userPassword = await GeneratePassword(password);

  try {
    const user =  User.create({
      fName: fName,
      lName: lName,
      age: age,
      email: email,
      password: userPassword,
      username: username,
    });
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      const users = await User.find()

      if(users !== null) {
          return res.json(users)
      }

      return res.json({"message": "There are no users in the database"})
  }

export const getUserById = async (req: Request,
    res: Response,
    next: NextFunction ) => {
        const userId = req.params.id
        const user = await User.findOne(userId)

        if (user !== null) {
            return res.json(user)
        }
        return res.json({"message": "User not found"})
    }
