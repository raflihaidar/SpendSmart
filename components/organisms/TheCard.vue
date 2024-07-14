<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  width: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div :class="`bg-white rounded-xl shadow-sm ${width} p-5`">
    <p class="font-bold text-md">{{ title }}</p>
    <slot name="card-content"></slot>
  </div>
</template>
