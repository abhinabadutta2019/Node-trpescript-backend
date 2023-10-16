import { User } from "../models/User";
import { Router } from "express";
const router = Router();
import { z } from "zod";
import { UserSchema, IUser } from "../validators/userValidator";
import bcrypt from "bcryptjs";

//
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users: users });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
//
router.post("/", async (req, res) => {
  try {
    //
    //
    console.log(req.body, "req.body");
    //
    const { username, password } = req.body;
    //
    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    await user.save();

    res.json({ user: user });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // need to be findOne(find giving error )
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ messsage: "user not found" });
    }

    console.log(user.password, "user");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ user: user });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//
export { router as userRouter };
