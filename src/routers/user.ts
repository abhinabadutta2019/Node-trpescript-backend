import { User } from "../models/User";
import { Router } from "express";
const router = Router();
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
    const user = await User.find({ username: username });

    console.log(user, "user");

    res.json(user);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//
export { router as userRouter };
