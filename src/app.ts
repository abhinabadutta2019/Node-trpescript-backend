import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package
import { tasksRouter } from "./routers/task";
import { userRouter } from "./routers/user";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
dotenv.config();

/////////////////////
// Configure CORS to allow requests from your frontend URL
const corsOptions = {
  origin: "https://mern-taskapp-frontend.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If your API supports cookies or authentication headers
};
//
app.use(cors(corsOptions));

////////////////////////
///////mongoDB cloud//////////////////
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/typescript-MERN-13-Oct-23?retryWrites=true&w=majority`;
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
app.use("/users", userRouter);

//
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server running at ${PORT}`));
//
