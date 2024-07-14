<script setup lang="ts">
import type { ITransaction, TransactionState } from "~/types/ITransction";

const store = useTransactionStore();

const { categories, type } = storeToRefs(store);

const payload = reactive({
  description: null,
  amount: null,
  createdAt: null,
  type_id: null,
  category_id: null,
});

onMounted(() => {
  store.getCategories();
  store.getType();
});
</script>

<template>
  <div class="px-5 py-10">
    <nav class="flex justify-between">
      <section class="flex items-center gap-x-2 w-[20%]">
        <Icon name="material-symbols:arrow-left-alt" size="1.5rem" />
        <p class="font-bold">Add Transaction</p>
      </section>
      <section class="flex items-center gap-x-2 w-[30%] place-content-end">
        <!-- <BaseButton icon="ic:outline-remove-red-eye" title="" /> -->
        <BaseButton
          eventType="add"
          @add="store.createTransaction(payload)"
          title="Save and Continue"
          bgColor="bg-color1"
          textColor="text-white"
          width="w-40"
        />
      </section>
    </nav>

    <main class="w-full mt-5 grid gap-y-5">
      <div class="bg-white shadow-sm rounded-lg px-3 py-4">
        <p class="text-md font-bold mb-2">Category</p>
        <BaseDropDown
          :datas="categories"
          v-model="payload.category_id"
          class="text-md"
        />
      </div>

      <div class="bg-white shadow-sm rounded-lg px-3 py-4 grid">
        <p class="font-bold text-md">Transaction</p>
        <section class="mt-5">
          <BaseLabel name="Description" />
          <BaseInput
            inputType="text"
            id="Description"
            placeHolder="Input Description Transaction"
            v-model="payload.description"
          />
        </section>
        <section class="mt-5">
          <BaseLabel name="Amount" />
          <BaseInput
            inputType="number"
            id="Amount"
            placeHolder="Input Transaction Value"
            v-model="payload.amount"
          />
        </section>
        <section class="flex justify-between items-center mt-5">
          <BaseDatePicker width="w-[40%]" v-model="payload.createdAt" />
          <BaseDropDown
            :datas="type"
            width="w-[20%]"
            border="border"
            borderColor="border-color3"
            class="text-xs"
            v-model="payload.type_id"
          />
        </section>
      </div>
    </main>
  </div>
</template>
