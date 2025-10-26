import { status as httpStatus } from "http-status";
import User, { IUserDocument } from "../database/mongodb/models/user.model";
import { IUser } from "../types/user.types";
import ApiError from "./ApiError";
import { FilterQuery, Types } from "mongoose";

export interface QueryOptions {
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface QueryResult<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export class UserRepository {
  /**
   * Create a user
   * @param userBody
   * @returns {Promise<IUser>}
   */
  static createUser = async (userBody: Partial<IUser>): Promise<IUserDocument> => {
    if (await User.isMobileTaken(userBody.number!, undefined)) {
      console.log("already pres");

      throw new ApiError(httpStatus.BAD_REQUEST, "Number is already used");
    }
    return User.create(userBody);
  };

  /**
   * Get users without photo
   * @returns {Promise<IUser[]>}
   */
  static getUserWithoutPhoto = async (): Promise<IUser[]> =>
    User.find().select("-createdAt -picturePath -password -updatedAt").exec();

  /**
   * Query for users
   * @param filter - Mongo filter
   * @param options - Query options
   * @returns {Promise<QueryResult<IUser>>}
   */
  static queryUsers = async (
    filter: FilterQuery<IUser>,
    options: QueryOptions,
  ): Promise<QueryResult<IUser>> => {
    const users = await (User as any).paginate(filter, options); // paginate comes from plugin
    return users;
  };

  /**
   * Get user by id
   * @param id
   * @returns {Promise<IUser | null>}
   */
  static getUserById = async (id: string): Promise<IUserDocument | null> =>
    User.findById(id).select("-createdAt -picturePath -password -updatedAt").exec();

  /**
   * Get user by email
   * @param email
   * @returns {Promise<IUser | null>}
   */
  static getUserByEmail = async (email: string): Promise<IUserDocument | null> =>
    User.findOne({ email }).exec();

  /**
   * Get user by email
   * @param email
   * @returns {Promise<IUser | null>}
   */
  static getUserByMobile = async (number: number): Promise<IUserDocument | null> =>
    User.findOne({ number }).exec();

  /**
   * Update user by id
   * @param userId
   * @param updateBody
   * @returns {Promise<IUser>}
   */
  static updateUserById = async (
    userId: string,
    updateBody: Partial<IUserDocument>,
  ): Promise<IUser> => {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    if (
      updateBody.email &&
      (await User.isEmailTaken(updateBody.email, userId as unknown as Types.ObjectId))
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }

    Object.assign(user, updateBody);
    await user.save();
    return user;
  };

  /**
   * Delete user by id
   * @param userId
   * @returns {Promise<IUser>}
   */
  static deleteUserById = async (userId: string): Promise<IUserDocument> => {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    // await user.remove();
    return user;
  };
}
