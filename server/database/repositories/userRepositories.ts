import { prisma } from "~/server/database/client";
import { VerificationRequest, User } from "@prisma/client";

export const updateEmailVerified = async (
  email: string
): Promise<User | null> => {
  // Update user untuk mengatur emailVerified menjadi sekarang
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return user;
};

export const verificationToken = async (
  email: string,
  token: number
): Promise<VerificationRequest | null> => {
  // Cari permintaan verifikasi yang valid
  const verificationRequest = await prisma.verificationRequest.findFirst({
    where: {
      token,
      identifier: email,
      expires: {
        gte: new Date(), // Token harus belum kedaluwarsa
      },
    },
  });

  return verificationRequest;
};

export const deleteVerificationRequest = async (id: string) => {
  // Hapus token verifikasi dari database setelah digunakan
  await prisma.verificationRequest.deleteMany({
    where: {
      id,
    },
  });
};
