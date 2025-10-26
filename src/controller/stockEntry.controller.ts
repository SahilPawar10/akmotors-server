/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { status as httpStatus } from "http-status";
import catchAsync from "../utils/catchAsync";
import { StockEntryBookRepository } from "../utils/stockEntry.utils";
import { parseDateInfo } from "../services/commen";
export class StocksEntryController {
  static addNewStockEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dateInfo = parseDateInfo(req.body.date);

      const { date, ...rest } = req.body;

      const body = { ...dateInfo, ...rest };

      const entry = await StockEntryBookRepository.createStockEntry(body);
      return res.status(httpStatus.CREATED).send(entry);
    } catch (error) {
      return next(error);
    }
  });

  static getAllStocksEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // register logic here
      const entryBook = await StockEntryBookRepository.getAllStockEntries();
      const flattened = entryBook.map((entry) => ({
        ...entry.stock, // merge Stocks fields into root
        ...entry,
        stock: undefined, // remove nested stocks
      }));
      res.status(httpStatus.OK).send(flattened);
    } catch (error) {
      return next(error);
    }
  });

  static getStockBookData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // register logic here
      const stockBook = await StockEntryBookRepository.stocKBookData();
      res.status(httpStatus.OK).send(stockBook);
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
