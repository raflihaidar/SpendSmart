<script setup lang="ts">
const openSidebar = ref(false);
</script>

<template>
    <div
        class="font-body bg-main grid md:grid-cols-default grid-cols-1 grid-rows-default overflow-hidden h-screen"
    >
        <!-- Sidebar -->
        <TheSidebar />

        <!-- Konten Utama -->
        <div
            :class="openSidebar ? 'md:col-span-full' : 'md:col-span-content'"
            class="bg-secondary py-4 px-8 relative z-50 rounded-t-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] col-span-content-mobile row-start-1 mt-3 mr-3 h-screen flex flex-col"
        >
            <button
                :class="openSidebar ? 'left-0' : '-left-4'"
                class="text-txt-secondary z-50 absolute bg-secondary h-8 w-8 flex items-center justify-center rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                @click="openSidebar = !openSidebar"
            >
                <Icon
                    v-if="!openSidebar"
                    name="ci:arrow-circle-left"
                    size="1.5rem"
                />
                <Icon v-else name="ci:arrow-circle-right" size="1.5rem" />
            </button>
            <TheNavbar />

            <main class="flex-2 overflow-auto no-scrollbar">
                <slot />
            </main>
        </div>
    </div>
</template>

<style scoped>
/* Hilangkan scrollbar */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
