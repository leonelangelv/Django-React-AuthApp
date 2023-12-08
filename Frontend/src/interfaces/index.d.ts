export interface UserDataResponse {
  ok: boolean;
  userId: number;
  access_token: string;
  message: string;
  user: User;
}

export interface User {
  userId: number;
  username: string;
  name: string;
  lastname: string;
  province: string;
  country: string;
}

export interface ResponseError {
  ok: boolean;
  message: string;
}
