<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: "Or",
  }
);
</script>

<template>
  <div class="flex justify-between items-center mt-10 my-5 text-[#A0AEC0]">
    <span class="w-20 h-[1px] flex-grow border-border border" />
    <span class="border-border text-center mx-5 text-sm">{{ text }}</span>
    <span class="w-20 h-[1px] flex-grow border-border border" />
  </div>
</template>
