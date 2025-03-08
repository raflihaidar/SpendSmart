import { prisma } from "~/server/database/client";
import type { IWallet } from "~/typing/interfaces/wallet.interface";

export const createWallet = async (data: IWallet) => {
  const wallet = await prisma.wallet.create({
    data: {
      name: data.name,
      type: data.type,
      User: { connect: { id: data.user_id } },
      Financial_Record: {
        create: {},
      },
    },
    include: {
      User: true,
      Financial_Record: true,
    },
  });

  return wallet;
};
