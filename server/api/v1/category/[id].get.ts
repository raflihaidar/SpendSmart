import { getCategoryById } from "~/server/database/repositories/categoryRepositories";
import { RESPONSE_CODE } from "~/server/app/common/code";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const { typeId } = getQuery(event);

  if (!userId) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  const response = getCategoryById(userId, typeId ? Number(typeId) : 1);

  if (!response) {
    throw createError({
      statusCode: RESPONSE_CODE.NOT_FOUND.code,
      statusMessage: RESPONSE_CODE.NOT_FOUND.msg,
    });
  }
  return response;
});
