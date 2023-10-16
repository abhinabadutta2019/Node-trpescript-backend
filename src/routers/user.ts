import { User } from "../models/User";
import { Router } from "express";
const router = Router();

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
    const user = new User({
      username: username,
      password: password,
    });
    await user.save();

    res.json({ user: user });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//
export { router as userRouter };
