<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  name: {
    type: String,
    required: true,
  },
  sizeIcon: {
    type: String,
    default: "1rem",
  },
  nameIcon: String,
});
</script>

<template>
  <div
    class="w-20 h-20 border-border border flex justify-center items-center gap-x-1 rounded-lg cursor-pointer"
  >
    <Icon :name="'uil:' + name" :size="sizeIcon" mode="css" />
    <p>{{ nameIcon }}</p>
  </div>
</template>
