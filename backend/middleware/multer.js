import multer from "multer";

// Store files in memory (so we can upload directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
