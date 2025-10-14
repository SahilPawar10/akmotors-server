import { Request, Response, NextFunction } from "express";
import { status as httpStatus } from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { VehicleRepository } from "../utils/vehical.utils.js";
export class BikeServiceController {
  static addBikeServiceEntry = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const vehical = await VehicleRepository.addVehicle(req.body);
        res.status(httpStatus.CREATED).send(vehical);
      } catch (error) {
        return next(error);
      }
    },
  );

  static getAllVehicle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // get single if village passed
    // get region wise location if region passed
    // get all location
    try {
      // register logic here
      const vehical = await VehicleRepository.getAllVehicals();
      res.status(httpStatus.OK).send(vehical);
    } catch (error) {
      return next(error);
    }
  });

  static locationWiseVehicle = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // register logic here
        const vehical = await VehicleRepository.getVehiclesByLocation(req.body.location);
        res.status(httpStatus.OK).send(vehical);
      } catch (error) {
        return next(error);
      }
    },
  );

  // static updateLocation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // register logic here
  //     const user = await UserRepository.createUser(req.body);
  //     const tokens = await TokenRepository.generateAuthTokens(user);
  //     res.status(httpStatus.CREATED).send({ user, tokens });
  //   } catch (error) {
  //     return next(error);
  //   }
  // });

  // static deleteLocation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // register logic here
  //     const user = await UserRepository.createUser(req.body);
  //     const tokens = await TokenRepository.generateAuthTokens(user);
  //     res.status(httpStatus.CREATED).send({ user, tokens });
  //   } catch (error) {
  //     return next(error);
  //   }
  // });

  // static getSingleLocatiom = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // register logic here
  //     const user = await UserRepository.createUser(req.body);
  //     const tokens = await TokenRepository.generateAuthTokens(user);
  //     res.status(httpStatus.CREATED).send({ user, tokens });
  //   } catch (error) {
  //     return next(error);
  //   }
  // });
}
