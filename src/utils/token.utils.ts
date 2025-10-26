import { Types } from "mongoose";
import config from "../config/config";
import moment, { Moment } from "moment";
import jwt from "jsonwebtoken";
import { status as httpStatus } from "http-status";
import Token, { IToken } from "../database/mongodb/models/token.model";
import ApiError from "./ApiError";
import { UserRepository } from "./user.utils";
import { TOKEN_TYPES } from "../config/constant";
import { IUserDocument } from "../database/mongodb/models/user.model";

export class TokenRepository {
  /**
   * Generate token
   * @param userId - User ObjectId
   * @param expires - Expiration moment
   * @param type - Token type
   * @param secret - JWT secret
   * @returns Token string
   */
  static generateToken = (
    userId: Types.ObjectId | string,
    expires: Moment,
    type: string,
    secret: string = config.jwt.secret,
  ): string => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };

  /**
   * Save a token
   */
  static saveToken = async (
    token: string,
    userId: Types.ObjectId | string,
    expires: Moment,
    type: string,
    blacklisted = false,
  ): Promise<IToken> => {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };

  /**
   * Verify token and return token doc (or throw an error if not valid)
   */
  static verifyToken = async (token: string, type: string) => {
    const payload = jwt.verify(token, config.jwt.secret) as {
      sub: string;
      iat: number;
      exp: number;
      type: string;
    };
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "Token not found");
    }
    return tokenDoc;
  };

  /**
   * Generate auth tokens
   */
  static generateAuthTokens = async (user: IUserDocument) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
    const accessToken = this.generateToken(user.id, accessTokenExpires, TOKEN_TYPES.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, "days");
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, TOKEN_TYPES.REFRESH);
    await this.saveToken(refreshToken, user.id, refreshTokenExpires, TOKEN_TYPES.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  /**
   * Generate reset password token
   */
  static generateResetPasswordToken = async (email: string) => {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, "minutes");
    const resetPasswordToken = this.generateToken(user.id, expires, TOKEN_TYPES.RESET_PASSWORD);
    await this.saveToken(resetPasswordToken, user.id, expires, TOKEN_TYPES.RESET_PASSWORD);
    return resetPasswordToken;
  };

  /**
   * Generate verify email token
   */
  static generateVerifyEmailToken = async (user: IUserDocument) => {
    const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, "minutes");
    const verifyEmailToken = this.generateToken(user.id, expires, TOKEN_TYPES.VERIFY_EMAIL);
    await this.saveToken(verifyEmailToken, user.id, expires, TOKEN_TYPES.VERIFY_EMAIL);
    return verifyEmailToken;
  };
}
