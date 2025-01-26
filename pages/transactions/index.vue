<script setup lang="ts">
import Swal from "sweetalert2";
import type { TransactionState, TransactionInput } from "~/types/ITransction";

definePageMeta({
    name: "transactions",
    middleware: "auth",
});

const searchQuery = ref("");
const totalResult = ref(0);
const currentPage = ref(0);
const totalPages = ref(0);
const isOpenModal = ref(false);
const modalContent = ref<TransactionState | null>(null);
const selectedItem = ref<TransactionInput[]>([]);

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);

const fetchTransactionsData = async (pageNumber: number = 1) => {
    const data = await transactionStore.getTransaction(pageNumber);

    if (data) {
        currentPage.value = data.currentPages;
        totalPages.value = data.totalPages;
        totalResult.value = data.totalResult;
    }
};

const deleteTransaction = (id: string | undefined) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
    });
    swalWithBootstrapButtons
        .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        })
        .then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    await transactionStore.deleteTransaction(id || "");
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your transaction has been deleted.",
                        icon: "success",
                    });
                    if (transactions.value.length <= 0) {
                        await fetchTransactionsData();
                    } else {
                        await fetchTransactionsData(currentPage.value);
                    }
                } catch (error: any) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: error.message,
                        icon: "error",
                    });
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Delete Cancelled",
                    icon: "error",
                });
            }
        });
};

const handleMultipleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
    });
    swalWithBootstrapButtons
        .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        })
        .then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    await transactionStore.deleteSelectedTransaction(
                        selectedItem.value,
                    );
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your transaction has been deleted.",
                        icon: "success",
                    });
                    if (transactions.value.length <= 0) {
                        await fetchTransactionsData();
                    } else {
                        await fetchTransactionsData(currentPage.value);
                    }
                } catch (error: any) {
                    swalWithBootstrapButtons.fire({
                        title: "error",
                        text: error.statusMessage,
                        icon: "error",
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Delete Cancelled",
                    icon: "error",
                });
            }
        });
};

const openModal = async (id: string) => {
    isOpenModal.value = true;
    const res = await transactionStore.getDetailTransaction(id);
    modalContent.value = res;
};

const closeModal = async () => {
    modalContent.value = null;
    isOpenModal.value = false;
};

onMounted(async () => {
    await fetchTransactionsData();
    await transactionStore.getType();
    await transactionStore.getCategories();
});

watch(
    () => modalContent.value?.type_id,
    async (newValue: any) => {
        await transactionStore.getCategories(newValue);
    },
);

watch(
    () => searchQuery.value,
    async (newValue: any) => {
        if (newValue == "") {
            await fetchTransactionsData();
        } else {
            const data: any = await transactionStore.searchTransaction(
                searchQuery.value,
                currentPage.value,
            );
            if (data) {
                currentPage.value = data.currentPages;
                totalPages.value = data.totalPages;
                totalResult.value = data.totalResult;
            }
        }
    },
);
</script>

<template>
    <section class="bg-white shadow-sm rounded-xl h-full w-full px-5 py-10">
        <section class="flex justify-between w-full max-sm:flex-col">
            <div class="flex w-auto gap-x-3 max-sm:w-full">
                <BaseSearch
                    v-model="searchQuery"
                    place-holder="Find a transaction"
                />
            </div>
            <div
                class="flex w-auto max-sm:w-full max-sm:justify-end max-sm:mt-3 gap-x-3"
            >
                <BaseButton
                    v-if="transactions.length"
                    title="Delete"
                    event-type="button"
                    width="max-w-28"
                    bg-color="bg-[#E60D0D]"
                    text-color="text-white"
                    icon="ic:baseline-delete"
                    @handler="handleMultipleDelete"
                />
                <NuxtLink to="/transactions/add">
                    <BaseButton
                        event-type="button"
                        title="Add"
                        width="max-w-28"
                        bg-color="bg-color1"
                        text-color="text-white"
                        border-color="border-color3"
                        icon="ic:baseline-add"
                    />
                </NuxtLink>
            </div>
        </section>
        <p class="font-bold text-md mt-10">All Transactions</p>
        <section v-if="transactions.length > 0 && transactions">
            <TransactionList
                v-model="selectedItem"
                :data="transactions"
                @open-modal="openModal"
                @delete-transaction="deleteTransaction"
            />
            <BasePagination
                v-model="currentPage"
                :total-pages="totalPages"
                :total-result="totalResult"
                @fetch-data="transactionStore.getTransaction"
            />
        </section>
        <section v-else class="text-center">
            <img
                src="../../assets/images/55024593_9264820.svg"
                alt="No Data"
                class="w-96 mx-auto"
            />
            <p class="font-bold text-lg">
                You don't have any transactions yet.
            </p>
            <p class="text-sm">
                Remember to always review and record every transaction you make.
            </p>
        </section>
        <BaseModal :is-open="isOpenModal" @close-modal="closeModal">
            <template #modal-header>
                <div class="text-xl font-semibold mb-5">
                    <p>Edit Transaction</p>
                </div>
            </template>
            <template #modal-content>
                <TransactionEditForm
                    v-model="modalContent"
                    @close-modal="closeModal"
                />
            </template>
        </BaseModal>
    </section>
</template>
