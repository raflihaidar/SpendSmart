<script setup lang="ts">
import { useAuthStore } from "#imports";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

watchEffect(() => {
  console.log("user from navbar", user.value);
});
</script>

<template>
  <div class="flex gap-x-1 cursor-pointer text-xs">
    <Icon name="ic:round-person" size="1.2rem" class="text-gray-500" />
    <p v-if="user">{{ user.username }}</p>
    <p v-else class="text-[#718096] font-bold">Sign in</p>
  </div>
</template>
