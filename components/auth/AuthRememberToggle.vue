<script setup lang="ts">
const isClick = ref(false);
const toggle = () => {
  isClick.value = !isClick.value;
};
</script>

<template>
  <div
    class="w-12 h-5 rounded-full relative py-1 px-0 transition-all"
    :class="isClick ? 'bg-color1' : 'bg-border'"
  >
    <div
      class="w-4 h-4 rounded-full bg-white absolute top-[0.1rem] cursor-pointer transition-all"
      :class="isClick ? 'right-1 -translate-x-0' : 'left-1 translate-x-0'"
      @click="toggle"
    />
  </div>
</template>
