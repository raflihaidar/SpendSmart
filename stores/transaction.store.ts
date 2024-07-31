import { defineStore } from "pinia";
import type { TransactionInput, TransactionState } from "~/types/ITransction";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<TransactionInput[]>([]);
  const categories = ref([]);
  const type = ref([]);
  const expensesCategories = ref([]);
  const authStore = useAuthStore();

  const getstat = computed(() => {
    const { labels, data } = expensesCategories.value.reduce(
      (acc: any, item: any) => {
        acc.labels.push(item?.category);
        acc.data.push(item?.total);
        return acc;
      },
      { labels: [], data: [] }
    );

    return { labels, data };
  });

  const getCategories = async (typeId: number = 1): Promise<void | null> => {
    try {
      const { user } = storeToRefs(authStore);

      if (!user.value?.id) {
        throw createError({
          statusCode: 404,
          statusMessage: "Id User Not Found",
        });
      }

      const response = await fetch(
        `/api/category/${user.value.id}?typeId=${typeId}`
      );

      const data = await response.json();
      categories.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const getType = async (): Promise<void | null> => {
    try {
      const response = await fetch(`/api/type`);

      if (!response.ok) {
        throw createError({
          statusCode: 404,
          statusMessage: "Type Not Found",
        });
      }

      const data = await response.json();
      type.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaction = async (
    pageNumber: number = 1,
    pageSize: number = 5
  ): Promise<{
    totalPages: number;
    currentPages: number;
    totalResult: number;
  } | null> => {
    try {
      const { user } = storeToRefs(authStore);

      if (!user.value?.id) {
        return null;
      }

      const response = await fetch(
        `/api/transaction/user?id=${user.value.id}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      const data = await response.json();

      transactions.value = data.transactions;

      return {
        totalPages: data.totalPages,
        currentPages: data.currentPages,
        totalResult: data.totalResult,
      };
    } catch (error) {
      throw error;
    }
  };

  const getDetailTransaction = async (
    id: string
  ): Promise<TransactionState | null> => {
    const transaction = await fetch(`/api/transaction/${id}`, {
      method: "GET",
    });

    const data = await transaction.json();

    return data;
  };

  const createTransaction = async (payload: any): Promise<string | null> => {
    const { user } = storeToRefs(authStore);
    if (!user.value?.id) {
      return null;
    }

    try {
      const response = await $fetch("/api/transaction/create", {
        method: "POST",
        body: {
          description: payload.description,
          amount: parseInt(payload.amount),
          createdAt: payload.createdAt,
          category_id: parseInt(payload.category_id),
          type_id: parseInt(payload.type_id),
          user_id: user.value.id,
        },
      });

      if (!response) {
        return null;
      }

      return response.message;
    } catch (error) {
      throw error;
    }
  };

  const editTransaction = async (payload: any): Promise<void | null> => {
    try {
      await $fetch(`/api/transaction/${payload.id}`, {
        method: "PATCH",
        body: {
          description: payload.description,
          amount: payload.amount,
          createdAt: payload.createdAt,
          type_id: parseInt(payload.type_id),
          category_id: parseInt(payload.category_id),
          user_id: payload.user_id,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteTransaction = async (id: string): Promise<string | null> => {
    const { user } = storeToRefs(authStore);
    if (!user.value?.id) {
      return null;
    }
    try {
      const response = await $fetch(`/api/transaction/${id}`, {
        method: "DELETE",
        body: {
          userId: user.value.id,
        },
      });

      if (!response) {
        return null;
      }

      let result = transactions.value.filter((tx) => tx.id != id);
      transactions.value = result;

      return "Success";
    } catch (error) {
      throw error;
    }
  };

  const deleteSelectedTransaction = async (payload: any) => {
    const { user } = storeToRefs(authStore);

    if (!user.value?.id) {
      return;
    }

    try {
      await $fetch("/api/transaction/multi", {
        method: "DELETE",
        body: {
          transactionIds: payload,
          userId: user.value.id,
        },
      });

      if (transactions.value.length == 1) {
        transactions.value.slice();
      }
    } catch (error: any) {
      throw error;
    }
  };

  const getTransactionCurrentMonth = async () => {
    const { user } = storeToRefs(authStore);

    if (!user.value?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: "Id User Not Found",
      });
    }

    const res = await fetch(`/api/transaction/date?id=${user.value.id}`, {
      method: "GET",
    });

    const data = await res.json();
    expensesCategories.value = data;
  };

  const getTotalTransaction = async () => {
    try {
      const { user } = storeToRefs(authStore);

      if (!user.value?.id) {
        return null;
      }

      const res = await fetch(
        `/api/transaction/type-group?id=${user.value.id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getLatestTransaction = async () => {
    const { user } = storeToRefs(authStore);

    if (!user.value?.id) {
      return null;
    }

    try {
      const res = await fetch(`/api/transaction/latest?id=${user.value.id}`, {
        method: "GET",
      });

      const data = await res.json();

      if (
        data.transactionsToday.length <= 0 &&
        data.transactionsYesterday.length <= 0
      ) {
        return null;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const searchTransaction = async (payload: string, pageNumber: number) => {
    const { user } = storeToRefs(authStore);

    if (!user.value) {
      return null;
    }

    try {
      const res = await fetch(
        `/api/transaction/search?userId=${user.value.id}&q=${payload}&pageNumber=${pageNumber}&pageSize=5`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      transactions.value = data.transactions;
    } catch (error) {
      throw error;
    }
  };

  return {
    transactions,
    categories,
    type,
    expensesCategories,
    getCategories,
    getstat,
    getType,
    getTransaction,
    getDetailTransaction,
    getTransactionCurrentMonth,
    getLatestTransaction,
    getTotalTransaction,
    createTransaction,
    deleteTransaction,
    deleteSelectedTransaction,
    editTransaction,
    searchTransaction,
  };
});
