export interface IUser {
  username: string;
  email: string;
  password: string;
  userType: string;
  photo: string;
  salt?: string;
  isValidPassword?: Function;
}