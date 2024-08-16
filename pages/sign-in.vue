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
    <div class="md:flex w-full">
        <section class="w-[50%] md:relative">
            <LoginForm />
        </section>
        <section class="w-[50%] h-[100vh] md:bg-loginPage md:relative" />
    </div>
</template>
