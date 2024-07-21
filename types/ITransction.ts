export interface ITransaction {
  id?: string;
  description: string;
  amount: number;
  createdAt: Date;
  type_id: number;
  user_id: string;
  category_id: number;
}

export interface TransactionState {
  id: string;
  description: string;
  amount: number;
  createdAt: Date;
  type_id: number;
  user_id: string;
  category_id: number;
  user: object;
  category: {
    name: string;
  };
}

export interface TransactionInput {
  id: string;
  description: string;
  amount: number;
  createdAt: string;
  type_id: number;
  category: {
    name: string;
  };
  category_id: number;
}
