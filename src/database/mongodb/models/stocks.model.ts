import mongoose, { Document } from "mongoose";
import { toJSON } from "../plugins/toJSON.plugin.js";
// 1. Define an interface for the Token document
export interface IStocks extends Document {
  partName: string;
  position: string;
  partCode: string;
  partImage: string;
  partCategoty: string;
  partDesc: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define schema
const stocksSchema = new mongoose.Schema<IStocks>(
  {
    partName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
    partCode: {
      type: String,
    },
    partImage: {
      type: String,
    },
    partCategoty: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
stocksSchema.plugin(toJSON);

// 4. Create model
const Stocks = mongoose.model<IStocks>("Stocks", stocksSchema);

export default Stocks;
