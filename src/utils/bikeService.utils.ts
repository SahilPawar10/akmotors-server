/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { bikeServices } from "../database/postgres/models/pg.models";
import { db } from "../database/postgres/pg.connection";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

export type NewbikeServices = InferInsertModel<typeof bikeServices>;
export type bikeServices = InferSelectModel<typeof bikeServices>;

export class BikeServiceRepository {
  static addbikeServices = async (data: NewbikeServices) => {
    const result = await db.insert(bikeServices).values(data).returning();
    return result;
  };

  static getbikeServicess = async () => {
    const result = await db.select().from(bikeServices);
    return result as bikeServices[];
  };

  static getSinglebikeServicesUser = async (ownerNo: string) => {
    const result = await db.select().from(bikeServices).where(eq(bikeServices.ownerNo, ownerNo));
    return result[0] ?? null; // return null if not found
  };

  static getbikeServicessByLocation = async (location: string) => {
    const result = await db.select().from(bikeServices).where(eq(bikeServices.location, location));
    return result ?? null; // return null if not found
  };

  // 🔹 Get single bike service by ID
  static getSingleBikeServiceById = async (id: number) => {
    const result = await db.select().from(bikeServices).where(eq(bikeServices.id, id));

    return result.length ? result[0] : null;
  };

  // 🔹 Update single bike service by ID
  static updateSingleBikeServiceEntry = async (
    id: number,
    data: Partial<typeof bikeServices.$inferInsert>,
  ) => {
    const result = await db
      .update(bikeServices)
      .set(data)
      .where(eq(bikeServices.id, id))
      .returning(); // returns updated row(s)

    return result.length ? result[0] : null;
  };

  // 🔹 Delete single bike service by ID
  static deleteSingleBikeServiceEntry = async (id: number) => {
    const result = await db.delete(bikeServices).where(eq(bikeServices.id, id)).returning(); // returns deleted row(s)

    return result.length ? result[0] : null;
  };
}
