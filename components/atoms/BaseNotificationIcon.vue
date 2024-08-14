<script setup lang="ts">
defineProps<{
    isActive: boolean;
}>();

const modal = ref(false);
</script>

<template>
    <div class="relative">
        <div @mouseenter="modal = true">
            <Icon
                name="ic:round-notifications"
                size="1.2rem"
                class="cursor-pointer text-gray-500"
            />
            <div
                class="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"
            />
        </div>
        <div v-if="modal">
            <div
                class="absolute top-5 right-0 bg-white w-96 shadow-sm z-30 py-3 rounded-xl"
                @mouseenter="modal = true"
                @mouseleave="modal = false"
            >
                <ModalHeader />
                <div class="px-4">
                    <!-- <div class="flex justify-left items-center gap-x-2 relative py-2">
              <div class="bg-color3 rounded-full px-2 py-1">
                <Icon name="ic:round-person" size="1.5rem" class="text-white" />
              </div>
              <div>
                <p class="font-bold">System</p>
                <p>Welcome to SpendSmart</p>
                <p class="text-xs">10 July 2024</p>
              </div>
              <div class="w-3 h-3 bg-red-500 rounded-full absolute right-0"></div>
            </div> -->
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
