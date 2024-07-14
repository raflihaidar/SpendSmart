import { prisma } from "~/server/database/client";
import { Financial_Record, Transaction } from "@prisma/client";
import { ITransaction } from "~/types/ITransction";
import { toLocalISOString } from "~/utils/dateUtils";

export const createTransaction = async (
  data: ITransaction
): Promise<Transaction | null> => {
  try {
    return await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data,
        include: {
          user: {
            select: {
              financial_record: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      await tx.userCategory.update({
        where: {
          user_id_category_id: {
            user_id: data.user_id,
            category_id: data.category_id,
          },
        },
        data: {
          total: {
            increment: 1,
          },
        },
      });

      const { type_id, user_id, amount } = transaction;
      // Increment income and balance for user's financial record
      const balance = await tx.user.update({
        where: { id: user_id },
        data: {
          financial_record: {
            update: {
              balance: {
                increment: type_id === 1 ? amount : -amount,
              },
              income: type_id === 1 ? { increment: amount } : { increment: 0 },
              expense: type_id === 2 ? { increment: amount } : { increment: 0 },
              updatedAt: toLocalISOString(new Date()),
            },
          },
        },
        select: {
          financial_record: true,
        },
      });

      transaction.user.financial_record = balance.financial_record;

      return transaction;
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect;
  }
};

export const getAllTransaction = async (
  userId: string | undefined
): Promise<Transaction[] | null> => {
  const transactions = prisma.transaction.findMany({
    where: {
      user_id: userId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return transactions;
};

export const updateTransaction = async (
  data: ITransaction
): Promise<{
  transaction: Transaction | null;
  financial_record: Financial_Record | null;
} | null> => {
  try {
    const [transaction, user] = await prisma.$transaction([
      prisma.transaction.update({
        where: {
          id: data.id,
        },
        data,
      }),

      prisma.user.update({
        where: {
          id: data.user_id,
        },
        data: {
          financial_record: {
            update: {
              balance: {
                increment: data.type_id === 1 ? data.amount : -data.amount,
              },
              income:
                data.type_id === 1
                  ? { increment: data.amount }
                  : { increment: 0 },
              expense:
                data.type_id === 2
                  ? { increment: data.amount }
                  : { increment: 0 },
              updatedAt: toLocalISOString(new Date()),
            },
          },
        },
        select: {
          financial_record: true,
        },
      }),
    ]);

    return {
      transaction: transaction || null,
      financial_record: user?.financial_record || null,
    };
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect;
  }
};

export const deleteTransaction = async (
  userId: string | undefined,
  id: string | undefined
): Promise<Financial_Record | null> => {
  try {
    const balance = await prisma.$transaction(async (tx) => {
      // Hapus transaksi
      const transaction = await tx.transaction.delete({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              category: true,
            },
          },
        },
      });

      await tx.userCategory.update({
        where: {
          user_id_category_id: {
            user_id: transaction.user_id,
            category_id: transaction.category_id,
          },
        },
        data: {
          total: {
            decrement: 1,
          },
        },
      });

      // Ambil data yang diperlukan dari transaksi yang dihapus
      const { type_id, amount } = transaction;

      // Update financial record user berdasarkan jenis transaksi
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          financial_record: {
            update: {
              balance: {
                decrement: type_id === 1 ? amount : -amount,
              },
              income: type_id === 1 ? { decrement: amount } : { decrement: 0 },
              expense: type_id === 2 ? { decrement: amount } : { decrement: 0 },
              updatedAt: new Date(), // Misalnya menggunakan tanggal saat ini
            },
          },
        },
        select: {
          financial_record: true,
        },
      });

      // Pastikan untuk mengembalikan financial_record yang telah diupdate
      return updatedUser.financial_record;
    });

    return balance;
  } catch (error) {
    console.error(
      `Failed to delete transaction or update financial record: ${error}`
    );
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const getTransactionById = async (
  id: string | undefined
): Promise<Transaction | null> => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return transaction;
};
