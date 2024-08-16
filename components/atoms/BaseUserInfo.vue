<script setup lang="ts">
const { data, signOut } = useAuth();
const { isDesktop } = useDevice();
const modal = ref(false);

const openedModal = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest("#user-modal") && !target.closest("#user-icon")) {
        modal.value = false;
    } else {
        modal.value = true;
    }
};
</script>

<template>
    <div class="w-auto relative" @click="openedModal($event)">
        <div
            id="user-icon"
            class="flex gap-x-1 cursor-pointer text-xs"
            @mouseenter="isDesktop ? (modal = true) : ''"
        >
            <Icon name="ic:round-person" size="1.2rem" class="text-gray-500" />
            <p v-if="data?.user">{{ data?.user?.username }}</p>
            <p v-else class="text-[#718096] font-bold">Sign in</p>
        </div>
        <div v-if="modal">
            <ul
                id="user-modal"
                class="bg-white text-black absolute top-10 -translate-x-[40%] w-40 z-30 text-center rounded-xl"
                @mouseenter="isDesktop ? (modal = true) : ''"
                @mouseleave="isDesktop ? (modal = false) : ''"
            >
                <li
                    class="cursor-pointer py-2 border-b hover:bg-gray-100 transition-colors"
                >
                    Profile
                </li>
                <li
                    class="cursor-pointer py-2 border-b hover:bg-gray-100 transition-colors block"
                    @click="signOut()"
                >
                    Logout
                </li>
            </ul>

            <div
                class="fixed top-20 left-0 w-screen h-screen bg-black opacity-35 z-20"
            />
        </div>
    </div>
</template>
