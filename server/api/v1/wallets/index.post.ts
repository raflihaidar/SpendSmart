import { createWallet } from "~/server/database/repositories/wallet.repositories";
import { RESPONSE_CODE } from "~/server/app/common/code";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw createError({
        statusCode: RESPONSE_CODE.BAD_REQUEST.code,
        statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
      });
    }

    const wallet = await createWallet(body);

    return {
      message: "Create Wallet Succesed",
      status: 201,
      data: wallet,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR.code,
        statusMessage: RESPONSE_CODE.INTERNAL_SERVER_ERROR.msg,
        cause: error.message,
      });
    }
  }
});
