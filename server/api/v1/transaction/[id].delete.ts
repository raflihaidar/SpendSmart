import { RESPONSE_CODE } from "~/server/app/common/code";
import { deleteTransaction } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const transactionId = getRouterParam(event, "id");
  const { userId } = await readBody(event);
  if (!userId) {
    throw createError({
      statusCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR.code,
      statusMessage: RESPONSE_CODE.INTERNAL_SERVER_ERROR.msg,
    });
  }
  const response = await deleteTransaction(userId, transactionId);

  if (!response) {
    throw createError({
      statusCode: 404,
      statusMessage: "Transaction Not Found",
    });
  }

  return {
    message: "Delete Transaction Sucess",
  };
});
