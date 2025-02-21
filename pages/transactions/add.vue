<script setup lang="ts">
definePageMeta({
    name: "Add Transaction",
});

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
        typeId: 1,
    });

const sendData = async (payload: any) => {
    try {
        const res = await store.createTransaction(payload);
        payload.description = null;
        payload.amount = null;
        payload.createdAt = null;
        payload.type_id = 1;
        // payload.category_id = null;
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

onMounted(async () => {
    await store.getCategories();
    await store.getType();
});

watch(
    () => payload.type_id,
    async (newValue: number) => {
        await store.getCategories(newValue);
        payloadCategory.typeId = newValue;
    },
);
</script>

<template>
    <div class="px-5 py-10">
        <nav class="flex justify-between">
            <section class="flex items-center gap-x-2 md:w-[20%]">
                <Icon
                    name="material-symbols:arrow-left-alt"
                    size="1.5rem"
                    class="cursor-pointer"
                    @click="router.back"
                />
                <p class="font-bold md:text-normal text-sm">Add Transaction</p>
            </section>
            <section
                class="flex items-center gap-x-2 w-[30%] place-content-end"
            >
                <!-- <BaseButton icon="ic:outline-remove-red-eye" title="" /> -->
                <BaseButton
                    event-type="button"
                    title="Save"
                    bg-color="bg-color1"
                    text-color="text-white"
                    width="w-40"
                    @handler="sendData(payload)"
                />
            </section>
        </nav>

        <main class="w-full mt-5 grid gap-y-5">
            <section>
                <BaseMessages
                    :is-error="isError.status"
                    :message="isError.message"
                />
            </section>
            <div class="grid md:grid-cols-3 gap-x-5">
                <section class="w-full bg-white shadow-sm rounded-lg px-3 py-4">
                    <p class="text-md font-bold mb-2">Type</p>
                    <BaseDropDown
                        v-model="payload.type_id"
                        :datas="type"
                        width="w-full"
                        border="border"
                        border-color="border-color3"
                        class="text-sm px-3 py-2"
                    />
                </section>
                <section class="w-full bg-white shadow-sm rounded-lg px-3 py-4">
                    <p class="text-md font-bold mb-2">Category</p>
                    <BaseDropDown
                        v-model="payload.category_id"
                        :datas="categories"
                        width="w-full"
                        border="border"
                        border-color="border-color3"
                        :enable-edit="true"
                        class="text-sm px-3 py-2"
                        @edit="store.editCategory"
                        @delete="store.deleteCategory"
                    >
                        <template #tools>
                            <div
                                v-if="!inputDropDown"
                                class="flex items-center px-3 py-2 gap-x-2 cursor-pointer hover:bg-gray-100 hover:underline transition-colors"
                                @click="inputDropDown = true"
                            >
                                <Icon name="ic:round-add-box" size="1.5rem" />
                                <p>Add new category</p>
                            </div>
                            <div
                                v-else
                                class="flex justify-between items-center px-3 py-3 gap-x-5"
                            >
                                <BaseInput
                                    id="Description"
                                    v-model="payloadCategory.name"
                                    input-type="text"
                                    place-holder="Add new category"
                                />
                                <Icon
                                    name="ic:baseline-cancel"
                                    size="2rem"
                                    class="bg-red-500 cursor-pointer"
                                    @click="inputDropDown = false"
                                />
                                <Icon
                                    name="ic:baseline-save"
                                    size="2rem"
                                    class="bg-color1 cursor-pointer"
                                    @click="addNewCategory"
                                />
                            </div>
                        </template>
                    </BaseDropDown>
                </section>
                <section class="w-full bg-white shadow-sm rounded-lg px-3 py-4">
                    <p class="text-md font-bold mb-2">Date</p>
                    <BaseDatePicker
                        ref="datePicker"
                        v-model="payload.createdAt"
                        width="w-full"
                        class="text-sm px-3 py-2"
                    />
                </section>
            </div>

            <div class="bg-white shadow-sm rounded-lg px-3 py-5 grid">
                <p class="font-bold text-md">Transaction</p>
                <section class="mt-5">
                    <BaseLabel name="Description" />
                    <BaseInput
                        id="Description"
                        v-model="payload.description"
                        input-type="text"
                        place-holder="Input Description Transaction"
                    />
                </section>
                <section class="mt-5">
                    <BaseLabel name="Amount" />
                    <BaseInput
                        id="Amount"
                        v-model="payload.amount"
                        input-type="number"
                        place-holder="Input Transaction Value"
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
