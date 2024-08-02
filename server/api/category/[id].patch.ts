import { RESPONSE_CODE } from "~/server/app/common/code";
import { updateCategory } from "~/server/database/repositories/categoryRepositories";

export default defineEventHandler(async (event) => {
  const categoryId = getRouterParam(event, "id");

  const { name } = await readBody(event);

  if (!name || !categoryId) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  const response = await updateCategory(Number(categoryId), name);

  return response;
});
