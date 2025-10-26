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
      const { number, password } = req.body;
      const user = await AuthRepository.loginUserWithNumberAndPassword(number, password);
      const { access, refresh } = await TokenRepository.generateAuthTokens(user);
      // Set cookies
      res.cookie("accessToken", access, {
        httpOnly: true,
        secure: true, // must be HTTPS
        sameSite: "none", // allow cross-site
        maxAge: 1000 * 60 * 15,
      });

      res.cookie("refreshToken", refresh, {
        httpOnly: true,
        secure: true, // must be HTTPS
        sameSite: "none", // allow cross-site
        maxAge: 1000 * 60 * 15,
      });
      res.status(httpStatus.CREATED).send({ user });
      //   const tokens =
    } catch (error) {
      return next(error);
    }
  });

  static logout = catchAsync(async (req, res) => {
    await AuthRepository.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  });

  static refreshTokens = catchAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // read cookie
    if (!refreshToken) {
      return res.status(401).send({ message: "No refresh token" });
    }
    const { access, refresh } = await AuthRepository.refreshAuth(refreshToken);

    // Set cookies
    res.cookie("accessToken", access, {
      httpOnly: true,
      secure: true, // must be HTTPS
      sameSite: "none", // allow cross-site
      maxAge: 1000 * 60 * 15,
    });

    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: true, // must be HTTPS
      sameSite: "none", // allow cross-site
      maxAge: 1000 * 60 * 15,
    });

    res.status(httpStatus.CREATED).send({ access, refresh });
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
