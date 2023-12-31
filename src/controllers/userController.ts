import { Request, Response } from "express";
import { User } from "../models/User";
import { UserSchema } from "../validators/userValidator";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//
const createToken = (_id: string) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

//
// const check = jwt.verify(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJjYTgwZDNjMTY5YjZhMTZlZjdlMDAiLCJpYXQiOjE2OTc0MzM2NDUsImV4cCI6MTY5NzQzNzI0NX0.jiRcnwbOP7olqeIYIGod7A5ZeKTEUCOenSqSJtlkENI",
//   process.env.JWT_SECRET as string
// );

// console.log(check, "check");

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json({ users: users });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//

const registerUser = async (req: Request, res: Response) => {
  try {
    //
    console.log(req.body, "req.body of registerUser");
    //
    const { username, password } = req.body;
    //

    //
    const validatedTask = UserSchema.safeParse({
      username: username,
      password: password,
    });
    //
    if (!validatedTask.success) {
      //zod messa in a string showing
      return res
        .status(400)
        .json({ error: fromZodError(validatedTask.error).message });
    }
    //
    const validatedData = validatedTask.data;
    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);
    //
    const user = new User({
      username: validatedData.username,
      password: hashedPassword,
    });
    await user.save();
    // jwt token
    const token = createToken(user._id.toString());

    res.json({
      //   message: "user created",
      token: token,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//
const loginUser = async (req: Request, res: Response) => {
  //
  console.log(req.body, "req.body of loginUser");
  //
  try {
    const { username, password } = req.body;
    // need to be findOne(find giving error )
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ messsage: "user not found" });
    }

    // console.log(user.password, "user");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    //
    console.log(user._id, "user._id");

    // jwt token
    const token = createToken(user._id.toString());
    //

    console.log(token, "token from loginUser controller/route ");

    res.status(200).json({
      //   message: "login successful",
      token: token,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const deletedUser = await User.findByIdAndDelete({ _id: user._id });
    res.status(200).json({ message: "user deleted" });
    //
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export { getAllUser, registerUser, loginUser, deleteUser };
