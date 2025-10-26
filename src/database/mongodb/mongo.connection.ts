import mongoose from "mongoose";
import config from "../../config/config";
import logger from "../../config/logger";

export async function connectMongoDb() {
  try {
    await mongoose.connect(config.mongoose.url, {}).then(() => {
      logger.info("Connected to MongoDB");
    });
  } catch (err) {
    logger.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop the app if DB fails
  }
}
