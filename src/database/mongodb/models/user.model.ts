import mongoose, { Document, Model, Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { paginate } from "../plugins/paginate.plugin.js";
import { toJSON } from "../plugins/toJSON.plugin.js";

import { roles } from "../../../config/roles.js";
import { IUser } from "../../../types/user.types.js";
// Document type (instance methods live here)
export interface IUserDocument extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

// Model type (static methods live here)
export interface IUserModel extends Model<IUserDocument> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>;
}

// Schema
const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
    },
    number: {
      type: Number,
      required: true,
      min: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error("Password must contain at least one letter and one number");
        }
      },
      private: true, // handled by toJSON plugin
    },
    gender: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    picturePath: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

// Plugins
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

// Static methods
userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: Types.ObjectId,
): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// Instance methods
userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Pre-save hook
userSchema.pre("save", async function () {
  const user = this as IUserDocument;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

// Model
const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default User;
