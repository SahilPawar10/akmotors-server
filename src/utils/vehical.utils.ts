/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { status as httpStatus } from "http-status";
import { vehicles } from "../database/postgres/models/pg.models.js";
import { db } from "../database/postgres/pg.connection.js";
import ApiError from "./ApiError.js";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

export type newVehical = InferInsertModel<typeof vehicles>;
export type Vehicle = InferSelectModel<typeof vehicles>;

export class VehicleRepository {
  static addVehicle = async (data: newVehical) => {
    const checkVehical = await this.getSingleVehicalByRegistrationNo(data.registrationNumber);
    if (checkVehical) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Vehicle is already present");
    }
    const result = await db.insert(vehicles).values(data).returning();
    return result;
  };

  static getAllVehicals = async () => {
    const result = await db.select().from(vehicles);
    return result as Vehicle[];
  };

  static getSingleVehicalByRegistrationNo = async (registrationNumber: string) => {
    const result = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.registrationNumber, registrationNumber));
    return result[0] ?? null; // return null if not found
  };

  static getVehiclesByLocation = async (location: string) => {
    const result = await db.select().from(vehicles).where(eq(vehicles.location, location));
    return result ?? null; // return null if not found
  };
}
