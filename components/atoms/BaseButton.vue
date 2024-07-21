<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  title: String,
  icon: String,
  sizeIcon: {
    type: String,
    default: "1.2rem",
  },
  width: {
    type: String,
    default: "w-full",
  },
  bgColor: {
    type: String,
    default: "bg-white",
  },
  textColor: {
    type: String,
    default: "text-black",
  },
  borderColor: {
    type: String,
    default: "border-none",
  },
  eventType: {
    type: String,
    required: true,
    validator(value: any, props: any) {
      return [
        "signin",
        "signup",
        "signout",
        "filter",
        "add",
        "delete",
      ].includes(value);
    },
  },
});

const emits = defineEmits<{
  (e: "signin"): void;
  (e: "signup"): void;
  (e: "signout"): void;
  (e: "add", payload: any): void;
  (e: "delete", payload: any): void;
}>();

const handleClick = () => {
  emits(props.eventType);
};
</script>

<template>
  <button
    @click="handleClick"
    :class="`border ${borderColor} rounded-xl ${bgColor} flex items-center justify-center gap-x-1 p-3 font-semibold ${textColor} ${width} ${
      !$slots.icon ? 'block' : 'flex items-center '
    }`"
  >
    <slot name="icon" />
    <Icon v-if="icon" :name="icon" :size="sizeIcon" />
    <div v-if="!$slots.icon">
      <p v-if="title || icon" class="text-xs">{{ title }}</p>
      <BaseSpinner v-else />
    </div>
  </button>
</template>
