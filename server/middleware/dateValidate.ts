import { RESPONSE_CODE } from "~/server/app/common/code";

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/transaction") || event.method !== "POST")
    return;

  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  body.createdAt = new Date(body.createdAt).toISOString();
});
