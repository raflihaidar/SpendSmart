<script setup lang="ts">
interface menuList {
  title: string;
  path: string;
  icon: string;
  isActive: boolean;
}

const props = defineProps<{
  menus: menuList[];
}>();

const menus = reactive(props.menus);

const handleMenuClick = (index: number) => {
  props.menus.forEach((menu: menuList, i: number) => {
    menu.isActive = i === index;
  });
};
</script>

<template>
  <div class="mt-5 grid gap-y-5">
    <BaseMenu
      v-for="(item, index) in menus"
      :key="index"
      :menu-name="item.title"
      :is-active="item.isActive"
      :icon="item.icon"
      :path="item.path"
      bg-color="bg-white"
      color="text-color1"
      @update:is-active="handleMenuClick(index)"
    />
  </div>
</template>
