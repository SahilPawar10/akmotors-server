import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "./config";
import { TOKEN_TYPES } from "./constant";
import User, { IUserDocument } from "../database/mongodb/models/user.model";

interface JwtPayload {
  sub: string; // user id
  iat: number; // issued at
  exp: number; // expiration
  type: string; // token type (e.g. access, refresh)
}

const jwtOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (
  payload: JwtPayload,
  done: (error: any, user?: IUserDocument | false) => void,
): Promise<void> => {
  try {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new Error("Invalid token type");
    }

    const user = await User.findById(payload.sub).select("id firstName lastName email role");

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
