import { createLogger, format, transports } from "winston";
import expressWinston from "express-winston";
const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "app.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
    //format.metadata(),
    format.prettyPrint()
  ),
});

export const WinstonLogger = expressWinston.logger({
  winstonInstance: logger,
  statusLevels: true,
});

export const WinstonErrorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({
      filename: "app.log",
    }),
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.printf(({ level, meta, timestamp }) => {
      return `${timestamp} ${level}: ${meta.message}`;
    })
  ),
});

module.exports = logger;
