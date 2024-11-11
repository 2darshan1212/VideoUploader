// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import storyRoutes from "./routes/storyRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
//middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/stories", storyRoutes);

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
