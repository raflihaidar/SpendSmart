<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const route = useRoute();

defineProps<{
  menuName: string;
  path: string;
  icon: string;
  color: string;
  bgColor: string;
  isActive: boolean;
}>();

const emits = defineEmits(["update:isActive"]);

const handleClick = () => {
  emits("update:isActive");
};

const isRouteActive = (menuPath: string) => {
  if (menuPath === "/") {
    return route.path === menuPath;
  }
  return route.path.startsWith(menuPath);
};
</script>

<template>
  <NuxtLink
    :to="path"
    class="group flex items-center gap-x-2 pl-4 py-3 hover:rounded-2xl hover:shadow-sm hover:font-semibold cursor-pointer hover:bg-white transition-all"
    :class="
      isRouteActive(path) ? 'bg-white rounded-2xl shadow-sm' : 'bg-inherit'
    "
    @click="handleClick"
  >
    <div
      :class="isRouteActive(path) ? 'bg-color1' : bgColor"
      class="rounded-2xl px-2 pt-1 group-hover:bg-color1 shadow-sm"
    >
      <Icon
        :name="icon"
        size="1.2rem"
        :class="isRouteActive(path) ? 'text-white' : color"
        class="group-hover:text-white"
      />
    </div>
    <div
      class="group-hover:text-black block w-full text-sm"
      :class="
        !isRouteActive(path) ? 'text-color3 font-bold' : 'text-black font-bold'
      "
    >
      {{ menuName }}
    </div>
  </NuxtLink>
</template>
