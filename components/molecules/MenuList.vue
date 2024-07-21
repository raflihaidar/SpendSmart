<script setup lang="ts">
import { defineProps } from "vue";
import type { PropType } from "vue"; // untuk memberikan tipe lebih spesifik pada array

interface menuList {
  title: string;
  path: string;
  icon: string;
  isActive: boolean;
}

const props = defineProps({
  menus: {
    type: Array as PropType<Array<menuList>>,
    required: true,
  },
});

const menus = reactive(props.menus);

const handleMenuClick = (index: number) => {
  props.menus.forEach((menu: any, i: number) => {
    menu.isActive = i === index;
  });
};
</script>

<template>
  <div class="mt-5 grid gap-y-5">
    <BaseMenu
      v-for="(item, index) in menus"
      @update:isActive="handleMenuClick(index)"
      :key="index"
      :menuName="item.title"
      :isActive="item.isActive"
      :icon="item.icon"
      :path="item.path"
      bgColor="bg-white"
      color="text-color1"
    />
  </div>
</template>
