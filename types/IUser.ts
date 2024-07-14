export interface IUser {
  id?: string;
  fullname: string;
  username: string;
  password: string;
  email: String;
  financial_record_id: string;
}

export interface UserState {
  id: string;
  fullname: string;
  username: string;
  email: string;
}
