<script setup lang="ts">
interface latestTransactionType {
    transactionsToday: any[];
    transactionsYesterday: any[];
}
definePageMeta({
    name: "dashboard",
    middleware: "auth",
});

const { data } = useAuth();

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

// seriesData.value = await transactionStore.getTotalTransaction();

onMounted(async () => {
    await transactionStore.getTransactionCurrentMonth();
    latestTransaction.value = await transactionStore.getLatestTransaction();
    seriesData.value = await transactionStore.getTotalTransaction();
});
</script>

<template>
    <div class="w-full h-full p-3">
        <TheFinancialOverview />
        <div class="mt-10 flex justify-between jus gap-x-5">
            <TheCard width="w-[40%]" title="Expense">
                <template #card-content>
                    <p class="text-green-custom text-sm font-bold mt-2">
                        {{ currentMonth }} {{ year }}
                    </p>
                    <div v-if="getstat.data.length <= 0">
                        <BasePieChart :label="[]" :data="[1]" />
                    </div>
                    <div v-else>
                        <BasePieChart
                            :label="getstat.labels"
                            :data="getstat.data"
                        />
                    </div>
                </template>
            </TheCard>
            <TheCard width="w-[55%]" title="Spending Report">
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
                        <!-- <BaseButton
              bg-color="bg-color1"
              text-color="text-white"
              title="View Report"
              width="max-w-28"
            /> -->
                    </section>
                    <BaseLineChart :data="seriesData" />
                </template>
            </TheCard>
        </div>
        <div class="mt-10 flex justify-between">
            <TheCard width="w-[50%]" title="Transaction History">
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
            </TheCard>
            <TheCard width="w-[45%] h-64" title="">
                <template #card-content>
                    <div
                        class="border-dotted border-4 rounded-lg border-black w-[90%] h-full mx-auto flex items-center justify-center cursor-pointer"
                    >
                        <Icon name="ic:outline-add-circle" size="3rem" />
                    </div>
                </template>
            </TheCard>
        </div>
    </div>
</template>
