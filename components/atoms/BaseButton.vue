<script setup lang="ts">
interface buttonProps {
  title?: string;
  icon?: string;
  sizeIcon?: string;
  width?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  eventType: "button" | "submit" | "reset" | undefined;
}

withDefaults(defineProps<buttonProps>(), {
  sizeIcon: "1.2rem",
  width: "w-full",
  bgColor: "bg-white",
  textColor: "text-black",
  borderColor: "border-none",
  title: "",
  icon: "",
});

const emits = defineEmits<{
  (e: "handler"): void;
}>();

const handleClick = () => {
  emits("handler");
};
</script>

<template>
  <button
    :class="`border ${borderColor} rounded-xl ${bgColor} flex items-center justify-center gap-x-1 p-3 font-semibold ${textColor} ${width} ${
      !$slots.icon ? 'block' : 'flex items-center '
    }`"
    @click="handleClick"
  >
    <slot name="icon" />
    <Icon v-if="icon" :name="icon" :size="sizeIcon" />
    <div v-if="!$slots.icon">
      <p v-if="title || icon" class="text-xs">{{ title }}</p>
      <BaseSpinner v-else />
    </div>
  </button>
</template>
