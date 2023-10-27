import mongoose from "mongoose";
import { User } from "./User";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    completed: { type: Boolean },
    slot: { type: String },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);
export { Task };
