<script setup lang="ts">
const notifModal = ref(false);
const profileModal = ref(false);
</script>

<template>
    <div class="flex justify-evenly items-center relative w-full">
        <BaseUserInfo @click="profileModal = !profileModal" />
        <BaseSettings />
        <BaseNotificationIcon :is-active="notifModal" />
    </div>
</template>
