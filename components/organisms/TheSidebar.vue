<script setup lang="ts">
const menuList = reactive([
    {
        title: "Dashboard",
        icon: "ic:round-house",
        path: "/",
        isActive: true,
    },
    {
        title: "Transactions",
        icon: "ic:baseline-credit-card",
        path: "/transactions",
        isActive: false,
    },
]);
</script>

<template>
    <section class="w-full mx-auto py-5 px-5">
        <SidebarHeader :icon="'ic:baseline-savings'" title="spendSmart" />
        <MenuList :menus="menuList" />
    </section>
</template>
