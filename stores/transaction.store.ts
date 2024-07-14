import { defineStore } from "pinia";
import type {
  ITransaction,
  TransactionState,
  TransactionInput,
} from "~/types/ITransction";

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

  const createTransaction = async (payload: any): Promise<void | null> => {
    try {
      console.log("dari store : ", payload);
      const { user } = storeToRefs(authStore);
      if (user.value?.id) {
        const data = await $fetch("/api/transaction/create", {
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
        if (data) {
          transactions.value?.push(data);
          console.log("berhasil ditambahkan");
        }

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    transactions,
    categories,
    type,
    getCategories,
    getType,
    getTransaction,
    createTransaction,
  };
});
