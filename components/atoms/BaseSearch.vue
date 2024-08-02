<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div
    class="max-w-[200px] flex justify-between items-center border border-color3 rounded-md px-2 text-sm"
  >
    <input
      type="search"
      @input="handleInput($event)"
      class="outline-none w-full border-none"
      :value="modelValue"
    />
    <Icon name="ic:baseline-search" size="1.2rem" />
  </div>
</template>
