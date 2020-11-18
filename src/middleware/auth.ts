import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto";
import { ValidateSignature } from "../utilities/PasswordUtility";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await ValidateSignature(req);

  if (validate) {
    next();
  } else {
    res.json({ message: "User not authorized" });
  }
};

export const verifyIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    const err = new Error("You are not authorized to perform this operation!");
    return next(err);
  } else {
    next();
  }
};
