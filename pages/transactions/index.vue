<script setup lang="ts">
import Swal from "sweetalert2";
import { useTransactionStore } from "~/stores/transaction.store";
import { type TransactionInput } from "~/types/ITransction";
import { type TransactionState } from "~/types/ITransction";

definePageMeta({
  name: "transactions",
});

const currentPage = ref(0);
const totalPages = ref(0);
const totalResult = ref(0);

const headerNames = ["Date", "Title", "Category", "Amount", "Actions", " "];
const transactionStore = useTransactionStore();
const { transactions, type, categories } = storeToRefs(transactionStore);

const selectedItem = ref<TransactionInput[]>([]);
const isOpenModal = ref(false);
const modalContent = ref<TransactionState | null>(null);

const openModal = async (id: string) => {
  isOpenModal.value = true;
  const res = await transactionStore.getDetailTransaction(id);
  modalContent.value = res;
};

const closeModal = async () => {
  modalContent.value = null;
  isOpenModal.value = false;
};

const fetchTransactionsData = async (pageNumber: number = 1) => {
  let data = await transactionStore.getTransaction(pageNumber);

  if (data) {
    currentPage.value = data.currentPages;
    totalPages.value = data.totalPages;
    totalResult.value = data.totalResult;
  }
};

onMounted(async () => {
  await fetchTransactionsData();
  transactionStore.getType();
  transactionStore.getCategories();
});

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
          await transactionStore.deleteSelectedTransaction(selectedItem.value);
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

const handleEdit = async () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-color1 text-white font-bold rounded-xl px-3 py-2",
      cancelButton: "bg-red-500 text-white font-bold rounded-xl px-3 py-2 mr-3",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          await transactionStore.editTransaction(modalContent.value);
          isOpenModal.value = false;
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: "Your transaction has been updated.",
            icon: "success",
          });
          transactionStore.getTransaction();
        } catch (error: Error) {
          swalWithBootstrapButtons.fire({
            title: "error",
            text: error.statusMessage,
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Delete Updated",
          icon: "error",
        });
      }
    });
};

watch(
  () => modalContent.value?.type_id,
  async (newValue: any) => {
    await transactionStore.getCategories(newValue);
  }
);
</script>

<template>
  <div class="bg-white shadow-sm rounded-xl h-full w-full px-5 py-10">
    <section class="flex justify-between w-full">
      <data class="flex w-auto gap-x-3">
        <!-- <BaseDatePicker /> -->
        <BaseSearch />
        <BaseButton
          eventType="filter"
          title="Filter"
          width="max-w-28"
          icon="ic:baseline-filter-alt"
          borderColor="border-color3"
        />
      </data>
      <div class="flex w-auto gap-x-3">
        <BaseButton
          title="Delete"
          @delete="handleMultipleDelete"
          eventType="delete"
          width="max-w-28"
          bgColor="bg-[#E60D0D]"
          textColor="text-white"
          icon="ic:baseline-delete"
        />
        <!-- <BaseButton
          eventType="export"
          title="Export"
          width="max-w-28"
          borderColor="border-color3"
          icon="ic:baseline-download"
        /> -->
        <NuxtLink to="/transactions/add">
          <BaseButton
            eventType=""
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
            </td>
            <td class="whitespace-nowrap px-6 py-4 font-bold flex gap-x-2">
              <span @click="openModal(item.id)">Edit</span>
              <span class="text-red-500" @click="deleteTransaction(item.id)"
                >Delete</span
              >
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <input
                type="checkbox"
                :id="item.id"
                :value="item"
                v-model="selectedItem"
              />
            </td>
          </tr>
        </template>
      </BaseTable>
      <BasePagination
        v-model="currentPage"
        :totalPages="totalPages"
        :totalResult="totalResult"
        @fetch-data="transactionStore.getTransaction"
      />
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
    <TheModal :isOpen="isOpenModal" @closeModal="closeModal">
      <template #modal-header>
        <div class="text-xl font-semibold mb-5">
          <p>Edit Transaction</p>
        </div>
      </template>
      <template #modal-content>
        <TheForm v-if="modalContent" class="grid gap-y-3">
          <template #form-content>
            <section>
              <BaseLabel name="Description" />
              <BaseInput inputType="text" v-model="modalContent.description" />
            </section>
            <section>
              <BaseLabel name="Amount" />
              <BaseInput inputType="number" v-model="modalContent.amount" />
            </section>
            <section>
              <span>
                <BaseLabel name="Date" />
                <BaseDatePicker
                  v-model="modalContent.createdAt"
                  class="px-3 py-2"
                />
              </span>
            </section>
            <section class="flex justify-between gap-x-5">
              <span class="w-1/2">
                <BaseLabel name="Categories" />
                <BaseDropDown
                  :datas="categories"
                  v-model="modalContent.category_id"
                  width="w-full"
                  border="border"
                  borderColor="border-color3"
                  class="px-3 py-2"
                />
              </span>
              <span class="w-1/2">
                <BaseLabel name="Type" />
                <BaseDropDown
                  :datas="type"
                  v-model="modalContent.type_id"
                  width="w-full"
                  border="border"
                  borderColor="border-color3"
                  class="px-3 py-2"
                />
              </span>
            </section>
            <section class="flex w-[100%] place-content-end gap-x-2">
              <BaseButton
                title="Cancel"
                eventType="closeModal"
                @closeModal="closeModal"
                bgColor="bg-red-500"
                width="w-28"
                textColor="text-white"
              />
              <BaseButton
                eventType="edit"
                @edit="handleEdit"
                title="Update"
                bgColor="bg-color1"
                width="w-28"
                textColor="text-white"
              />
            </section>
          </template>
        </TheForm>
      </template>
    </TheModal>
  </div>
</template>
