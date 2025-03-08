import { RESPONSE_CODE } from "~/server/app/common/code";
import { getFinanceById } from "~/server/database/repositories/financeRepository";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const finance = await getFinanceById(id);

  if(!finance){
    throw createError({
      statusCode : RESPONSE_CODE.NOT_FOUND.code,
      statusMessage : RESPONSE_CODE.NOT_FOUND.msg
    })
  }
  
  return finance;
});
