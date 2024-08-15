<script setup lang="ts">
defineProps<{
    isActive: boolean;
}>();
</script>

<template>
    <div
        class="absolute top-10 right-5 bg-white w-96 shadow-sm z-10 py-3 rounded-xl"
        :class="isActive ? 'block' : 'hidden'"
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
</template>
