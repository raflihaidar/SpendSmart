import { prisma } from "~/server/database/client";
import { Financial_Record, Transaction } from "@prisma/client";
import { ITransaction } from "~/types/ITransction";
import { toLocalISOString } from "~/utils/dateUtils";

type FormattedTransaction = Omit<Transaction, "createdAt"> & {
  createdAt: string;
};

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
): Promise<FormattedTransaction[] | null> => {
  const transactions = await prisma.transaction.findMany({
    take: 5,
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
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!transactions) return null;

  // Manipulasi createdAt menjadi format yang lebih mudah dibaca
  return transactions.map((transaction) => ({
    ...transaction,
    createdAt: new Date(transaction.createdAt).toLocaleDateString("id-ID"),
  }));
};

export const updateTransaction = async (
  id: string | undefined,
  data: ITransaction
): Promise<Transaction | null> => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Ambil data transaksi sebelumnya
      const previousTransaction = await tx.transaction.findUnique({
        where: { id },
      });

      if (!previousTransaction) {
        throw new Error("Transaction not found");
      }

      // Perbarui transaksi
      const transaction = await tx.transaction.update({
        where: {
          id,
        },
        data,
      });

      const amountDifference = data.amount - previousTransaction.amount;

      if (
        data.amount !== previousTransaction.amount ||
        data.type_id !== previousTransaction.type_id
      ) {
        // Inisialisasi nilai perubahan balance, income, dan expense
        let balanceIncrement = 0;
        let incomeIncrement = 0;
        let expenseIncrement = 0;

        // Hitung perubahan berdasarkan perubahan tipe transaksi
        if (data.type_id === 1 && previousTransaction.type_id === 2) {
          balanceIncrement = data.amount + previousTransaction.amount;
          incomeIncrement = data.amount;
          expenseIncrement = -previousTransaction.amount;
        } else if (data.type_id === 2 && previousTransaction.type_id === 1) {
          balanceIncrement = -data.amount - previousTransaction.amount;
          incomeIncrement = -previousTransaction.amount;
          expenseIncrement = data.amount;
        } else if (data.type_id === 1 && previousTransaction.type_id === 1) {
          balanceIncrement = amountDifference;
          incomeIncrement = amountDifference;
        } else if (data.type_id === 2 && previousTransaction.type_id === 2) {
          balanceIncrement = -amountDifference;
          expenseIncrement = amountDifference;
        }

        // Perbarui catatan keuangan
        await tx.user.update({
          where: {
            id: data.user_id,
          },
          data: {
            financial_record: {
              update: {
                balance: {
                  increment: balanceIncrement,
                },
                income: {
                  increment: incomeIncrement,
                },
                expense: {
                  increment: expenseIncrement,
                },
                updatedAt: toLocalISOString(new Date()),
              },
            },
          },
        });
      }

      return transaction;
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
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

export const deleteMultipleTransaction = async (
  transaction: { id: string; category_id: number }[],
  incomes: number[],
  expenses: number[],
  userId: string
): Promise<Number | null> => {
  //ambil id transaksi
  const ids = transaction.map((t) => t.id);

  // Hitung jumlah transaksi per kategori yang akan dihapus
  const categoryTransactionCount = transaction.reduce((acc, t) => {
    acc[t.category_id] = (acc[t.category_id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return await prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    //akumulasikan semua total transaksi yang akan dihapus
    const totalIncome = incomes.reduce((sum, value) => sum + value, 0);
    const totalExpense = expenses.reduce((sum, value) => sum + value, 0);

    const balance = await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        financial_record: {
          update: {
            balance: {
              decrement: totalIncome - totalExpense,
            },
            income: {
              decrement: totalIncome,
            },
            expense: {
              decrement: totalExpense,
            },
          },
        },
      },
      select: {
        financial_record: true,
      },
    });

    // Update total kategori berdasarkan jumlah transaksi yang dihapus
    await Promise.all(
      Object.entries(categoryTransactionCount).map(([categoryId, count]) =>
        tx.userCategory.updateMany({
          where: { category_id: Number(categoryId) },
          data: { total: { decrement: count } },
        })
      )
    );

    return transaction.count;
  });
};

export const getTransactionById = async (
  id: string | undefined
): Promise<FormattedTransaction | null> => {
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

  if (!transaction) {
    console.log("tidak ada");
    return null;
  }

  const [year, month, day] = transaction.createdAt
    .toISOString()
    .split("T")[0]
    .split("-")
    .map(Number);

  const newDate = new Date(year, month - 1, day);

  const years = newDate.getFullYear();
  const months = String(newDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const days = String(newDate.getDate()).padStart(2, "0");

  const formattedDate = `${years}-${months}-${days}`;

  return {
    ...transaction,
    createdAt: formattedDate,
  };
};

export const getTotalByCategory = async (
  year: number,
  month: number,
  user_id: string
): Promise<{ category: string; total: number }[]> => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const categoryId = await prisma.transaction.groupBy({
    by: ["category_id"],
    _sum: {
      amount: true,
    },
    where: {
      AND: [
        {
          user_id,
        },
        {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        {
          type_id: 2,
        },
      ],
    },
  });

  const result = await Promise.all(
    categoryId.map(async (item) => {
      const categoryName = await prisma.category.findUnique({
        where: { id: item.category_id },
        select: {
          name: true,
        },
      });

      return {
        category: categoryName?.name,
        total: item._sum.amount,
      };
    })
  );

  return result.filter(
    (item): item is { category: string; total: number } => item !== null
  );
};

export const getTransactionByDate = async (
  year: number,
  month: number
): Promise<Transaction[] | null> => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  const filteredTransaction = await prisma.transaction.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      category: true,
    },
  });

  return filteredTransaction;
};

export const getTotalByType = async (user_id: string) => {
  // Ambil transaksi untuk user_id tertentu
  const transactions = await prisma.transaction.findMany({
    where: { user_id: user_id },
  });

  // Mengelompokkan transaksi berdasarkan bulan dan tipe
  const transactionByMonthAndType = transactions.reduce(
    (result, { createdAt, amount, type_id }) => {
      const month = new Date(createdAt).getMonth(); // Bulan dalam format 0-11

      console.log(month);

      // Inisialisasi array jika belum ada
      if (!result[month]) {
        result[month] = {};
      }

      // Inisialisasi total amount untuk type_id jika belum ada
      if (!result[month][type_id]) {
        result[month][type_id] = 0;
      }

      // Tambahkan jumlah sesuai dengan type_id
      result[month][type_id] += amount;

      return result;
    },
    {} as Record<number, Record<number, number>>
  );

  // Inisialisasi series data
  const seriesData = [
    { name: "Income", data: Array(12).fill(0) },
    { name: "Expense", data: Array(12).fill(0) },
  ];

  // Isi series data berdasarkan hasil pengelompokan
  Object.keys(transactionByMonthAndType).forEach((month) => {
    const monthIndex = parseInt(month);
    const monthData = transactionByMonthAndType[monthIndex];

    if (monthData) {
      if (monthData[1]) {
        seriesData[0].data[monthIndex] = monthData[1]; // 1 untuk Income
      }
      if (monthData[2]) {
        seriesData[1].data[monthIndex] = monthData[2]; // 2 untuk Expense
      }
    }
  });

  return seriesData;
};

export const getLatestTransaction = async (user_id: string) => {
  const now = new Date();

  // Awal hari ini
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));

  // Awal hari kemarin
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);

  // Akhir hari kemarin
  const endOfYesterday = new Date(startOfToday);
  endOfYesterday.setHours(-1); // Menetapkan ke 23:59:59 kemarin

  // Transaksi hari ini
  const transactionsToday = await prisma.transaction.findMany({
    where: {
      AND: [
        {
          user_id,
        },
        {
          createdAt: {
            gte: now,
          },
        },
      ],
    },
    take: 5,
  });

  const take = transactionsToday.length - 5;

  if (transactionsToday.length == 5) {
    return {
      transactionsToday,
    };
  }

  // Transaksi hari kemarin
  const transactionsYesterday = await prisma.transaction.findMany({
    where: {
      AND: [
        {
          user_id,
        },
        {
          createdAt: {
            gte: startOfYesterday,
            lte: endOfYesterday,
          },
        },
      ],
    },
    take: take,
  });

  return {
    transactionsToday,
    transactionsYesterday,
  };
};
