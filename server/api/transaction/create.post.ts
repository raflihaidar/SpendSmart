import { createTransaction } from "~/server/database/repositories/transactionRepositories";
import { RESPONSE_CODE } from "~/server/app/common/code";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  const response = await createTransaction(body);

  if (!response) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: "Failed to create transaction. Please try again.",
    });
  }

  return {
    data: response,
    message: "Transaction successfully created.",
  };
});
