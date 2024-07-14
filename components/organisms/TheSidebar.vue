<template>
  <div>
    <section class="w-[80%] mx-auto py-5">
      <SidebarHeader :icon="'ic:baseline-savings'" title="spendSmart" />
      <MenuList :menus="menuList" />
    </section>
  </div>
</template>

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
  {
    title: "Savings",
    icon: "material-symbols:attach-money",
    path: "/savings",
    isActive: false,
  },
  {
    title: "Budgeting",
    icon: "ic:round-percentage",
    path: "/budgeting",
    isActive: false,
  },
  {
    title: "Profile",
    icon: "ic:round-person",
    path: "/profile",
    isActive: false,
  },
]);
</script>
