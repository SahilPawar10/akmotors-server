import app from "./app.js";
import logger from "./config/logger.js";
import { connectMongoDb } from "./database/mongodb/mongo.connection.js";
import { connectNeon } from "./database/postgres/pg.connection.js";

const port: number | string = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to databases
    await connectMongoDb();
    await connectNeon();
    // Start server only after DBs are connected
    app.listen(port, () => {
      logger.info(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1); // Exit process if DB connection fails
  }
}

startServer();
