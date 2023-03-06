import { pbkdf2Sync, randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { User, isValidPassword } from '../models/user.model';
import { ILogin } from '../types/login.interface';
import { IUser } from '../types/user.interface';
import { constants } from './constants';
const { handleError, handleBadRequest, handleSuccess } = constants;

const UserController = {
  get: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (id && id !== "") {
        const result = await User.findById(id);
        if (result) return handleSuccess(res, result, "user found", 200, null);
        return handleBadRequest(res, 400, "user not found");
      } else {
        const result = await User.find();
        if (result.length) return handleSuccess(res, result, "users found", 200, null);
        return handleBadRequest(res, 400, "users not found");
      };

    } catch (error) {
      handleError(res, error);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const body: IUser = req.body;

      const { email, username, password, ...restBody }: IUser = body;
      if (!username || !email || !password) return handleBadRequest(res, 400, "no username | email | password in parameters");

      if (username?.length < 3 || password?.length < 5)
        return handleBadRequest(res, 400, "username | password not of required length");

      const existing = await User.findOne({ email })
      if (existing) return handleBadRequest(res, 400, `${email} already registered`);

      const salt = randomBytes(30).toString('hex');
      const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

      const user = new User({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: hash,
        salt,
        ...restBody
      });
      let savedData = await user.save();

      if (savedData) {
        return handleSuccess(res, savedData, "user created", 201, null)
      };
      return handleBadRequest(res, 500, "unexpected error");
    } catch (error) {
      return handleError(res, error);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { username, password }: ILogin = req.body;
      if (!username || username?.length < 5 || !password || password?.length < 5)
        return handleBadRequest(res, 400, "username | password not present or not of required length");

      let rs = await isValidPassword(username.toLowerCase(), password);
      if (rs.success) {
        return handleSuccess(res, rs?.data, rs?.message, 200, null);
      }
      return handleBadRequest(res, 400, rs.message || "unexpected error");
    } catch (error) {
      return handleError(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || !id.length) {
        return handleBadRequest(res, 400, "no id in req params");
      }
      const result = await User.deleteOne({ _id: id });
      if (result.deletedCount) return handleSuccess(res, undefined, result.deletedCount + " user(s) deleted", 200, undefined);
      handleBadRequest(res, 400, "unexpected error, delete failed");
    } catch (error) {
      return handleError(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id, ...restData } = req.body;
      if (!id || !restData) return handleBadRequest(res, 400, "req body incomplete");

      const result = await User.updateOne({ _id: id }, restData);
      if (result.modifiedCount) return handleSuccess(res, undefined, result.modifiedCount + " user(s) modified", 200, undefined);
      handleBadRequest(res, 400, "unexpected error, modification failed");
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default UserController;