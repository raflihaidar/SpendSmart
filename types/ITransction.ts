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
  description: string | null;
  amount: number | null;
  createdAt: string | null;
  type_id: number | null;
  category_id: number | null;
}
