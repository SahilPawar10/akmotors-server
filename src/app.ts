import express, { Request, Response, Express, NextFunction } from "express";
import bodyParser from "body-parser";
import { status as httpStatus } from "http-status";
import passport from "passport";
// import config from "./config/config.js";
import { Morgan } from "./config/morgan";
import cors from "cors";
import { errorConverter, errorHandlerMiddleware } from "./middleware/error";
import ApiError from "./utils/ApiError";
import { jwtStrategy } from "./config/passport";
import routes from "./routes/v1/index";
const app: Express = express();

app.use(bodyParser.json({ limit: "50mb" })); // Adjust the limit as needed
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
    type: "application/x-www-form-urlencoded",
  }),
);

app.set("trust proxy", true);

app.use(cors());

//morgan request handler
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// v1 api routes
app.use("/v1", routes);

// convert error to ApiError, if needed
app.use(errorConverter);

// // handle error
app.use(errorHandlerMiddleware);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

export default app;
