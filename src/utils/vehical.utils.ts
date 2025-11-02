/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { status as httpStatus } from "http-status";
import { vehicles } from "../database/postgres/models/pg.models";
import { db } from "../database/postgres/pg.connection";
import ApiError from "./ApiError";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import User from "../database/mongodb/models/user.model";

export type newVehical = InferInsertModel<typeof vehicles>;
export type Vehicle = InferSelectModel<typeof vehicles>;

export class VehicleRepository {
  static addVehicle = async (data: newVehical) => {
    const checkVehical = await this.getSingleVehicalByRegistrationNo(data.registrationNumber);
    if (checkVehical) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Vehicle is already present");
    }
    const isMobileTaken = await User.isMobileTaken(Number(data.ownerNo), undefined);

    if (!isMobileTaken) {
      const [firstName, ...rest] = data.ownerName.trim().split(" ");
      const lastName = rest.join(" ") || ""; // handle cases with single names safely

      const userObj = {
        firstName,
        lastName,
        number: Number(data.ownerNo),
        password: "akm@123",
      };

      await User.create(userObj);
    }
    // if user nor present with mobile create user entry;
    const result = await db.insert(vehicles).values(data).returning();
    return result;
  };

  static getAllVehicals = async () => {
    const result = await db
      .select({
        vehicalName: vehicles.name,
        ownerName: vehicles.ownerName,
        ownerNo: vehicles.ownerNo,
        vehicleNo: vehicles.registrationNumber,
        location: vehicles.location,
      })
      .from(vehicles);
    return result;
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
