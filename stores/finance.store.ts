import { defineStore } from "pinia";
import type { FinanceState } from "~/types/IFinance";

export const useFinanceStore = defineStore("finance", () => {
  const balance = ref(0);
  const income = ref(0);
  const expense = ref(0);

  const formatedExpense = computed(() => {
    if (expense.value == 0) {
      return formatCurrency(expense.value);
    }
    return `-${formatCurrency(expense.value)}`;
  });

  const formatedIncome = computed(() => {
    if (income.value == 0) {
      return formatCurrency(income.value);
    }
    return `+${formatCurrency(income.value)}`;
  });

  const formatedBalance = computed(() => {
    if (balance.value <= 0) {
      return `${formatCurrency(balance.value)}`;
    }

    return `+${formatCurrency(balance.value)}`;
  });

  const getFinanceRecord = async (): Promise<void> => {
    try {
      const authStore = useAuthStore();
      const { user } = storeToRefs(authStore);
      if (user.value?.id) {
        const response = await fetch(`/api/finance/${user.value.id}`);
        const data = await response.json();

        if (data?.financial_record) {
          balance.value = data.financial_record.balance;
          income.value = data.financial_record.income;
          expense.value = data.financial_record.expense;
        }
      } else {
        console.log("User ID tidak ditemukan");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return {
    balance,
    income,
    expense,
    formatedBalance,
    formatedExpense,
    formatedIncome,
    getFinanceRecord,
  };
});
