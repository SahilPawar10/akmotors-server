import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

// Vehicle table
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  ownerNo: integer("owner_no").unique().notNull(),
  registrationNumber: varchar("registration_number", { length: 50 }).unique(),
  location: varchar("location", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
