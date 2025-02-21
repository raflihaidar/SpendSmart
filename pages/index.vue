<script setup lang="ts">
definePageMeta({
    name: "home",
    middleware: "auth",
});

// Data Tab
const tabDatas = shallowRef([
    {
        name: "Transaction History",
        component: resolveComponent("TableTransactionHistory"),
    },
    {
        name: "Saving Plan",
        component: resolveComponent("TableSavingsPlan"),
    },
    {
        name: "Schedule Payment",
        component: resolveComponent("TableSchedulePayment"),
    },
]);

const currentTab = shallowRef(tabDatas.value[0]);

const changeTab = (item: any) => {
    currentTab.value = item;
};
</script>

<template>
    <section>
        <!-- Header -->
        <section class="flex justify-between items-center">
            <section>
                <h1 class="text-xl 2xl:text-2xl mt-5">Overview Dashboard</h1>
                <div
                    class="text-txt-secondary flex items-center gap-x-2 text-xs 2xl:text-sm mt-2"
                >
                    <Icon name="ci:calendar-days" size="1.2rem" />
                    <p class="font-medium">
                        <span class="me-1">1 Agustus 2025</span>
                        <span>-</span>
                        <span class="ms-1">30 Agustus 2025</span>
                    </p>
                </div>
            </section>
            <section class="w-[25vw] flex items-center justify-end gap-x-2">
                <BaseButton
                    border-color="border-border"
                    event-type="button"
                    width="w-24"
                >
                    <template #icon>
                        <p class="text-xs 2xl:text-sm">August</p>
                        <Icon name="ci:caret-down-md" size="2rem" />
                    </template>
                </BaseButton>
                <BaseButton
                    title="Export"
                    bg-color="bg-third"
                    text-color="text-white"
                    event-type="button"
                    width="w-24"
                />
            </section>
        </section>
        <!-- Header -->

        <!-- Financial Overview -->
        <section class="mt-7 px-1">
            <FinancialOverview />
        </section>
        <!-- Financial Overview -->

        <!-- Bottom Section -->
        <section class="mt-7 flex w-full">
            <!-- Money Analytics -->
            <section class="bg-main w-[40%] px-5 py-3 rounded-lg">
                <header class="flex items-center justify-between w-full">
                    <section class="w-fit">
                        <h4 class="font-medium">Money Analytics</h4>
                    </section>
                    <BaseButton
                        width="w-28"
                        event-type="button"
                        bg-color="bg-secondary"
                        border-radius="rounded-full"
                    >
                        <template #icon>
                            <p class="2xl:text-sm text-xs">Full Stats</p>
                            <Icon
                                name="ic:outline-arrow-outward"
                                size="1.2rem"
                            />
                        </template>
                    </BaseButton>
                </header>

                <section>
                    <BarChart />
                </section>
            </section>
            <!-- Money Analytics -->

            <!-- Transction Overview -->
            <section class="bg-secondary w-[60%] h-full p-3">
                <nav class="w-full">
                    <ul
                        class="grid grid-cols-3 text-center text-[10px] 2xl:text-sm"
                    >
                        <li
                            v-for="(item, index) in tabDatas"
                            :key="index"
                            class="text-sm pb-2 cursor-pointer hover:text-black hover:font-medium hover:border-b-2 hover:border-black transition-colors"
                            :class="
                                currentTab == item
                                    ? 'font-medium text-black border-black border-b-2'
                                    : 'font-normal text-txt-secondary border-border border-b'
                            "
                            @click="changeTab(item)"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </nav>
                <section class="mt-10 w-full">
                    <h3 class="text-base 2xl:text-xl">
                        {{ currentTab.name }}
                    </h3>
                    <p class="text-sm mb-3">
                        All your transactions are recorded
                    </p>
                    <component :is="currentTab.component" />
                </section>
            </section>
            <!-- Transction Overview -->
        </section>
    </section>
</template>
