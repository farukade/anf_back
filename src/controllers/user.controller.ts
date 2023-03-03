import { Request, Response } from 'express';
import { User } from '../models/user.model';
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

      const { email, username, ...restBody }: IUser = body;
      if (!username || !email) return handleBadRequest(res, 400, "no username | email in req");

      const existing = await User.findOne({ email })
      if (existing) return handleBadRequest(res, 400, `${email} already registered`);

      const user = new User({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        ...restBody
      });
      await user.save();
      if (user) return handleSuccess(res, user, "user created", 201, null);
      return handleBadRequest(res, 500, "unexpected error");
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default UserController;