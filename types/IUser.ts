export interface IUser {
  id?: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  financial_record_id: string;
}

export interface UserState {
  id: string;
  fullname: string;
  username: string;
  email: string;
}
