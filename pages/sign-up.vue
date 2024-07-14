<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  layout: "auth",
});
</script>

<template>
  <div class="relative w-full h-full">
    <section
      class="bg-color1 text-white w-[95%] h-96 mt-5 mx-auto text-center rounded-lg"
    >
      <div class="w-[50%] mx-auto py-12">
        <h1 class="font-bold text-3xl">Welcome to SpendSmart</h1>
      </div>
    </section>
    <section
      class="absolute w-[25vw] left-1/2 transform -translate-x-1/2 top-[70vh] -translate-y-1/2 bg-white rounded-lg px-10 py-5 shadow-lg"
    >
      <RegisterForm />
    </section>
  </div>
</template>
