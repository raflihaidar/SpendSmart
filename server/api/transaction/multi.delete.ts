import { RESPONSE_CODE } from "~/server/app/common/code";
import { TransactionInput } from "~/types/ITransction";
import { deleteMultipleTransaction } from "~/server/database/repositories/transactionRepositories";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const transactionIds: TransactionInput[] = body.transactionIds;

  const incomes = transactionIds
    .filter((item) => item.type_id === 1)
    .map((item) => item.amount);

  const expenses = transactionIds
    .filter((item) => item.type_id === 2)
    .map((item) => item.amount);

  const transactions = transactionIds.map((item) => ({
    id: item.id,
    category_id: item.category_id,
  }));

  if (!transactionIds) {
    throw createError({
      statusCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR.code,
      statusMessage: RESPONSE_CODE.INTERNAL_SERVER_ERROR.msg,
    });
  }
  const response = await deleteMultipleTransaction(
    transactions,
    incomes,
    expenses,
    body.userId
  );

  if (response == 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "No transactions were deleted",
    });
  }

  return {
    message: "Delete Transaction Success",
  };
});
