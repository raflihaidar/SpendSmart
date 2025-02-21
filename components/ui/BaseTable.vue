<script setup lang="ts">
defineProps<{
    headerNames?: Array<string> | null;
}>();
</script>

<template>
    <div :class="`flex flex-col`">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table
                        class="min-w-full text-left text-sm font-light text-surface"
                    >
                        <thead>
                            <slot name="tableHeader" />
                        </thead>
                        <thead
                            v-if="!$slots.tableHeader"
                            class="border-b border-neutral-200 font-medium"
                        >
                            <tr>
                                <th
                                    v-for="(item, index) in headerNames"
                                    :key="index"
                                    scope="col"
                                    class="px-6 py-4"
                                >
                                    {{ item }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <slot name="tableBody" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
