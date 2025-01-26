<script setup lang="ts">
const modal = ref(false);
const { isDesktop, isMobile } = useDevice();

const openedModal = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest("#notif-modal") && !target.closest("#notif-icon")) {
        modal.value = false;
    } else {
        modal.value = true;
    }
};
</script>

<template>
    <div class="relative w-auto" @click="isMobile ? openedModal($event) : ''">
        <div class="block">
            <Icon
                id="notif-icon"
                name="ic:round-notifications"
                size="1.2rem"
                class="cursor-pointer text-gray-500 -mb-[0.35rem]"
                @mouseenter="isDesktop ? (modal = true) : ''"
            />
            <div
                class="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"
            />
        </div>
        <div v-if="modal">
            <div
                id="notif-modal"
                class="absolute top-10 -right-2 bg-white w-96 shadow-sm z-30 py-3 rounded-xl"
                @mouseenter="isDesktop ? (modal = true) : ''"
                @mouseleave="isDesktop ? (modal = false) : ''"
            >
                <ModalHeader />
                <div class="px-4">
                    <div class="text-center text-xl font-bold py-10">
                        No Notification
                    </div>
                </div>
                <div class="border-t border-color3 h-10" />
            </div>
            <div
                class="fixed top-20 left-0 w-screen h-screen bg-black opacity-35 z-20"
            />
        </div>
    </div>
</template>
