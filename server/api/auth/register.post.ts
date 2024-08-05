import { PrismaClient } from "@prisma/client";
import { RESPONSE_CODE } from "~/server/app/common/code";
import type { H3Event } from "h3";

// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const { fullname, username, email, password, confirm_password } =
    await readBody(event);

  if (!email || !fullname || !password || !username) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  if (password !== confirm_password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      fullname,
      username,
      password: hashedPassword,
      email,
      financial_record: {
        create: {
          income: 0,
          expense: 0,
          balance: 0,
        },
      },
    },
  });

  return { user };
});
