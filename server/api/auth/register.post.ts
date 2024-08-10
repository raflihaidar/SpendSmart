import { PrismaClient } from "@prisma/client";
import { RESPONSE_CODE } from "~/server/app/common/code";
import type { H3Event } from "h3";
import sendVerificationEmail from "~~/server/app/email/verifyEmail";

// @ts-ignore
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const { name, username, email, password, confirm_password } = await readBody(
    event
  );

  // Check apakah ada inputan user yang kosong
  if (!email || !name || !password || !username) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  // Check password dan confirm pass sama
  if (password !== confirm_password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords do not match",
    });
  }

  //enkripsi password user
  const hashedPassword = await hash(password, 12);

  // Buat data user
  const user = await prisma.user.create({
    data: {
      name,
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

  const token: number = await sendVerificationEmail(user.email, user.id);

  // masukkan kode otp kedalam database
  await prisma.verificationRequest.create({
    data: {
      identifier: email,
      token,
      expires: new Date(new Date().getTime() + 60 * 60 * 1000), // Token valid selama 1 jam
    },
  });

  return { user };
});
