<script setup lang="ts">
const financeStore = useFinanceStore();
const { formatedBalance, formatedExpense, formatedIncome } =
    storeToRefs(financeStore);

onMounted(() => {
    financeStore.getFinanceRecord();
});
</script>

<template>
    <div
        class="flex justify-between gap-x-5 md:w-full w-[90%] mx-auto max-sm:overflow-x-scroll"
    >
        <AnalyticCard
            title="balance"
            :value="formatedBalance"
            type="balance"
            :icon="'ic:round-account-balance-wallet'"
        />
        <AnalyticCard
            title="income"
            :value="formatedIncome"
            type="income"
            :icon="'ic:round-trending-up'"
        />
        <AnalyticCard
            title="expense"
            :value="formatedExpense"
            type="expense"
            :icon="'ic:round-trending-down'"
        />
        <!-- <AnalyticCard
      title="savings"
      value="0"
      type="balance"
      :icon="'ic:round-account-balance-wallet'"
    >
      <template #optional>
        <BaseProgressBar />
      </template>
    </AnalyticCard> -->
    </div>
</template>
