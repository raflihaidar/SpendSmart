<template>
  <div
    v-if="message"
    class="text-red-500 font-medium text-sm w-full bg-red-100 p-3 rounded-lg"
  >
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  messageType: {
    type: null as unknown as PropType<string | null>,
    default: null,
    required: true,
    validator(value: any) {
      // The value must match one of these strings
      return ["success", "warning", "error"].includes(value);
    },
  },
  message: {
    type: null as unknown as PropType<string | null>,
    default: null,
    required: true,
  },
});
</script>
