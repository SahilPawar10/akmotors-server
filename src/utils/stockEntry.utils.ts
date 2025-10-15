/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import { status as httpStatus } from "http-status";
import StocksEntry, { IStocksEntry } from "../database/mongodb/models/stocksEntry.model.js";
import ApiError from "./ApiError.js";

export class StockEntryBookRepository {
  /**
   * Create a user
   * @param stockEntryBody
   * @returns {Promise<IStocksEntry>}
   */
  static createStockEntry = async (stockBody: Partial<IStocksEntry>) => {
    return StocksEntry.create(stockBody);
  };

  /**
   * Get users without photo
   * @returns {Promise<IStocksEntry[]>}
   */
  static getAllStockEntries = async (): Promise<IStocksEntry[]> =>
    StocksEntry.find().select("-createdAt -updatedAt").exec();

  /**
   * Get user by id
   * @param id
   * @returns {Promise<IStocksEntry | null>}
   */
  static getStockEntryById = async (id: string): Promise<IStocksEntry | null> =>
    StocksEntry.findById(id).select("-createdAt -updatedAt").exec();

  /**
   * Update user by id
   * @param id
   * @param updateBody
   * @returns {Promise<IStocksEntry>}
   */
  static updateStockById = async (
    id: string,
    updateBody: Partial<IStocksEntry>,
  ): Promise<IStocksEntry> => {
    const stockEntry = await this.getStockEntryById(id);
    if (!stockEntry) {
      throw new ApiError(httpStatus.NOT_FOUND, "Stock Entry not found");
    }

    Object.assign(stockEntry, updateBody);
    await stockEntry.save();
    return stockEntry;
  };

  /**
   * Delete user by id
   * @param stockId
   * @returns {Promise<IStocks>}
   */
  static deleteStockById = async (stockId: string): Promise<IStocks> => {
    const stockEntry = await this.getStockEntryById(stockId);
    if (!stockEntry) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    // await user.remove();
    return stockEntry;
  };
}
