import { createWallet } from "~/server/database/repositories/wallet.repositories";
import { RESPONSE_CODE } from "~/server/app/common/code";
import { WalletError } from "~/server/app/error/database/wallet.error";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Cek apakah body kosong terlebih dahulu
    if (!body || Object.keys(body).length === 0) {
      throw new WalletError("INVALID_WALLET_DATA");
    }

    // Buat wallet jika body valid
    const wallet = await createWallet(body);

    // Cek apakah hasil pembuatan wallet kosong atau null
    if (!wallet) {
      throw new WalletError("CREATE_WALLET_ERROR");
    }

    return {
      message: "Create Wallet Succeeded",
      status: 201,
      data: wallet,
    };
  } catch (error) {
    console.log(error);

    // Tangani semua error yang mungkin terjadi
    if (error instanceof WalletError) {
      throw error;
    }

    if (error instanceof Error) {
      throw createError({
        statusCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR.code,
        statusMessage: RESPONSE_CODE.INTERNAL_SERVER_ERROR.msg,
        cause: error.message,
      });
    }
  }
});
