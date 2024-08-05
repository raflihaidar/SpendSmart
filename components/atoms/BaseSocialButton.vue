<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    sizeIcon?: string;
    nameIcon?: string;
  }>(),
  {
    sizeIcon: "1rem",
    nameIcon: "",
  }
);
</script>

<template>
  <div
    class="w-20 h-20 border-border border flex justify-center items-center gap-x-1 rounded-lg cursor-pointer"
  >
    <Icon :name="'uil:' + name" :size="sizeIcon" mode="css" />
    <p>{{ nameIcon }}</p>
  </div>
</template>
