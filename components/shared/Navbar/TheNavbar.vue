<script setup lang="ts">
defineProps<{
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
    <header class="flex justify-between items-center px-3">
        <section class="flex items-center">
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
    </header>
</template>
