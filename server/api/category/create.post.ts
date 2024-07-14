import { createCategory } from "~/server/database/repositories/categoryRepositories";
import { RESPONSE_CODE } from "~/server/app/common/code";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await createCategory(body);

  if (!response) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }
  return response;
});
