<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  width: {
    type: String,
    default: "w-full",
  },
  modelValue: {
    type: [String, null],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    type="date"
    :value="modelValue"
    @change="handleInput($event)"
    :class="`${width} outline-none border-color3 border py-1 px-2 rounded-lg flex flex-row-reverse text-xs`"
  />
</template>
