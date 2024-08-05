<script setup lang="ts">
defineProps<{
  width: string;
  title: string;
}>();
</script>

<template>
  <div :class="`bg-white rounded-xl shadow-sm ${width} p-5`">
    <p class="font-bold text-md">{{ title }}</p>
    <slot name="card-content" />
  </div>
</template>
