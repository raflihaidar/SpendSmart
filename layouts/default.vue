<script setup lang="ts">
const openSidebar = ref(false);
</script>

<template>
    <div>
        <div
            class="font-body grid md:grid-cols-default grid-cols-1 grid-rows-default h-[100vh] w-screen overflow-x-hidden max-sm:relative"
        >
            <!-- Sidebar -->
            <TheSidebar
                class="bg-color2 md:left-0 md:col-span-sidebar row-span-sidebar max-sm:absolute z-20"
                :class="
                    !openSidebar
                        ? 'max-sm:-left-full'
                        : 'max-sm:left-0 max-sm:w-[60%] max-sm:top-0 max-sm:bottom-0'
                "
                @click="openSidebar = false"
            />

            <!-- Navbar -->
            <TheNavbar
                v-model:openSidebar="openSidebar"
                class="bg-color2 md:col-start-2 col-end-3 col-start-1 row-start-1 row-end-2"
            />

            <!-- Konten Utama -->
            <main
                class="bg-color2 md:col-span-content col-span-content-mobile row-start-2 row-end-3"
            >
                <slot />
            </main>
        </div>
        <div
            v-if="openSidebar"
            class="fixed top-0 left-0 w-screen h-screen bg-black opacity-35 z-10"
            @click="openSidebar = false"
        />
    </div>
</template>
