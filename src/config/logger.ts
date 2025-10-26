import winston, { format, transports, Logger } from "winston";
import config from "./config";

// Custom format to handle Error objects
const enumerateErrorFormat = format((info: any) => {
  if (info instanceof Error) {
    return Object.assign({}, info, { message: info.stack });
  }
  return info;
});

// Create the logger instance
const logger: Logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: format.combine(
    enumerateErrorFormat(),
    config.env === "development" ? format.colorize() : format.uncolorize(),
    format.splat(),

    format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
