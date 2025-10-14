import { Request, Response, NextFunction } from "express";
import { status as httpStatus } from "http-status";
import catchAsync from "../utils/catchAsync.js";
// import { db } from "../database/postgres/pg.connection.js";
// import { location } from "../database/postgres/models/pg.models.js";
import { LocationRepository } from "../utils/location.utils.js";
export class LocationController {
  static addLocation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const location = await LocationRepository.addLocation(req.body);
      res.status(httpStatus.CREATED).send(location);
    } catch (error) {
      return next(error);
    }
  });

  static getAllLocation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // get single if village passed
    // get region wise location if region passed
    // get all location
    try {
      // register logic here
      const location = await LocationRepository.getLocations();
      res.status(httpStatus.OK).send(location);
    } catch (error) {
      return next(error);
    }
  });

  static regionWiseLocation = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // register logic here
        const location = await LocationRepository.getLocationsByRegion(req.body.region);
        res.status(httpStatus.OK).send(location);
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
