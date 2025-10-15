import { Request, Response, NextFunction } from "express";
import { status as httpStatus } from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { StockEntryBookRepository } from "../utils/stockEntry.utils.js";
export class StocksEntryController {
  static addNewStockEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entry = await StockEntryBookRepository.createStockEntry(req.body);
      res.status(httpStatus.CREATED).send(entry);
    } catch (error) {
      return next(error);
    }
  });

  static getAllStocksEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // register logic here
      const entryBook = await StockEntryBookRepository.getAllStockEntries();
      res.status(httpStatus.OK).send(entryBook);
    } catch (error) {
      return next(error);
    }
  });

  //   static locationWiseVehicle = catchAsync(
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         // register logic here
  //         const stock = await StockRepository.getVehiclesByLocation(req.body.location);
  //         res.status(httpStatus.OK).send(stock);
  //       } catch (error) {
  //         return next(error);
  //       }
  //     },
  //   );

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
