<script setup lang="ts">
const { data, signOut } = useAuth();
const modal = ref(false);
</script>

<template>
    <div class="relative">
        <div
            class="flex gap-x-1 cursor-pointer text-xs"
            @mouseenter="modal = true"
        >
            <Icon name="ic:round-person" size="1.2rem" class="text-gray-500" />
            <p v-if="data?.user">{{ data?.user?.username }}</p>
            <p v-else class="text-[#718096] font-bold">Sign in</p>
        </div>
        <div v-if="modal">
            <ul
                class="bg-white text-black absolute top-5 -translate-x-1/2 w-60 z-30 text-center rounded-xl"
                @mouseenter="modal = true"
                @mouseleave="modal = false"
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
