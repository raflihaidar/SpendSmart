<script setup lang="ts">
import Swal from "sweetalert2";
import type { TransactionState } from "~/types/ITransction";

const modalContent = defineModel<TransactionState | null>();

const transactionStore = useTransactionStore();
const { type, categories } = storeToRefs(transactionStore);

const emits = defineEmits<{
    (event: "closeModal"): void;
}>();

const handleClose = () => {
    emits("closeModal");
};

const handleEdit = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton:
                "bg-color1 text-white font-bold rounded-xl px-3 py-2",
            cancelButton:
                "bg-red-500 text-white font-bold rounded-xl px-3 py-2 mr-3",
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
            console.log("Result :", result);
            if (result.isConfirmed) {
                try {
                    await transactionStore.editTransaction(modalContent.value);
                    handleClose();
                    swalWithBootstrapButtons.fire({
                        title: "Updated!",
                        text: "Your transaction has been updated.",
                        icon: "success",
                    });
                    transactionStore.getTransaction();
                } catch (error: any) {
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
</script>

<template>
    <BaseForm v-if="modalContent" class="grid gap-y-3">
        <template #form-content>
            <section>
                <BaseLabel name="Description" />
                <BaseInput
                    id="Description"
                    v-model="modalContent.description"
                    input-type="text"
                    place-holder="Add new description"
                />
            </section>
            <section>
                <BaseLabel name="Amount" />
                <BaseInput
                    id="Amount"
                    v-model="modalContent.amount"
                    input-type="number"
                    place-holder="Add new amount"
                />
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
                        v-model="modalContent.category_id"
                        :datas="categories"
                        width="w-full"
                        border="border"
                        border-color="border-color3"
                        class="px-3 py-2"
                    />
                </span>
                <span class="w-1/2">
                    <BaseLabel name="Type" />
                    <BaseDropDown
                        v-model="modalContent.type_id"
                        :datas="type"
                        width="w-full"
                        border="border"
                        border-color="border-color3"
                        class="px-3 py-2"
                    />
                </span>
            </section>
            <section class="flex w-[100%] place-content-end gap-x-2">
                <BaseButton
                    title="Cancel"
                    event-type="button"
                    bg-color="bg-red-500"
                    width="w-28"
                    text-color="text-white"
                    @handler="handleClose"
                />
                <BaseButton
                    event-type="button"
                    title="Update"
                    bg-color="bg-color1"
                    width="w-28"
                    text-color="text-white"
                    @handler="handleEdit"
                />
            </section>
        </template>
    </BaseForm>
</template>
