import * as winston from 'winston';
import * as fs from 'fs';

const logsDirectory = 'logs';

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const options = {
  console: {
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.simple(),
    ),
    level: 'silly',
  },
  // - Write all logs error (and below) to `error.log`.
  errorFile: {
    level: 'error',
    filename: 'logs/error.log',
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  },
  // - Write to all logs to `combined.log`
  combinedFile: {
    level: 'silly',
    filename: 'logs/combined.log',
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  },
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
  exitOnError: false, // do not exit on handled exceptions
});
