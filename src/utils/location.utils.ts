/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { status as httpStatus } from "http-status";
import { location } from "../database/postgres/models/pg.models";
import { db } from "../database/postgres/pg.connection";
import ApiError from "./ApiError";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

export type NewLocation = InferInsertModel<typeof location>;
export type Location = InferSelectModel<typeof location>;

export class LocationRepository {
  static addLocation = async (data: NewLocation) => {
    const checkVillage = await this.getSingleLocationByName(data.villageName);
    if (checkVillage) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Village Name is already present");
    }
    const result = await db.insert(location).values(data).returning();
    return result;
  };

  static getLocations = async () => {
    const result = await db
      .select({
        id: location.id,
        villageName: location.villageName,
        region: location.region,
        taluka: location.taluka,
      })
      .from(location);
    return result as Location[];
  };

  static getSingleLocationByName = async (name: string) => {
    const result = await db.select().from(location).where(eq(location.villageName, name));
    return result[0] ?? null; // return null if not found
  };

  static getLocationsByRegion = async (region: string) => {
    const result = await db.select().from(location).where(eq(location.region, region));
    return result ?? null; // return null if not found
  };
}
