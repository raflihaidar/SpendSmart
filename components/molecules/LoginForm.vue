<script setup lang="ts">
const email = ref("");
const password = ref("");
const isLoading = ref(false);

const store = useAuthStore();

const { data, signIn } = useAuth();
const error = ref<string>("");

const handleSignIn = async () => {
    try {
        isLoading.value = true;
        const result = await signIn("credentials", {
            password: password.value,
            email: email.value,
            redirect: false,
        });

        if (result?.ok && !result?.error) {
            await navigateTo("/");
        } else {
            error.value = result?.error ?? "Internal Server Error";
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
};

const socialAction = async (action: string) => {
    try {
        isLoading.value = true;
        const result = await signIn(action, { redirect: false });

        if (result && result.error) {
            error.value = result?.error ?? "Internal Server Error";
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div
        class="w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
        <h1 class="text-color1 font-bold text-3xl">Welcome Back</h1>
        <h3 class="text-sm">Select method to log in</h3>
        <div class="flex justify-center gap-x-5 mt-10">
            <BaseSocialButton
                name="google"
                size-icon="1.5rem"
                class="flex-grow"
                name-icon="Google"
                @handler="socialAction('google')"
            />
            <BaseSocialButton
                name="facebook"
                size-icon="1.5rem"
                class="flex-grow"
                name-icon="Facebook"
            />
        </div>
        <BaseSeperator text="Or continue with email" />
        <div class="mt-5 flex flex-col gap-y-5">
            <BaseMessages :is-error="true" :message="error" />
            <section class="grid gap-y-1">
                <BaseLabel name="email" />
                <BaseInput
                    id="email"
                    v-model="email"
                    input-type="email"
                    place-holder="Your Email Address"
                />
            </section>
            <section class="grid gap-y-1">
                <BaseLabel name="password" />
                <BaseInput
                    id="password"
                    v-model="password"
                    input-type="password"
                    place-holder="Your Password"
                />
            </section>
            <section class="flex gap-x-2">
                <BaseToggle />
                <BaseLabel name="Remember Me" />
            </section>
            <section class="grid gap-y-1">
                <BaseButton
                    event-type="button"
                    bg-color="bg-color1"
                    text-color="text-white"
                    border-color="border-border"
                    :title="!isLoading ? 'sign in' : ''"
                    @handler="handleSignIn"
                />
            </section>
        </div>
        <p class="mt-5 text-center">
            Don't have an account?
            <NuxtLink class="text-color1 font-bold cursor-pointer" to="/sign-up"
                >Sign up now!</NuxtLink
            >
        </p>
    </div>
</template>
