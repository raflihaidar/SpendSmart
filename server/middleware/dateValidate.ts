import { RESPONSE_CODE } from "~/server/app/common/code";

export default defineEventHandler(async (event) => {
  if (
    !event.path.startsWith("/api/transaction") ||
    // cek apakah event bukan method kedua nya. jika iya maka kembalikan null
    (event.method !== "POST" && event.method !== "PATCH")
  )
    return;

  const body = await readBody(event);

  console.log("dari middleware : ", body);

  if (!body) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  if (body.createdAt) {
    body.createdAt = new Date(body.createdAt).toISOString();
  }
});
