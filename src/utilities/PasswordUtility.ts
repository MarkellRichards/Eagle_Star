import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../dto";

export const GeneratePassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const GenerateSignature = (payload: UserPayload) => {
  return jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1d" });
};

export const ValidatePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

export const ValidateSignature = async (req: Request) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = await jwt.verify(
      signature.split(" ")[1],
      process.env.APP_SECRET
    );

    req.user = payload;

    return true;
  }

  return false;
};
