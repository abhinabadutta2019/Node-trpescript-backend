import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
dotenv.config();

console.log("Hi1");

app.get("/", (req, res) => {
  res.send("Hello");
});

//
const PORT = process.env.PORT || 3007;

app.listen(PORT, () => console.log(`server running at ${PORT}`));
