import { RESPONSE_CODE } from "~/server/app/common/code";
import { getTransactionById } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const transactions = await getTransactionById(id);

  if (!transactions) {
    throw createError({
      statusCode: RESPONSE_CODE.NOT_FOUND.code,
      statusMessage: RESPONSE_CODE.NOT_FOUND.msg,
    });
  }

  return transactions;
});
