/* eslint-disable arrow-body-style */
import { status as httpStatus } from "http-status";
import Stocks, { IStocks } from "../database/mongodb/models/stocks.model.js";
import ApiError from "./ApiError.js";

export class StockRepository {
  /**
   * Create a user
   * @param stockBody
   * @returns {Promise<IStocks>}
   */
  static createStock = async (stockBody: Partial<IStocks>) => {
    return Stocks.create(stockBody);
  };

  /**
   * Get users without photo
   * @returns {Promise<IStocks[]>}
   */
  static getAllStocks = async (): Promise<IStocks[]> =>
    Stocks.find().select("-createdAt -partImage -password -updatedAt").exec();

  /**
   * Get user by id
   * @param id
   * @returns {Promise<IStocks | null>}
   */
  static getStockById = async (id: string): Promise<IStocks | null> =>
    Stocks.findById(id).select("-createdAt -picturePath -password -updatedAt").exec();

  /**
   * Get user by email
   * @param partCode
   * @returns {Promise<IStocks | null>}
   */
  static getStockByCode = async (partCode: string): Promise<IStocks | null> =>
    Stocks.findOne({ partCode }).exec();

  /**
   * Update user by id
   * @param stockId
   * @param updateBody
   * @returns {Promise<IStocks>}
   */
  static updateStockById = async (
    stockId: string,
    updateBody: Partial<IStocks>,
  ): Promise<IStocks> => {
    const stock = await this.getStockById(stockId);
    if (!stock) {
      throw new ApiError(httpStatus.NOT_FOUND, "Stock not found");
    }

    Object.assign(stock, updateBody);
    await stock.save();
    return stock;
  };

  /**
   * Delete user by id
   * @param stockId
   * @returns {Promise<IStocks>}
   */
  static deleteStockById = async (stockId: string): Promise<IStocks> => {
    const stock = await this.getStockById(stockId);
    if (!stock) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    // await user.remove();
    return stock;
  };
}
