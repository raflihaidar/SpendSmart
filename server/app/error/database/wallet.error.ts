import { ErrorBase } from "../ErrorBase";

export const WALLET_ERROR_CODE = {
  CREATE_WALLET_ERROR: {
    code: 409,
    statusMessage: "Conflict",
    message: "Gagal membuat wallet",
  },
  INVALID_WALLET_DATA: {
    code: 400,
    statusMessage: "Bad Request",
    message: "Data wallet tidak valid",
  },
  WALLET_NOT_FOUND: {
    code: 404,
    statusMessage: "Not Found",
    message: "Wallet tidak ditemukan",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    statusMessage: "Internal Server Error",
    message: "Terjadi kesalahan pada server",
  },
} as const;

export type WalletErrorCode = keyof typeof WALLET_ERROR_CODE;

export class WalletError extends ErrorBase<WalletErrorCode> {
  constructor(type: WalletErrorCode) {
    const { code, message, statusMessage } = WALLET_ERROR_CODE[type];
    super({
      code: type,
      message,
      statusCode: code,
      statusMessage: statusMessage,
    });
  }
}
