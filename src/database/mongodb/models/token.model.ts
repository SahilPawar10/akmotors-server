import mongoose, { Document } from "mongoose";
import { TOKEN_TYPES } from "../../../config/constant.js";
import { toJSON } from "../plugins/toJSON.plugin.js";
// 1. Define an interface for the Token document
export interface IToken extends Document {
  token: string;
  user: mongoose.Types.ObjectId;
  type: string;
  expires: Date;
  blacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define schema
const tokenSchema = new mongoose.Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [TOKEN_TYPES.REFRESH, TOKEN_TYPES.RESET_PASSWORD, TOKEN_TYPES.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

// 3. Define Model type
// export interface TokenModel extends Model<IToken> {}

// 4. Create model
const Token = mongoose.model<IToken>("Token", tokenSchema);

export default Token;
