// routes/storyRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";
import Story from "../models/Story.js";
const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Not a video file!"), false);
    }
  },
});

// Upload Story
router.post("/upload", upload.single("media"), async (req, res) => {
  try {
    const videoFile = req.file;

    // Upload to Cloudinary
    cloudinary.uploader
      .upload_stream(
        { resource_type: "video", timeout: 60000, chunk_size: 60000000 },
        async (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "Failed to upload video to Cloudinary" });
          }

          const newStory = new Story({
            mediaUrl: result.secure_url,
            mediaType: "video",
          });

          await newStory.save();
          res.status(201).json(newStory);
        }
      )
      .end(videoFile.buffer);
  } catch (error) {
    res.status(500).json({ message: "Error uploading story" });
  }
});

// Get All Stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories" });
  }
});

export default router;
