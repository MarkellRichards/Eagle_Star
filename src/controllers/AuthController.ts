import { NextFunction, Request, Response } from "express";
import { CreateUserInput, UserLoginInput } from "../dto";
import { User } from "../entity/User";
import {
  GeneratePassword,
  GenerateSignature,
  ValidatePassword,
} from "../utilities/PasswordUtility";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fName, lName, age, email, password, username, role } = <
    CreateUserInput
  >req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const userPassword = await GeneratePassword(password);
  try {
    const user = User.create({
      fName: fName,
      lName: lName,
      age: age,
      email: email,
      password: userPassword,
      username: username,
      role,
    });
    await user.save();
    return res.status(201).json({
      user: user,
      token: GenerateSignature({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      }),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const UserLogin = async (req: Request, res: Response) => {
  const { email, password } = <UserLoginInput>req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser !== null) {
    //validate user password
    const validation = await ValidatePassword(password, existingUser.password);

    if (validation) {
      const signature = GenerateSignature({
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        role: existingUser.role,
      });
      return res.json(signature);
    } else {
      return res.json({ message: "Invalid password" });
    }
  }

  return res.json({ message: "Login credential not valid" });
};
