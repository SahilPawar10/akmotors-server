/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { bikeServices } from "../database/postgres/models/pg.models";
import { db } from "../database/postgres/pg.connection";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { parseDateInfo } from "../services/commen";
import { VehicleRepository } from "./vehical.utils";

export type NewbikeServices = InferInsertModel<typeof bikeServices>;
export type bikeServices = InferSelectModel<typeof bikeServices>;

export class BikeServiceRepository {
  static addbikeServices = async (data: NewbikeServices) => {
    const { serviceDate, ...rest } = data;
    const dateInfo = parseDateInfo(serviceDate);
    const body = {
      ...rest,
      serviceDate: dateInfo.date,
      month: dateInfo.month,
      year: String(dateInfo.year),
    };
    //
    const vehicle = await VehicleRepository.getSingleVehicalByRegistrationNo(data.vehicleNo);
    if (!vehicle) {
      // create vehical entry
      const vehicalData = {
        name: data.bikeName,
        ownerName: data.ownerName,
        ownerNo: data.ownerNo,
        registrationNumber: data.vehicleNo,
        location: data.location,
      };
      await VehicleRepository.addVehicle(vehicalData);
    }
    const result = await db.insert(bikeServices).values(body).returning();
    return result;
  };

  static getbikeServicess = async () => {
    const result = await db
      .select({
        date: bikeServices.serviceDate,
        bikeName: bikeServices.bikeName,
        vehicle: bikeServices.vehicleNo,
        partUsed: bikeServices.partUsed,
        partPrice: bikeServices.partPrice,
        labourCharge: bikeServices.labourCharge,
        serviceType: bikeServices.serviceType,
        customerName: bikeServices.ownerName,
        location: bikeServices.location,
      })
      .from(bikeServices);
    return result;
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
