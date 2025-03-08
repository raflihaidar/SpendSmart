import { getTransactionsWithPagination } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const { id, pageNumber, pageSize } = getQuery(event);

  const transactions = await getTransactionsWithPagination(
    id?.toString(),
    Number(pageNumber),
    Number(pageSize)
  );

  if (!transactions) {
    throw createError({
      statusCode: 404,
      statusMessage: "No Transactions Found",
    });
  }

  return transactions;
});
