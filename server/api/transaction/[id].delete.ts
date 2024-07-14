import { RESPONSE_CODE } from "~/server/app/common/code";
import { deleteTransaction } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!body) {
    throw createError({
      statusCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR.code,
      statusMessage: RESPONSE_CODE.INTERNAL_SERVER_ERROR.msg,
    });
  }
  const response = await deleteTransaction(userid, body.id);

  if (!response) {
    throw createError({
      statusCode: 404,
      statusMessage: "Transaction Not Found",
    });
  }

  return response;
});
