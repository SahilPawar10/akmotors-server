/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOKEN_TYPES } from "../config/constant.js";
import Token from "../database/mongodb/models/token.model.js";
import { IUserDocument } from "../database/mongodb/models/user.model.js";
import ApiError from "./ApiError.js";
import { TokenRepository } from "./token.utils.js";
import { UserRepository } from "./user.utils.js";
import { status as httpStatus } from "http-status";

export class AuthRepository {
  static loginUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<IUserDocument> => {
    const user = await UserRepository.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    }
    return user;
  };

  static loginUserWithNumberAndPassword = async (
    number: number,
    password: string,
  ): Promise<IUserDocument> => {
    const user = await UserRepository.getUserByMobile(number);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    }
    return user;
  };

  static logout = async (refreshToken: string): Promise<void> => {
    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: TOKEN_TYPES.REFRESH,
      blacklisted: false,
    });

    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }

    await refreshTokenDoc.deleteOne(); // instead of .remove() in TS
  };

  /**
   * Refresh auth tokens
   */
  static refreshAuth = async (refreshToken: string): Promise<Record<string, any>> => {
    try {
      const refreshTokenDoc = await TokenRepository.verifyToken(refreshToken, TOKEN_TYPES.REFRESH);

      const user = await UserRepository.getUserById(refreshTokenDoc.user as any);
      if (!user) {
        throw new Error();
      }

      await refreshTokenDoc.deleteOne();
      return TokenRepository.generateAuthTokens(user);
    } catch (err) {
      console.log(err);
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
  };

  /**
   * Reset password
   */
  static resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
    try {
      const resetPasswordTokenDoc = await TokenRepository.verifyToken(
        resetPasswordToken,
        TOKEN_TYPES.RESET_PASSWORD,
      );

      const user = await UserRepository.getUserById(resetPasswordTokenDoc.user as any);
      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "No user found");
      }

      await UserRepository.updateUserById(user.id, { password: newPassword });
      await Token.deleteMany({
        user: user.id,
        type: TOKEN_TYPES.RESET_PASSWORD,
      });
      //   console.log("Password Updated");
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
    }
  };
}
