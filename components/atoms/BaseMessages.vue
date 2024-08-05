<script setup lang="ts">
withDefaults(
  defineProps<{
    isError?: boolean;
    message: string | null | undefined;
  }>(),
  {
    isError: false,
  }
);
</script>

<template>
  <div
    v-if="message"
    :class="[
      isError ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500',
      'font-medium text-sm w-full p-3 rounded-lg',
    ]"
  >
    <p>{{ message }}</p>
  </div>
</template>
