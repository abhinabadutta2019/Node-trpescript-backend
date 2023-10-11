import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true },
});

const Task = mongoose.model("task", taskSchema);
export { Task };
