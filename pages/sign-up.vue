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
    <section class="relative w-full h-full">
        <section
            class="bg-color1 hidden md:block text-white md:w-[95%] h-96 md:mt-5 mx-auto text-center rounded-lg"
        >
            <header class="w-[50%] mx-auto py-12">
                <h1 class="font-bold text-3xl">Welcome to SpendSmart</h1>
            </header>
        </section>
        <section
            class="absolute md:w-[25vw] w-full left-1/2 transform -translate-x-1/2 md:top-[70vh] top-10 md:-translate-y-1/2 bg-white rounded-lg px-10 py-5 shadow-lg"
        >
            <RegisterForm />
        </section>
    </section>
</template>
