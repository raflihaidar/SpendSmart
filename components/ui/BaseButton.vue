<script setup lang="ts">
interface buttonProps {
  title?: string;
  icon?: string;
  sizeIcon?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  eventType: "button" | "submit" | "reset" | undefined;
}

withDefaults(defineProps<buttonProps>(), {
  sizeIcon: "1.2rem",
  width: "w-full",
  height: "h-10",
  bgColor: "bg-white",
  textColor: "text-black",
  borderColor: "border-none",
  borderRadius: "rounded-lg",
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
    :class="`border ${height} ${borderColor} ${borderRadius} ${bgColor} flex items-center justify-center gap-x-1 p-3 font-medium ${textColor} ${width} ${
      !$slots.icon ? 'block' : 'flex items-center '
    }`"
    @click="handleClick"
  >
    <slot name="icon" />
    <Icon v-if="icon" :name="icon" :size="sizeIcon" />
    <div v-if="!$slots.icon">
      <p v-if="title || icon" class="text-xs 2xl:text-sm">{{ title }}</p>
      <BaseSpinner v-else />
    </div>
  </button>
</template>
