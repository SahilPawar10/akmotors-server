import morgan, { Options, StreamOptions } from "morgan";
import config from "./config.js";
import logger from "./logger.js";
import { Request, RequestHandler, Response } from "express";

// Create a custom Morgan token for error messages
morgan.token("message", (req: Request, res: Response) => res.locals.errorMessage || "");

// Function to include IP in production
const getIpFormat = (): string => (config.env === "production" ? ":remote-addr - " : "");

// Explicit type annotations for formats
const successResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

// Stream options for Morgan to use your custom logger
const successStream: StreamOptions = {
  write: (message: string) => logger.info(message.trim()),
};

const errorStream: StreamOptions = {
  write: (message: string): any => logger.error(message.trim()),
};

export class Morgan {
  static successHandler: RequestHandler = morgan(successResponseFormat, {
    skip: (_req: Request, res: Response): boolean => res.statusCode >= 400,
    stream: successStream,
  } as Options<Request, Response>);

  static errorHandler: RequestHandler = morgan(errorResponseFormat, {
    skip: (_req: Request, res: Response): boolean => res.statusCode < 400,
    stream: errorStream,
  } as Options<Request, Response>);
}
