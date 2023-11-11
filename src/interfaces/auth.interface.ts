
export interface IAuthUser {
  permissions: string[];
  id: number;
  username: string;
  email?: string;
  userType?: string;
}

declare module 'express' {
  interface Request {
    user: IAuthUser;
  }
}