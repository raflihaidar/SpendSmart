<script setup lang="ts">
const modal = ref(false);
const { isDesktop, isMobile } = useDevice();

const openedModal = (event: Event) => {
    const target = event.target as HTMLElement;
    modal.value = !modal.value;
    console.log(target);
    // if (!target.closest("#notif-modal") && !target.closest("#notif-icon")) {
    //     modal.value = false;
    // } else {
    //     modal.value = true;
    // }
};
</script>

<template>
    <div class="relative w-auto" @click="isMobile ? openedModal($event) : ''">
        <div class="block">
            <Icon
                id="notif-icon"
                name="ic:baseline-notifications-none"
                size="1.2rem"
                class="cursor-pointer text-txt-secondary hover:text-charcoal transition-color -mb-[0.35rem]"
                @click="openedModal"
            />
            <div
                class="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"
            />
        </div>
        <div v-if="modal">
            <div
                id="notif-modal"
                class="absolute top-10 -right-2 bg-white w-96 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-30 py-3 rounded-xl"
            >
                <ModalHeader />
                <div class="px-4">
                    <div class="text-center text-xl font-bold py-10">
                        No Notification
                    </div>
                </div>
                <div class="border-t border-color3 h-10" />
            </div>
        </div>
    </div>
</template>
