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
  <div class="flex w-full">
    <section class="w-[50%] relative">
      <LoginForm />
    </section>
    <section class="w-[50%] h-[100vh] bg-loginPage relative"/>
  </div>
</template>
