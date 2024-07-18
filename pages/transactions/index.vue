<script setup lang="ts">
definePageMeta({
  name: "transactions",
});
import { useTransactionStore } from "~/stores/transaction.store";
const headerNames = ["Date", "Title", "Category", "Amount", "Actions", " "];

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);

watchEffect(() => {
  transactionStore.getTransaction();
});
</script>

<template>
  <div class="bg-white shadow-sm rounded-xl h-full w-full px-5 py-10">
    <section class="flex justify-between w-full">
      <data class="flex w-auto gap-x-3">
        <BaseDatePicker />
        <BaseSearch />
        <BaseButton
          title="Filter"
          width="max-w-28"
          icon="ic:baseline-filter-alt"
          borderColor="border-color3"
        />
      </data>
      <div class="flex w-auto gap-x-3">
        <BaseButton
          title="Delete"
          width="max-w-28"
          bgColor="bg-[#E60D0D]"
          textColor="text-white"
          icon="ic:baseline-delete"
        />
        <BaseButton
          title="Export"
          width="max-w-28"
          borderColor="border-color3"
          icon="ic:baseline-download"
        />
        <NuxtLink to="/transactions/add">
          <BaseButton
            title="Add"
            width="max-w-28"
            bgColor="bg-color1"
            textColor="text-white"
            borderColor="border-color3"
            icon="ic:baseline-add"
          />
        </NuxtLink>
      </div>
    </section>
    <p class="font-bold text-md mt-10">All Transactions</p>
    <section v-if="transactions.length > 0 && transactions">
      <BaseTable :headerNames="headerNames">
        <template #tableBody>
          <tr
            v-for="(item, index) in transactions"
            :key="index"
            class="border-b cursor-pointer border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100"
          >
            <td
              class="border-l-8 whitespace-nowrap px-6 py-4 font-medium"
              :class="item.type_id == 1 ? 'border-green-500' : 'border-red-500'"
            >
              {{ item.createdAt }}
            </td>
            <td class="whitespace-nowrap px-6 py-4">{{ item.description }}</td>
            <td class="whitespace-nowrap px-6 py-4">
              {{ item.category?.name }}
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              {{ formatCurrency(item.amount) }}
              <!-- {{ item.amount }} -->
            </td>
            <td class="whitespace-nowrap px-6 py-4 font-bold flex gap-x-2">
              <span>Edit</span>
              <span class="text-red-500">Delete</span>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <input type="checkbox" name="" id="" />
            </td>
          </tr>
        </template>
      </BaseTable>
      <BasePagination />
    </section>
    <section class="text-center" v-else>
      <img
        src="../../assets/images/55024593_9264820.svg"
        alt="No Data"
        class="w-96 mx-auto"
      />
      <p class="font-bold text-lg">You don't have any transactions yet.</p>
      <p class="text-sm">
        Remember to always review and record every transaction you make.
      </p>
    </section>
  </div>
</template>
