import { getTransactionById } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await getTransactionById(id);
});
