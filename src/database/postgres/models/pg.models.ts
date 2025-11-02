import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";

// Vehicle table
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  ownerNo: varchar("owner_no", { length: 20 }).unique().notNull(),
  ownerName: varchar("owner_name", { length: 100 }).notNull(),
  registrationNumber: varchar("registration_number", { length: 255 }).unique().notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Location table
export const location = pgTable("location", {
  id: serial("id").primaryKey(),
  villageName: varchar("village_name", { length: 255 }).notNull().unique(),
  region: varchar("region", { length: 255 }).notNull(),
  taluka: varchar("taluka", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// bike-service

export const bikeServices = pgTable("bike_services", {
  id: serial("id").primaryKey(),
  serviceDate: varchar("service_date", { length: 255 }).notNull(),
  ownerName: varchar("owner_name", { length: 255 }).notNull(),
  ownerNo: varchar("owner_no", { length: 20 }).notNull(),
  bikeName: varchar("bike_name", { length: 100 }).notNull(),
  vehicleNo: varchar("vehicle_no", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  partUsed: varchar("part_used", { length: 150 }),
  partPrice: integer("part_price"),
  labourCharge: integer("labour_charge"),
  serviceType: varchar("service_type", { length: 255 }).notNull(),
  month: varchar("month", { length: 50 }).notNull(),
  year: varchar("year", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
