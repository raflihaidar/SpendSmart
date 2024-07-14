<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  headerNames: {
    type: Array,
    required: false,
  },
});
</script>

<template>
  <div>
    <div :class="`flex flex-col`">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table
              class="min-w-full text-left text-sm font-light text-surface dark:text-white"
            >
              <thead
                class="border-b border-neutral-200 font-medium dark:border-white/10"
              >
                <tr>
                  <slot name="tableHeader" />
                </tr>
                <tr v-if="!$slots.tableHeader">
                  <th
                    scope="col"
                    class="px-6 py-4"
                    v-for="(item, index) in headerNames"
                    :key="index"
                  >
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <slot name="tableBody" />
                <tr
                  v-if="!$slots.tableBody"
                  class="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td class="whitespace-nowrap px-6 py-4">Mark</td>
                  <td class="whitespace-nowrap px-6 py-4">Otto</td>
                  <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                  <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                  <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
