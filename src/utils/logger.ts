import moment from 'moment';
import { createLogger, transports, format } from 'winston';
import { io } from '..';

// Create a logger with two transports: console and a file
export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ level, message }) => {
      io
        .of('/logs')
        .emit(
          'log-change',
          {
            success: true,
            data: `[${moment().format("HH:mm:ss DD-MM-YYYY")}] ${level}: ${message}`
          }
        );
      return `[${moment().format("HH:mm:ss DD-MM-YYYY")}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
});