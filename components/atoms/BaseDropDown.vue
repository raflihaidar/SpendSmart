<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  datas: Array<{ id: number; name: string }>;
  width?: string;
  border?: string;
  borderColor?: string;
  modelValue: string | number | boolean | null;
}>();

const { datas, modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const handleChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
  console.log((event.target as HTMLInputElement).value);
  console.log(typeof modelValue.value);
};

onMounted(() => {
  if (datas.value.length > 0 && modelValue.value === null) {
    emit("update:modelValue", datas.value[0].id);
    console.log("Initial modelValue set to:", datas.value[0].id);
  }
});
</script>

<template>
  <div
    :class="`${props.border} ${props.borderColor} ${
      props.width ?? 'w-full'
    } rounded-lg`"
  >
    <select
      id="name"
      class="w-full outline-none rounded-none"
      @change="handleChange($event)"
    >
      <option
        v-for="(item, index) in props.datas"
        :key="index"
        :value="item?.id"
      >
        {{ item?.name }}
      </option>
    </select>
  </div>
</template>
