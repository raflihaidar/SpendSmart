import { getAllTransaction } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const transactions = await getAllTransaction(id?.toString());

  if (transactions?.length == 0) {
    console.log("error");
    throw createError({
      statusCode: 404,
      statusMessage: "No Transactions Found",
    });
  }

  return transactions;
});
