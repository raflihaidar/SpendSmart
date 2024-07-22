import { RESPONSE_CODE } from "~/server/app/common/code";
import { updateTransaction } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const respon = await updateTransaction(body);

  if (!respon) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  return respon;
});
