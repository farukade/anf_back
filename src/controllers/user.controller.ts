import { pbkdf2Sync, randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { ILogin } from '../interfaces/login.interface';
import { IUser } from '../interfaces/user.interface';
import { handleBadRequest, handleError, handleSuccess, prisma } from '../utils/utils';
import { IResult } from '../interfaces/result.interface';
import { encodeToken } from '../utils/middlewares';

export const UserController = {
  get: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (id && id !== "") {
        const result = await prisma.users.findUnique({
          where: { id: Number(id) }
        });

        if (result)
          return handleSuccess({ res, result });

        return handleBadRequest({ res, message: "user not found" });
      } else {

        const result = await prisma.users.findMany();

        if (result.length)
          return handleSuccess({ res, result });
        return handleBadRequest({ res, message: "users not found" });
      };
    } catch (error) {
      handleError(res, error);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const body: IUser = req.body;

      const { email, username, password, ...restBody }: IUser = body;

      if (!username || !email || !password)
        return handleBadRequest({ res, message: "no username | email | password in parameters" });

      if (username?.length < 3 || password?.length < 5)
        return handleBadRequest({ res, message: "username | password not of required length" });

      const existing = await prisma.users.findUnique({
        where: { email }
      });

      if (existing)
        return handleBadRequest({ res, message: `${email} already registered` });

      const salt = randomBytes(30).toString('hex');
      const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

      const result = await prisma.users.create({
        data: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          password: hash,
          salt,
          ...restBody
        }
      });

      if (result)
        return handleSuccess({ res, result });

      return handleBadRequest({ res, message: "unexpected error" });
    } catch (error) {
      return handleError(res, error);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { username, password }: ILogin = req.body;
      if (!username ||
        username?.length < 5 ||
        !password || password?.length < 5
      )
        return handleBadRequest({ res, message: "username | password not present or not of required length" });

      let rs = await isValidPassword(username.toLowerCase(), password);

      const token = encodeToken(rs.data);
      if (rs.success)
        return handleSuccess({ res, result: { ...rs?.data, token }, message: rs?.message });

      return handleBadRequest({ res, message: rs.message || "unexpected error" });
    } catch (error) {
      return handleError(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {

      const { id } = req.query;

      if (!id || !id.length)
        return handleBadRequest({ res, message: "no id in req params" });

      const result = await prisma.users.delete({
        where: {
          id: Number(id)
        }
      });

      if (result)
        return handleSuccess({ res });

      handleBadRequest({ res, message: "unexpected error, delete failed" });
    } catch (error) {
      return handleError(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id, ...restData } = req.body;

      if (!id || !restData)
        return handleBadRequest({ res, message: "req body incomplete" });

      const result = await prisma.users.update({
        where: { id: Number(id) },
        data: restData
      });

      if (result)
        return handleSuccess({ res, result });

      return handleBadRequest({ res, message: "unexpected error, modification failed" });
    } catch (error) {
      handleError(res, error);
    }
  },
  verifyToken: async (req: Request, res: Response) => {
    try {
      console.log(req.headers);
      return handleSuccess({ res })
    } catch (error) {
      return handleError(res, error);
    }
  }
}

const isValidPassword = async (username: string, password: string): Promise<IResult> => {

  const user = await prisma.users.findUnique({ where: { username } });

  if (!user || !user?.salt)
    return { success: false, message: "user not found" };

  var hash = pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
  if (user.password === hash) {
    const { password, salt, ...restUser } = user;
    return { success: true, message: "password verification success", data: restUser }
  };
  return { success: false, message: "password verification failed" }
}