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

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  isError: Boolean,
  message: {
    type: null as unknown as PropType<string>,
    required: true,
  },
});

watch(
  () => props.message,
  () => {
    console.log("dari props ", props.message);
  }
);
</script>
