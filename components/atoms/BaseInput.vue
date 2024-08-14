<script setup lang="ts">
const props = defineProps<{
  inputType: "text" | "email" | "password" | "number";
  id: string;
  placeHolder: string;
  modelValue: string | number | boolean | null;
}>();

const emit = defineEmits(["update:modelValue"]);

const {
  value: inputValue,
  errorMessage,
  handleChange,
} = useField(props.id, undefined, {
  initialValue: props.modelValue,
  valueProp: props.modelValue,
  syncVModel: true,
});

const handleInput = (event: Event) => {
  handleChange(event);
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="grid">
    <input
      :id="id"
      v-model="inputValue"
      :type="inputType"
      autocomplete="off"
      :placeholder="placeHolder"
      class="border border-border rounded-xl outline-border p-3 text-sm w-full"
      @input="handleInput($event)"
    >
    <div v-if="errorMessage" class="text-red-800 grid text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>
