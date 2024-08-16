<script setup lang="ts">
const props = defineProps<{
    openSidebar: boolean;
}>();

const emit = defineEmits<{
    (e: "update:openSidebar", value: boolean): void;
}>();

const openedSidebar = () => {
    emit("update:openSidebar", true);
};
</script>
<template>
    <div class="flex justify-between items-center px-3">
        <section class="pt-3 w-1/2 flex items-center">
            <icon
                name="ic:round-menu"
                size="1.5rem"
                class="max-sm:block hidden cursor-pointer"
                @click="openedSidebar"
            />
            <BaseBreadcrumb />
        </section>
        <section class="w-[25%]">
            <UserPanel />
        </section>
    </div>
</template>
