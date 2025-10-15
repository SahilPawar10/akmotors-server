import { Request, Response, NextFunction } from "express";
import { status as httpStatus } from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { StockRepository } from "../utils/stock.utils.js";
export class StocksController {
  static addNewStock = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stock = await StockRepository.createStock(req.body);
      res.status(httpStatus.CREATED).send(stock);
    } catch (error) {
      return next(error);
    }
  });

  static getAllStocks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // register logic here
      const stock = await StockRepository.getAllStocks();
      res.status(httpStatus.OK).send(stock);
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
