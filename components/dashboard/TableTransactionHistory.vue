<script setup lang="ts">
interface latestTransactionType {
    transactionsToday: any[];
    transactionsYesterday: any[];
}

const headerNames = ref([
    "Type",
    "Category",
    "ID Transactions",
    "Amount",
    "Transaction Date",
    "Status",
]);

const transactionStore = useTransactionStore();

const latestTransaction = ref<latestTransactionType | null>(null);
onMounted(async () => {
    await transactionStore.getTransactionCurrentMonth();
    latestTransaction.value = await transactionStore.getLatestTransaction();
});
</script>

<template>
    <section
        class="w-full h-full mt-10 flex flex-col md:flex-row gap-y-5 md:justify-between gap-x-5"
    >
        <div v-if="latestTransaction" class="my-3 w-full">
            <div v-if="latestTransaction.transactionsToday.length > 0">
                <p class="text-charcoal text-sm font-medium">Today</p>
                <div
                    v-for="(item, index) in latestTransaction.transactionsToday"
                    :key="index"
                    class="grid grid-cols-3 my-3 text-sm"
                >
                    <div class="flex flex-col">
                        <p class="font-medium">{{ item.description }}</p>
                        <p>21 Feb , 2025 at 1:03 PM</p>
                    </div>
                    <div
                        :class="[
                            item.type_id == 1 ? 'bg-green-500' : 'bg-red-500',
                            'font-bold',
                            'text-white',
                            'px-3 py-1',
                            'rounded-full',
                            'max-w-20',
                            'justify-self-center',
                            'mt-auto',
                        ]"
                    >
                        <p>
                            {{ item.type_id == 1 ? "income" : "expense" }}
                        </p>
                    </div>
                    <p class="justify-self-end flex items-center">
                        <span v-if="item.type_id === 1" class="text-sm">+</span>
                        <span v-else class="text-sm">-</span>
                        {{ formatCurrency(item.amount) }}
                    </p>
                </div>
            </div>
            <!-- <div
                v-if="
                    latestTransaction.transactionsYesterday &&
                    latestTransaction.transactionsYesterday.length > 0
                "
                class="mt-5 w-full"
            >
                <p class="text-color3 text-sm font-semibold">Yesterday</p>
                <div
                    v-for="(
                        item, index
                    ) in latestTransaction.transactionsYesterday"
                    :key="index"
                    class="grid grid-cols-3 my-3 text-sm"
                >
                    <p>{{ item.description }}</p>
                    <span
                        :class="[
                            item.type_id == 1 ? 'bg-green-500' : 'bg-red-500',
                            'font-bold',
                            'text-white',
                            'text-center',
                            'px-3 py-1',
                            'rounded-full',
                            'max-w-20',
                            'justify-self-center',
                        ]"
                    >
                        <p>
                            {{ item.type_id == 1 ? "income" : "expense" }}
                        </p>
                    </span>
                    <p class="justify-self-end">
                        {{ formatCurrency(item.amount) }}
                    </p>
                </div>
            </div> -->
        </div>
        <div
            v-else
            class="text-xl w-full h-full flex items-center justify-center font-bold text-red-500"
        >
            <p>No Transactions History</p>
        </div>
    </section>
</template>
