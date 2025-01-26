<script setup lang="ts">
interface latestTransactionType {
    transactionsToday: any[];
    transactionsYesterday: any[];
}
definePageMeta({
    name: "dashboard",
    middleware: "auth",
});

const transactionStore = useTransactionStore();
const { getstat } = storeToRefs(transactionStore);
const currentMonth = ref(months[getCurrentMount()]);
const year = ref(getCurrentYear());
const dataList = ref([
    "12 Months",
    "3 Months",
    "30 Days",
    "7 Days",
    "24 Hours",
]);
const latestTransaction = ref<latestTransactionType | null>(null);
const currentTab = ref("12 Months");
const seriesData = ref<any>([]);

const handleTab = (item: string) => {
    if (item != currentTab.value) {
        currentTab.value = item;
    }
};

onMounted(async () => {
    await transactionStore.getTransactionCurrentMonth();
    latestTransaction.value = await transactionStore.getLatestTransaction();
    seriesData.value = await transactionStore.getTotalTransaction();
});
</script>

<template>
    <section class="w-full h-full md:p-3">
        <FinancialOverview />
        <section
            class="w-full mt-10 flex flex-col md:flex-row gap-y-5 md:justify-between gap-x-5"
        >
            <BaseCard width="md:w-full w-[90%]" title="Spending Report">
                <template #card-content>
                    <section class="flex justify-between items-center">
                        <ul
                            class="text-xs font-bold mt-2 flex justify-start gap-x-5"
                        >
                            <li
                                v-for="(item, index) in dataList"
                                :key="index"
                                :class="[
                                    item == currentTab
                                        ? 'text-green-custom'
                                        : 'text-green-300',
                                    'cursor-pointer',
                                ]"
                                @click="handleTab(item)"
                            >
                                {{ item }}
                            </li>
                        </ul>
                    </section>
                    <LineChart :data="seriesData" />
                </template>
            </BaseCard>
            <BaseCard width="md:w-[50%] w-[90%]" title="Expense">
                <template #card-content>
                    <p class="text-green-custom text-sm font-bold mt-2">
                        {{ currentMonth }} {{ year }}
                    </p>
                    <div v-if="getstat.data.length <= 0">
                        <PieChart :label="[]" :data="[1]" />
                    </div>
                    <div v-else>
                        <PieChart
                            :label="getstat.labels"
                            :data="getstat.data"
                        />
                    </div>
                </template>
            </BaseCard>
        </section>
        <section
            class="w-full mt-10 flex flex-col md:flex-row gap-y-5 md:justify-between gap-x-5"
        >
            <BaseCard
                width="md:w-full w-[90%] h-64"
                title="Transaction History"
            >
                <template #card-content>
                    <div v-if="latestTransaction" class="my-3">
                        <div
                            v-if="
                                latestTransaction.transactionsToday.length > 0
                            "
                        >
                            <p class="text-color3 text-sm font-semibold">
                                Today
                            </p>
                            <div
                                v-for="(
                                    item, index
                                ) in latestTransaction.transactionsToday"
                                :key="index"
                                class="grid grid-cols-3 my-3 text-sm"
                            >
                                <p>{{ item.description }}</p>
                                <span
                                    :class="[
                                        item.type_id == 1
                                            ? 'bg-green-500'
                                            : 'bg-red-500',
                                        'font-bold',
                                        'text-white',
                                        'px-3 py-1',
                                        'rounded-full',
                                        'max-w-20',
                                        'justify-self-center',
                                    ]"
                                >
                                    <p>
                                        {{
                                            item.type_id == 1
                                                ? "income"
                                                : "expense"
                                        }}
                                    </p>
                                </span>
                                <p class="justify-self-end">
                                    {{ formatCurrency(item.amount) }}
                                </p>
                            </div>
                        </div>
                        <div
                            v-if="
                                latestTransaction.transactionsYesterday &&
                                latestTransaction.transactionsYesterday.length >
                                    0
                            "
                            class="mt-5"
                        >
                            <p class="text-color3 text-sm font-semibold">
                                Yesterday
                            </p>
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
                                        item.type_id == 1
                                            ? 'bg-green-500'
                                            : 'bg-red-500',
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
                                        {{
                                            item.type_id == 1
                                                ? "income"
                                                : "expense"
                                        }}
                                    </p>
                                </span>
                                <p class="justify-self-end">
                                    {{ formatCurrency(item.amount) }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else
                        class="text-xl text-center font-bold top-[40%] relative text-red-500"
                    >
                        <p>No Transactions HIstory</p>
                    </div>
                </template>
            </BaseCard>
        </section>
    </section>
</template>
