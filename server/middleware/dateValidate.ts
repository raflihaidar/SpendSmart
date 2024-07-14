import { RESPONSE_CODE } from "~/server/app/common/code";

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/transaction") || event.method !== "POST")
    return;

  const body = await readBody(event);
  console.log("CONNECT");

  if (!body) {
    console.log("error di sini");
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  console.log(body.description);
  console.log(body.createdAt);
  console.log(typeof body.category_id);

  body.createdAt = new Date(body.createdAt).toISOString();
});
