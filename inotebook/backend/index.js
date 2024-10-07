import connectDB from "./db.js";
import express from "express";
const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});