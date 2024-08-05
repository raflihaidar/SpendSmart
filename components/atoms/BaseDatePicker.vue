<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string;
    modelValue: string | Date | null;
  }>(),
  {
    width: "w-full",
  }
);

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    type="date"
    :value="modelValue"
    :class="`${width} outline-none border-color3 border py-1 px-2 rounded-lg flex flex-row-reverse text-xs`"
    @change="handleInput($event)"
  >
</template>
