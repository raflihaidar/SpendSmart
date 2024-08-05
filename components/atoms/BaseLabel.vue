<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <label :for="name" class="text-sm">{{ name }}</label>
</template>
