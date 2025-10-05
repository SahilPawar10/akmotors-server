import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";
// Determine which env file to load
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

loadEnv({ path: envFile });

export default defineConfig({
  schema: "src/database/postgres/models/pg.models.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DB_URL!, // must be defined in both env files
  },
});
