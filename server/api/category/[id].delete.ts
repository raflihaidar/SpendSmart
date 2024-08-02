import { RESPONSE_CODE } from "~/server/app/common/code";
import { deleteCategory } from "~/server/database/repositories/categoryRepositories";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  const response = await deleteCategory(Number(id));

  if (!response) {
    throw createError({
      statusCode: RESPONSE_CODE.NOT_FOUND.code,
      statusMessage: RESPONSE_CODE.NOT_FOUND.msg,
    });
  }

  return response;
});
