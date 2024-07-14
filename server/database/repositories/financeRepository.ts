import { prisma } from "../client";
import { Financial_Record } from "@prisma/client";

export const getFinanceById = async (
  id: string | undefined
): Promise<{ financial_record: Financial_Record } | null> => {
  const finance = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      financial_record: true,
    },
  });

  return finance;
};
