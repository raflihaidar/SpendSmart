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
        class="w-full h-36 whitespace-nowrap flex flex-col flex-grow bg-secondary rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-3 capitalize gap-x-5"
    >
        <header class="flex items-start justify-between w-full">
            <section class="flex items-center gap-x-2">
                <h4 class="font-medium text-xs 2xl:text-base">{{ title }}</h4>
                <Icon
                    name="ic:outline-info"
                    size="1.2rem"
                    class="text-txt-secondary hover:text-charcoal cursor-pointer"
                />
            </section>

            <section
                class="text-txt-secondary hover:text-charcoal cursor-pointer"
            >
                <Icon name="ic:outline-more-horiz" size="1.5rem" />
            </section>
        </header>

        <section class="mt-3">
            <p class="font-semibold text-xl 2xl:text-2xl">{{ value }}</p>
            <section class="text-xs 2xl:text-sm flex items-center gap-x-2 mt-2">
                <div
                    class="bg-green-pastel px-3 py-1 rounded-md text-third font-medium"
                >
                    3%
                </div>
                <p class="text-txt-secondary font-medium lowercase">
                    vs last month
                </p>
            </section>
        </section>
    </div>
</template>
