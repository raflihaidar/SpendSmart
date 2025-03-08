import { RESPONSE_CODE } from "~/server/app/common/code";
import { getTotalByType } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  if (!id) {
    throw createError({
      statusCode: RESPONSE_CODE.NOT_FOUND.code,
      statusMessage: RESPONSE_CODE.NOT_FOUND.msg,
    });
  }

  const transactions = await getTotalByType(id.toString());

  if (!transactions) {
    throw createError({
      statusCode: RESPONSE_CODE.NOT_FOUND.code,
      statusMessage: RESPONSE_CODE.NOT_FOUND.msg,
    });
  }

  return transactions;
});
