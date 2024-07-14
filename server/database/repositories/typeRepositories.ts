import { prisma } from "~/server/database/client";
import { Type } from "@prisma/client";

export const getTransactionType = async (): Promise<Type[] | null> => {
  const type = await prisma.type.findMany();

  return type;
};
