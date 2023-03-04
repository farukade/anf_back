import { Schema, model } from 'mongoose';
import { IUser } from '../types/user.interface';
import { pbkdf2Sync } from "crypto";
import { IResult } from '../types/result.interface';

const userSchema = new Schema<IUser>({
  username: {
    type: String, required: true, unique: true, trim: true
  },
  email: {
    type: String, required: true, unique: true, trim: true
  },
  password: {
    type: String, required: true
  },
  userType: {
    type: String, required: true, default: "admin"
  },
  salt: { type: String, required: true },
  photo: String,
});

export const isValidPassword = async (username: string, password: string): Promise<IResult> => {
  const user = await User.findOne({ username });
  if (!user || !user?.salt) return { success: false, message: "user not found" };

  var hash = pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
  if (user.password === hash) {
    return { success: true, message: "password verification success", data: user }
  };
  return { success: false, message: "password verification failed" }
}

export const User = model<IUser>('users', userSchema);