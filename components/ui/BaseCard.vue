<script setup lang="ts">
defineProps<{
    width: string;
    title: string;
}>();
</script>

<template>
    <div :class="`bg-white rounded-xl shadow-md ${width} p-5 mx-auto`">
        <p class="font-bold text-md">{{ title }}</p>
        <slot name="card-content" />
    </div>
</template>
