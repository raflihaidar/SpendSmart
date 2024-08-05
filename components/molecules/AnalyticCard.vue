<script setup lang="ts">
interface Props {
  title: string;
  value: string;
  icon: string;
  type: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="flex justify-between items-center bg-white rounded-xl shadow-sm flex-grow p-3 capitalize w-full"
  >
    <section class="w-[70%]">
      <p
        class="font-bold text-sm text-color3"
        :class="$slots.optional ? 'mb-2' : ''"
      >
        {{ title }}
      </p>
      <p
        v-if="!$slots.optional"
        class="font-bold"
        :class="
          type == 'income'
            ? 'text-green-500'
            : type === 'expense'
            ? 'text-red-500'
            : 'text-black'
        "
      >
        {{ value }}
        <!-- <span class="text-green-500 text-sm ml-2">+15%</span> -->
      </p>
      <slot name="optional" />
    </section>
    <section>
      <div class="bg-color1 text-white pt-2 px-2 rounded-xl shadow-sm">
        <Icon :name="icon" size="1.5rem" />
      </div>
    </section>
  </div>
</template>
