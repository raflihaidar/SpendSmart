<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
}>();
</script>

<template>
  <div
    class="flex items-center justify-start gap-x-3 border-b-[#E0E1E2] border-b cursor-pointer pb-5"
  >
    <Icon :name="icon" size="2rem" />
    <h1 class="text-md font-bold">{{ title }}</h1>
  </div>
</template>
