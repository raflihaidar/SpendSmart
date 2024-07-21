<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const route = useRoute();

const props = defineProps({
  menuName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  isActive: Boolean,
});

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
    @click="handleClick"
    class="group flex items-center gap-x-2 pl-4 py-3 hover:rounded-2xl hover:shadow-sm hover:font-semibold cursor-pointer hover:bg-white transition-all"
    :class="
      isRouteActive(path) ? 'bg-white rounded-2xl shadow-sm' : 'bg-inherit'
    "
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
