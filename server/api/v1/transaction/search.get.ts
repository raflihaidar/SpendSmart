import { RESPONSE_CODE } from "~/server/app/common/code";
import { searchTransactions } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const { q, userId, pageSize, pageNumber } = getQuery(event);

  if (!q || !userId) {
    return null;
  }

  const res = await searchTransactions(
    q.toString(),
    userId.toString(),
    Number(pageNumber),
    Number(pageSize)
  );

  return res;
});
