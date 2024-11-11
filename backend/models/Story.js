// models/Story.js
import mongoose from "mongoose";
// const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ["video"], required: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" }, // Automatically delete after 24 hours
});

export default mongoose.model("Story", storySchema);
