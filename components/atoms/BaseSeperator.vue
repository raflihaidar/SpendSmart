<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  text: {
    type: String,
    default: "Or",
  },
});
</script>

<template>
  <div class="flex justify-between items-center mt-10 my-5 text-[#A0AEC0]">
    <span class="w-20 h-[1px] flex-grow border-border border"></span>
    <span class="border-border text-center mx-5 text-sm">{{ text }}</span>
    <span class="w-20 h-[1px] flex-grow border-border border"></span>
  </div>
</template>
