import { RESPONSE_CODE } from "~/server/app/common/code";
import {
  deleteVerificationRequest,
  updateEmailVerified,
  verificationToken,
} from "~/server/database/repositories/userRepositories";
import { ILogin } from "~/types/IUser";

export default defineEventHandler(async (event): Promise<ILogin | null> => {
  const { email, token } = getQuery(event);

  if (!email || !token) {
    throw createError({
      statusCode: RESPONSE_CODE.BAD_REQUEST.code,
      statusMessage: RESPONSE_CODE.BAD_REQUEST.msg,
    });
  }

  const emailString = email.toString();

  const verifResult = await verificationToken(emailString, Number(token));

  if (!verifResult) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or expired token.",
    });
  }

  const user = await updateEmailVerified(emailString);

  await deleteVerificationRequest(verifResult.id);

  if (!user) {
    return null;
  }

  return {
    email: user.email,
    password: user.password,
  };
});
