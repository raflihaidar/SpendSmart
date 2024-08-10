export interface IUser {
  id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  financial_record_id: string;
}

export interface UserState {
  id: string;
  name: string;
  username: string;
  email: string;
}

export type ICreateUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type ILogin = {
  email: string;
  password: string;
};
