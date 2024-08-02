<template>
  <div class="grid">
    <input
      :type="inputType"
      autocomplete="off"
      :id="id"
      :placeholder="placeHolder"
      class="border border-border rounded-xl outline-border p-3 text-sm w-full"
      v-model="inputValue"
      @input="handleInput($event)"
    />
    <div class="text-red-800 grid text-sm" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  inputType: {
    type: String,
    required: true,
    default: "text",
    validator(value: any) {
      // The value must match one of these strings
      return ["text", "email", "password", "number"].includes(value);
    },
  },
  id: {
    type: String,
    required: true,
  },
  placeHolder: String,
  modelValue: {
    type: [String, Number, Boolean, null],
    required: true,
  },
});

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
