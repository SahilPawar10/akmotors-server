import mongoose, { Document } from "mongoose";
import { toJSON } from "../plugins/toJSON.plugin";
// 1. Define an interface for the Token document
export interface IStocksEntry extends Document {
  date: string;
  month: string;
  year: number;
  stock: mongoose.Types.ObjectId;
  overAllPaid: number;
  quantity: number;
  selledQty: number;
  buyingpriceperQty: number;
  sellingpriceperQty: number;
  isNill: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define schema
const stocksEntrySchema = new mongoose.Schema<IStocksEntry>(
  {
    date: {
      type: String,
      required: true,
    },
    month: {
      type: String,
    },
    year: {
      type: Number,
    },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stocks",
      required: true,
    },
    overAllPaid: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    selledQty: {
      type: Number,
      default: 0,
    },
    buyingpriceperQty: {
      type: Number,
    },
    sellingpriceperQty: {
      type: Number,
    },
    isNill: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
stocksEntrySchema.plugin(toJSON);

// 3. Define Model type
// export interface TokenModel extends Model<IStocksEntry> {}

// 4. Create model
const StocksEntry = mongoose.model<IStocksEntry>("StocksEntry", stocksEntrySchema);

export default StocksEntry;
