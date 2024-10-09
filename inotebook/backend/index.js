import connectDB from "./db.js";
import express from "express";
import authRoute from "./routes/auth.js";
import noteRoute from "./routes/notes.js";
const app = express();
const PORT = 8000;

//this is a middleware
app.use(express.json());

//available routes
app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
