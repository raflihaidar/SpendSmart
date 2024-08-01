<script setup lang="ts">
import { defineProps, defineEmits, toRefs, watch } from "vue";

const props = defineProps<{
  datas: Array<{ id: number; name: string }>;
  width?: string;
  border?: string;
  borderColor?: string;
  modelValue: string | number | boolean | null;
}>();
const emit = defineEmits(["update:modelValue"]);

const { datas, modelValue } = toRefs(props);
const currentValue = ref("");
const isOpen = ref(false);

const handleChange = (itemName: string, itemId: number) => {
  currentValue.value = itemName;
  emit("update:modelValue", itemId);
  isOpen.value = false;
};

const openOption = () => {
  isOpen.value = !isOpen.value;
};

watchEffect(() => {
  if (datas.value.length > 0 && modelValue.value === null) {
    emit("update:modelValue", datas.value[0].id);
  }
});

watch(datas, () => {
  if (datas.value.length > 0) {
    emit("update:modelValue", datas.value[0].id);
    currentValue.value = datas.value[0].name;
  }
});
</script>

<template>
  <div
    :class="[
      `${props.border} ${props.borderColor} ${
        props.width ?? 'w-full'
      } rounded-lg`,
      'relative',
    ]"
  >
    <button
      @click="openOption"
      class="cursor-pointer w-full text-left flex justify-between items-center"
    >
      {{ currentValue }}
      <Icon name="ic:round-keyboard-arrow-down" size="1.5rem" />
    </button>
    <div
      v-if="isOpen"
      class="absolute top-10 left-0 bg-white z-20 w-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <p
        v-for="(item, index) in datas"
        :key="index"
        :value="item.id"
        @click="handleChange(item.name, item.id)"
        class="w-full px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        {{ item.name }}
      </p>
      <slot name="tools"> </slot>
    </div>
  </div>
</template>
