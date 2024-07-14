import { getTransactionType } from "~/server/database/repositories/typeRepositories";

export default defineEventHandler(async (event) => {
  const transactionType = await getTransactionType();
  return transactionType;
});
