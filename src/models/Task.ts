import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    completed: { type: Boolean },
    slot: { type: String },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);
export { Task };
