import { defineStore } from "pinia";

export const useFinanceStore = defineStore("finance", () => {
  const balance = ref(0);
  const income = ref(0);
  const expense = ref(0);

  const formatedExpense = computed(() => {
    return formatCurrency(expense.value);
  });

  const formatedIncome = computed(() => {
    return formatCurrency(income.value);
  });

  const formatedBalance = computed(() => {
    return `${formatCurrency(balance.value)}`;
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
