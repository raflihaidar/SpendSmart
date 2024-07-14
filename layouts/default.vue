<template>
  <div
    class="font-body grid grid-cols-default grid-rows-default h-[100vh] max-w-full overflow-x-hidden"
  >
    <TheSidebar class="bg-color2 col-span-sidebar row-span-sidebar" />
    <TheNavbar class="bg-color2 col-start-2 col-end-3 row-start-1 row-end-2" />
    <div class="bg-color2 col-span-content row-start-2 row-end-3">
      <slot />
    </div>
  </div>
</template>
