import verifyEmailTemplate from "./templates/verifyEmailTemplate";
import verifyReminderEmailTemplate from "./templates/verifyReminderEmailTemplates";
import { sendGmail } from "./emailSender";
import { createOtp } from "../services/otp";
export default async function sendVerificationEmail(
  email: string,
  userId: string
): Promise<number> {
  const otp = await createOtp(userId);

  const template = verifyEmailTemplate(
    otp,
    "spendSmart@gmail.com",
    "SpendSmart Support",
    "SpendSmart"
  );

  // Kirim email
  await sendGmail({
    template,
    to: email,
    from: "SpendSmart",
    subject: "SpendSmart email verification",
  });
  return otp;
}

export async function sendReminderVerificationEmail(
  email: string,
  userId: string
) {
  const otp = await createOtp(userId);
  const template = verifyReminderEmailTemplate(
    otp,
    "spendSmart@gmail.com",
    "SpendSmart Support",
    "SpendSmart"
  );

  await sendGmail({
    template,
    to: email,
    from: "SpendSmart",
    subject: "SpendSmart email verification",
  });
}
