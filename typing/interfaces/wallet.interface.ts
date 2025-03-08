import type { WalletType } from "../enum/wallet-type.enum";

export interface IWallet {
  id: string;
  name: string;
  type: WalletType;
  financial_record_id?: string;
  user_id: string;
}
