<script setup lang="ts">
definePageMeta({
  name: "add",
});
import type { ITransaction, TransactionState } from "~/types/ITransction";

const store = useTransactionStore();
const router = useRouter();
const datePicker = ref<HTMLElement | null>(null);
const isError = ref({
  status: false,
  message: "",
});
const inputDropDown = ref(false);
const { categories, type } = storeToRefs(store);
const payload = reactive({
  description: null,
  amount: null,
  createdAt: null,
  type_id: 1,
  category_id: null,
});
const payloadCategory: { name: string | null; typeId: number | null } =
  reactive({
    name: null,
    typeId: null,
  });

const sendData = async (payload: any) => {
  try {
    const res = await store.createTransaction(payload);
    payload.description = null;
    payload.amount = null;
    payload.createdAt = null;
    payload.type_id = 1;
    payload.category_id = null;
    isError.value.status = false;
    isError.value.message = res || "";
  } catch (error: any) {
    isError.value.message = error.statusMessage;
    isError.value.status = true;
  }
};

const addNewCategory = () => {
  store.createCategory(payloadCategory);
  inputDropDown.value = false;
};

onMounted(() => {
  store.getCategories();
  store.getType();
});

watch(
  () => payload.type_id,
  async (newValue: number) => {
    await store.getCategories(newValue);
    payloadCategory.typeId = newValue;
  }
);
</script>

<template>
  <div class="px-5 py-10">
    <nav class="flex justify-between">
      <section class="flex items-center gap-x-2 w-[20%]">
        <Icon
          name="material-symbols:arrow-left-alt"
          size="1.5rem"
          class="cursor-pointer"
          @click="router.back"
        />
        <p class="font-bold">Add Transaction</p>
      </section>
      <section class="flex items-center gap-x-2 w-[30%] place-content-end">
        <!-- <BaseButton icon="ic:outline-remove-red-eye" title="" /> -->
        <BaseButton
          eventType="add"
          @add="sendData(payload)"
          title="Save and Continue"
          bgColor="bg-color1"
          textColor="text-white"
          width="w-40"
        />
      </section>
    </nav>

    <main class="w-full mt-5 grid gap-y-5">
      <section>
        <BaseMessages :isError="isError.status" :message="isError.message" />
      </section>
      <div class="grid grid-cols-3 gap-x-5">
        <section class="w-full bg-white shadow-sm rounded-lg px-3 py-4">
          <p class="text-md font-bold mb-2">Type</p>
          <BaseDropDown
            :datas="type"
            width="w-full"
            border="border"
            borderColor="border-color3"
            class="text-sm px-3 py-2"
            v-model="payload.type_id"
          />
        </section>
        <section class="w-full bg-white shadow-sm rounded-lg px-3 py-4">
          <p class="text-md font-bold mb-2">Category</p>
          <BaseDropDown
            :datas="categories"
            v-model="payload.category_id"
            width="w-full"
            border="border"
            borderColor="border-color3"
            class="text-sm px-3 py-2"
          >
            <template #tools>
              <div
                v-if="!inputDropDown"
                @click="inputDropDown = true"
                class="flex items-center px-3 py-2 gap-x-2 cursor-pointer hover:bg-gray-100 hover:underline transition-colors"
              >
                <Icon name="ic:round-add-box" size="1.5rem" />
                <p>Add new category</p>
              </div>
              <div
                v-else
                class="flex justify-between items-center px-3 py-3 gap-x-5"
              >
                <BaseInput
                  inputType="text"
                  id="Description"
                  placeHolder="Add new category"
                  v-model="payloadCategory.name"
                />
                <Icon
                  name="ic:baseline-cancel"
                  size="2rem"
                  @click="inputDropDown = false"
                  class="bg-red-500 cursor-pointer"
                />
                <Icon
                  name="ic:baseline-save"
                  size="2rem"
                  @click="addNewCategory"
                  class="bg-color1 cursor-pointer"
                />
              </div>
            </template>
          </BaseDropDown>
        </section>
        <section class="w-full bg-white shadow-sm rounded-lg px-3 py-4">
          <p class="text-md font-bold mb-2">Date</p>
          <BaseDatePicker
            ref="datePicker"
            width="w-full"
            v-model="payload.createdAt"
            class="text-sm px-3 py-2"
          />
        </section>
      </div>

      <div class="bg-white shadow-sm rounded-lg px-3 py-5 grid">
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
        <!-- <section class="flex justify-between items-center mt-5">
          <span class="flex-grow">
            <BaseLabel name="Date" />
            <BaseDatePicker
              ref="datePicker"
              width="w-[40%]"
              v-model="payload.createdAt"
              class="text-sm px-3 py-2"
            />
          </span>
          <span class="flex-grow">
            <BaseLabel name="Type" />
            <BaseDropDown
              :datas="type"
              width="w-[20%]"
              border="border"
              borderColor="border-color3"
              class="text-sm px-3 py-2"
              v-model="payload.type_id"
            />
          </span>
        </section> -->
      </div>
    </main>
  </div>
</template>
