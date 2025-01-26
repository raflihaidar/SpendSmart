<script setup lang="ts">
import type { TransactionInput } from "~/types/ITransction";
import { defineEmits, defineModel } from "vue";

const selectedItem: TransactionInput[] = defineModel();

const emit = defineEmits<{
    (event: "openModal" | "deleteTransaction", id: string): void;
}>();

defineProps<{
    data: TransactionInput[];
}>();

const headerNames = ["Date", "Title", "Category", "Amount", "Actions", " "];

const handleSelected = (payload: TransactionInput) => {
    selectedItem.value.push(payload);
    console.log("in child : ", selectedItem.value);
};

// Fungsi untuk membuka modal
const openModal = (id: string) => {
    emit("openModal", id);
};

// Fungsi untuk menghapus transaksi
const deleteTransaction = (id: string) => {
    emit("deleteTransaction", id);
};
</script>

<template>
    <BaseTable :header-names="headerNames">
        <template #tableBody>
            <tr
                v-for="(item, index) in data"
                :key="index"
                class="border-b cursor-pointer border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100"
            >
                <td
                    class="border-l-8 whitespace-nowrap px-6 py-4 font-medium"
                    :class="
                        item.type_id == 1
                            ? 'border-green-500'
                            : 'border-red-500'
                    "
                >
                    {{ item.createdAt }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                    {{ item.description }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                    {{ item.category?.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                    {{ formatCurrency(item.amount) }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 font-bold flex gap-x-2">
                    <span @click="openModal(item.id)">Edit</span>
                    <span
                        class="text-red-500"
                        @click="deleteTransaction(item.id)"
                    >
                        Delete
                    </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                    <input
                        :id="item.id"
                        type="checkbox"
                        :value="selectedItem"
                        @input="handleSelected(item)"
                    />
                </td>
            </tr>
        </template>
    </BaseTable>
</template>
