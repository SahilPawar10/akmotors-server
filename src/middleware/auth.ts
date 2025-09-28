import { Request, Response, NextFunction } from "express";
import passport from "passport";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Role, roleRights } from "../config/roles.js";

interface IUser {
  id: string;
  role: string;
  [key: string]: any; // optional extra properties
}

// Extend Express Request to include user
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const verifyCallback =
  (
    req: AuthenticatedRequest,
    resolve: () => void,
    reject: (err: any) => void,
    requiredRights: string[],
  ) =>
  async (err: any, user: IUser, info: any) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role as Role) || [];
      const hasRequiredRights = requiredRights.every((requiredRight: any) =>
        userRights.includes(requiredRight),
      );

      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Unauthorised Acess !"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      await new Promise<void>((resolve: () => void, reject: (err: any) => void) => {
        passport.authenticate(
          "jwt",
          { session: false },
          verifyCallback(req, resolve, reject, requiredRights),
        )(req, res, next);
      });
      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
