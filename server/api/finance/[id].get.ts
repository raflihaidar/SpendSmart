import { getFinanceById } from "~/server/database/repositories/financeRepository";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const data = await getFinanceById(id);
  return data;
});
