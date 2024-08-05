<script setup lang="ts">
const notifModal = ref(false);

const handleClick = () => {
  notifModal.value = !notifModal.value;
};
</script>

<template>
  <div class="flex justify-evenly items-center relative">
    <BaseUserInfo />
    <BaseSettings />
    <BaseNotificationIcon @click="handleClick" />
    <TheNotificationModal :is-active="notifModal" />
  </div>
</template>
