<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:isOpen"]);

const closeMOdal = () => {
  emits("update:isOpen", false);
};
</script>

<template>
  <div class="fixed w-full top-0 left-0 z-20" v-if="isOpen">
    <div
      class="bg-white rounded-lg p-3 absolute w-[40%] top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-40"
    >
      <slot name="modal-header" />
      <slot name="modal-content" />
      <slot name="modal-footer" />
    </div>
    <div
      class="w-screen h-screen bg-black opacity-35 relative z-30 top-0 left-0"
      @click="closeMOdal"
    ></div>
  </div>
</template>
