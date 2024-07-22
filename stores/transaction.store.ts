import { defineStore } from "pinia";
import type { TransactionInput, TransactionState } from "~/types/ITransction";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<TransactionInput[]>([]);
  const categories = ref([]);
  const type = ref([]);

  const authStore = useAuthStore();

  const getCategories = async (): Promise<void | null> => {
    try {
      const { user } = storeToRefs(authStore);

      if (!user.value?.id) {
        throw createError({
          statusCode: 404,
          statusMessage: "Id User Not Found",
        });
      }
      const response = await fetch(`/api/category/${user.value.id}`);

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

  const getTransaction = async (): Promise<void> => {
    try {
      const { user } = storeToRefs(authStore);

      if (user.value?.id) {
        const response = await fetch(
          `/api/transaction/user?id=${user.value.id}`
        );
        const data = await response.json();

        transactions.value = data;
      }
    } catch (error) {
      console.log(error);
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
      console.log(payload);
      const res = await $fetch(`/api/transaction/${payload.id}`, {
        method: "PATCH",
        body: {
          payload,
        },
      });
    } catch (error) {
      console.log(payload);
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

  const deleteSelectedTransaction = async (transaction: any) => {
    const { user } = storeToRefs(authStore);
    console.log("from store : ", transaction);

    if (!user.value?.id) {
      return;
    }

    try {
      const response = await $fetch("/api/transaction/multi", {
        method: "DELETE",
        body: {
          transactionIds: transaction,
          userId: user.value.id,
        },
      });
    } catch (error: Error) {
      throw error;
    }
  };

  return {
    transactions,
    categories,
    type,
    getCategories,
    getType,
    getTransaction,
    getDetailTransaction,
    createTransaction,
    deleteTransaction,
    deleteSelectedTransaction,
    editTransaction,
  };
});
