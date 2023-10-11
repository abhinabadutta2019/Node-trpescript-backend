import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true },
});

const Task = mongoose.model("task", taskSchema);

//

////////some helper functions////////////////////////
const getTasks = () => Task.find();
const getTaskByName = (name: string) => Task.findOne({ name: name });
const getTaskByID = (id: string) => Task.findOne({ id: id });
//
const createUser = (values: Record<string, any>) =>
  new Task(values).save().then((task) => task.toObject());

const deleteTaskByID = (id: string) => Task.findOneAndDelete({ _id: id });

//this syntax giving error - so, changed below
// const updateTaskByID = (id: string, values: Record<string, any>) =>
//   Task.findOneAndUpdate(id, values);

const updateTaskByID = (id: string, values: Record<string, any>) =>
  Task.findOneAndUpdate({ _id: id }, values);

// const createUser = async (values: Record<string, any>) => {
//   try {
//     const task = await new Task(values).save();
//     return task.toObject();
//   } catch (error) {
//     // Handle the error, e.g., log it or return an error response
//     console.error("Error creating user:", error);
//     // You can throw the error or return an error response based on your use case
//     throw error; // Rethrow the error to propagate it to the caller
//   }
// };

//exporting from here

export { Task };
