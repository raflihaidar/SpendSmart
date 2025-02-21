<script setup lang="ts">
const headerNames = ref([
    "Type",
    "Category",
    "ID Transactions",
    "Amount",
    "Transaction Date",
    "Status",
]);

const transactionStore = useTransactionStore();

const { transactions } = storeToRefs(transactionStore);

onMounted(() => {
    transactionStore.getTransaction();
});
</script>

<template>
    <BaseTable>
        <template #tableHeader>
            <tr class="w-full bg-fourth">
                <th
                    v-for="(item, index) in headerNames"
                    :key="index"
                    scope="col"
                    class="px-3 py-4 text-charcoal font-medium"
                    :class="item == 'Category' ? 'text-start' : 'text-center'"
                >
                    {{ item }}
                </th>
            </tr>
        </template>

        <template #tableBody>
            <tr
                v-for="(item, index) in transactions"
                :key="index"
                class="font-medium text-charcoal transition-colors"
            >
                <td class="text-center"></td>
                <td class="text-start px-3 py-4">
                    <p>{{ item.category.name }}</p>
                </td>
                <td class="text-center px-3 py-4">
                    <p>#CF232</p>
                </td>
                <td class="text-center px-3 py-4">
                    <p>{{ formatCurrency(item.amount) }}</p>
                </td>
                <td class="text-center px-3 py-4">
                    <p>{{ item.createdAt }}</p>
                </td>
                <td class="text-center px-3 py-4">
                    <p class="bg-[#F9E7E8] text-[#FF0000] p-2 rounded-full">
                        Failed
                    </p>
                </td>
            </tr>
        </template>
    </BaseTable>
</template>
