import { Request, Response, NextFunction } from "express";
import { status as httpStatus } from "http-status";
import catchAsync from "../utils/catchAsync";
import { UserRepository } from "../utils/user.utils";
import { TokenRepository } from "../utils/token.utils";
import { AuthRepository } from "../utils/auth.utils";

export class AuthController {
  static register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // register logic here
      const user = await UserRepository.createUser(req.body);
      const tokens = await TokenRepository.generateAuthTokens(user);
      res.status(httpStatus.CREATED).send({ user, tokens });
    } catch (error) {
      return next(error);
    }
  });

  static login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // register logic here
      // ffndndkvn
      const { number, password } = req.body;
      const user = await AuthRepository.loginUserWithNumberAndPassword(number, password);
      const tokens = await TokenRepository.generateAuthTokens(user);
      return res.status(httpStatus.CREATED).send({ user, tokens });
    } catch (error) {
      return next(error);
    }
  });

  static logout = catchAsync(async (req, res) => {
    await AuthRepository.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  });

  static refreshTokens = catchAsync(async (req, res) => {
    const tokens = await AuthRepository.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  });

  // static forgotPassword = catchAsync(async (req, res) => {
  //   const resetPasswordToken = await TokenRepository.generateResetPasswordToken(req.body.email);
  //   // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  //   res.status(httpStatus.NO_CONTENT).send();
  // });

  static resetPassword = catchAsync(async (req, res) => {
    await AuthRepository.resetPassword(req.query.token as any, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  });
}
