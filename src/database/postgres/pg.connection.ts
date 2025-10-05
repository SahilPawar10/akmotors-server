import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import config from "../../config/config.js";

const pool = new Pool({
  connectionString: config.postgres.url,
  ssl: { rejectUnauthorized: false },
});

// Initialize Drizzle ORM
export const db = drizzle(pool);

// Optional: test connection
export const connectNeon = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to Neon at:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Neon connection error:", err);
    throw err;
  }
};
