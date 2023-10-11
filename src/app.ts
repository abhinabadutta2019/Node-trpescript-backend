import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { tasksRouter } from "./routers/task";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
dotenv.config();
//////////////////////////////////////////

///////mongoDB cloud//////////////////
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/new-MERN-backend?retryWrites=true&w=majority`;
//

async function connectToMongoDB() {
  try {
    //if mongoDB uri is correct
    //if it is connected
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    //if error in connection or - in mongoDB uri
    console.error("MongoDB connection error:", error);
  }
}

// Call the async function to connect to MongoDB
connectToMongoDB();

////////////////////////////////////////////
console.log("Hi1");

app.get("/", (req, res) => {
  res.send("Hello2");
});
// routes
app.use("/tasks", tasksRouter);

//
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => console.log(`server running at ${PORT}`));
//
