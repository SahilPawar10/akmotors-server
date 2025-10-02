import app from "./app.js";
import logger from "./config/logger.js";
import { connectMongoDb } from "./database/mongodb/mongo.connection.js";

const port: number | string = process.env.PORT || 3000;

await connectMongoDb();

app.listen(port, () => {
  logger.info(`🚀 Server running on port ${port}`);
});
