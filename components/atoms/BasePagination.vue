<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  totalResult: {
    type: Number,
    required: true,
  },
});

const { totalPages, modelValue, totalResult } = toRefs(props);

const emits = defineEmits(["fetchData", "update:modelValue"]);

const fetchData = (pageNumber: number) => {
  emits("fetchData", pageNumber);
  emits("update:modelValue", pageNumber);
};

const next = () => {
  if (modelValue.value < totalPages.value) {
    emits("update:modelValue", modelValue.value + 1);
  }
};

const prev = () => {
  if (modelValue.value > 1) {
    emits("update:modelValue", modelValue.value - 1);
  }
};

watch(modelValue, (newValue: any) => {
  fetchData(newValue);
});
</script>

<template>
  <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ " " }}
          <span class="font-medium">{{ modelValue }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{ totalPages }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ totalResult }}</span>
          {{ " " }}
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            @click="prev"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Previous</span>
            <Icon name="ic:baseline-arrow-back-ios" />
          </a>
          <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
          <!-- <a
            href="#"
            aria-current="page"
            class="relative z-10 inline-flex items-center bg-color1 px-4 py-2 text-sm font-semibold text-white "
            >1</a
          > -->
          <a
            v-for="(item, index) in totalPages"
            :key="index"
            @click="fetchData(item)"
            href="#"
            :class="[
              modelValue == item
                ? 'bg-color1 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'bg-white text-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 ',
            ]"
            >{{ item }}</a
          >
          <a
            href="#"
            @click="next"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Next</span>
            <Icon name="ic:baseline-arrow-forward-ios" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
