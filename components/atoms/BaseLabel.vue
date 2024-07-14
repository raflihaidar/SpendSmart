<template>
  <label :for="name" class="text-sm">{{ name }}</label>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  name: string;
}>();
</script>
