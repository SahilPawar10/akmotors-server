/* eslint-disable @typescript-eslint/no-unused-vars */
import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request } from "express";

// Option 1: Save to disk
// const multerStorage: StorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// Option 2: Save in memory (Buffer in req.file.buffer)
const multerStorage: StorageEngine = multer.memoryStorage();

// Optional filter for images only
// const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new ApiError(400, "Please upload a JPEG or JPG type of image"));
//   }
// };

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

// Wrapper to handle single file uploads
export const uploadFile = (key: string) => upload.single(key);
