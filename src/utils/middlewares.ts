import { expressjwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
import { IAuthUser } from '../interfaces/auth.interface';
import { verify, sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { logger } from './logger';
import { handleBadRequest, handleError } from './utils';
import multer, { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomBytes } from 'crypto';
import moment from 'moment';
import { promisify } from 'util';
config();

const secret: string = process.env.JWT_SECRET || '';
const logSecret = process.env.LOG_SECRET;

export const authorize = (requiredPermissions: string[]) => {
  return [
    expressjwt({ secret, algorithms: ["HS256"] }), (req: Request, res: Response, next: NextFunction) => {
      const token = getToken(req);
      const result = decodeToken(token);
      const { permissions, id, username, userType } = result;
      req.user = { userType, id, username, permissions };
      next();
    }]
}

export const decodeToken = (token: string): IAuthUser | null => {
  try {
    const decoded = verify(token, secret);
    if (typeof decoded !== 'string') {
      return decoded.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Failed to decode token: ', error);
    return null;
  }
}

export const encodeToken = (data: any): string => {
  try {
    const token = sign(
      { data },
      secret,
      {
        expiresIn: "48h",
      }
    );
    return token;
  } catch (error) {
    logger.error(error);
    return '';
  }
}

export const getToken = (req: Request & { user?: IAuthUser }): string => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return '';
};

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`${req.method} ${req.hostname} ${req.url} ${req.ip}`);
    next();
  } catch (error) {
    logger.error(error);
  }
}

export const securityCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { secret } = req.query;

    if (!logSecret || logSecret === "") {
      return handleBadRequest({ res, message: "Log access denied!" })
    }

    if (!secret || secret === "") {
      return handleBadRequest({ res, message: "Log access denied!" })
    }

    if (secret === logSecret) {
      next()
    } else {
      return handleBadRequest({ res, message: "Log access denied!" })
    }
  } catch (error) {
    return handleError(res, error);
  }
}

export const newStorage = () => {
  return diskStorage({
    destination: (req, file, cb) => {
      const filePath = join(__dirname + `/../../public/uploads`);
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      const randomName = `${randomBytes(5).toString("hex")}-${moment().format("YYYYMMDDHHmmssSSS")}${extname(file.originalname)}`;
      cb(null, randomName);
    },
  });
}

const uploadFile = multer({ storage: newStorage(), limits: { fileSize: 10 * 1024 * 1024 } }).any();

export const upload = promisify(uploadFile);