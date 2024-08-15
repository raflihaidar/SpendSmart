<script setup lang="ts">
withDefaults(
    defineProps<{
        name: string;
        sizeIcon?: string;
        nameIcon?: string;
    }>(),
    {
        sizeIcon: "1rem",
        nameIcon: "",
    },
);

const emits = defineEmits<{
    (e: "handler"): void;
}>();

const handleClick = () => {
    emits("handler");
};
</script>

<template>
    <div
        class="w-20 h-20 border-border border flex justify-center items-center gap-x-1 rounded-lg cursor-pointer"
        @click="handleClick"
    >
        <Icon :name="'uil:' + name" :size="sizeIcon" mode="css" />
        <p>{{ nameIcon }}</p>
    </div>
</template>
