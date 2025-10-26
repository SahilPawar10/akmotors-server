/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { status as httpStatus } from "http-status";
import catchAsync from "../utils/catchAsync";
import { StockRepository } from "../utils/stock.utils";
import ApiError from "../utils/ApiError";
import { convertExcelBufferFileToJsonUsingXlsx, generateExcelFileBuffer } from "../services/commen";
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

  static importStockData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "No File Found ..!");
      }

      const jsonData = convertExcelBufferFileToJsonUsingXlsx(req.file.buffer) as any;
      const requiredFields = ["partName", "position", "partCode", "partCategoty", "partDesc"];

      const invalidRows: any[] = [];

      jsonData.forEach((row: { [x: string]: any }, index: number) => {
        const missingFields = requiredFields.filter(
          (field) => !row[field] || String(row[field]).trim() === "",
        );

        if (missingFields.length > 0) {
          invalidRows.push({ row: index + 2, missingFields }); // Excel rows start at 1 + header
          return;
        }
      });

      if (invalidRows.length > 0) {
        // throw new ApiError(
        //   httpStatus.BAD_REQUEST,
        //   `Invalid rows found:\n${invalidRows.map((r) => `Row ${r.row} missing: ${r.missingFields.join(", ")}`).join("\n")}`,
        // );

        return res
          .status(httpStatus.BAD_REQUEST)
          .send(
            `Invalid rows found:\n${invalidRows.map((r) => `Row ${r.row} missing: ${r.missingFields.join(", ")}`).join("\n")}`,
          );
      }

      // register logic here
      const stock = await StockRepository.insertBulkStocks(jsonData);
      res.status(httpStatus.OK).send(stock);
    } catch (error) {
      return next(error);
    }
  });

  static exportSampleStocks = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const requiredFields = ["partName", "position", "partCode", "partCategoty", "partDesc"];
      const excel = generateExcelFileBuffer([], requiredFields, "stocks");

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
      res.setHeader("Content-Disposition", 'attachment; filename="stock-sample.xlsx"');

      return res.status(httpStatus.OK).end(excel);
    },
  );

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
