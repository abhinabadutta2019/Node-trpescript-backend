import { User } from "../models/User";
import { Router } from "express";
const router = Router();
import { UserSchema } from "../validators/userValidator";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";

import {
  getAllUser,
  registerUser,
  loginUser,
  deleteUser,
} from "../controllers/userController";

//
router.get("/", getAllUser);
router.post("/", registerUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
//login

//
export { router as userRouter };
