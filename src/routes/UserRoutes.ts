import express from "express";
import { getUserById, getUsers } from "../controllers";
import { Authenticate, verifyIsAdmin } from "../middleware";

const router = express.Router();

router.use(Authenticate);
router.get("/allUsers", verifyIsAdmin, getUsers);
router.get("/:id", getUserById);

export { router as UserRoute };
