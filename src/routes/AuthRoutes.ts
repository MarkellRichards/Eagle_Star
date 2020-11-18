import express from "express";
import { CreateUser, UserLogin } from "../controllers";

const router = express.Router();

router.post("/signup", CreateUser);
router.post("/login", UserLogin);

export { router as AuthRoute };
