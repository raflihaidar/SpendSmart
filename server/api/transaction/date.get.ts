import { RESPONSE_CODE } from "~/server/app/common/code";
import { getTotalByCategory } from "~/server/database/repositories/transactionRepositories";
import { getCurrentMount, getCurrentYear } from "~/utils/dateUtils";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const month = getCurrentMount() + 1;
  const year = getCurrentYear();

  if (!month || !year || !id) {
    throw createError({
      statusCode: RESPONSE_CODE.NOT_FOUND.code,
      statusMessage: RESPONSE_CODE.NOT_FOUND.msg,
    });
  }
  const transactions = await getTotalByCategory(year, month, id.toString());

  if (!transactions) {
    throw createError({
      statusCode: RESPONSE_CODE.NOT_FOUND.code,
      statusMessage: RESPONSE_CODE.NOT_FOUND.msg,
    });
  }

  return transactions;
});
