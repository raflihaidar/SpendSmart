<script setup lang="ts">
const email = ref("");
const password = ref("");
const isLoading = ref(false);
import { useAuthStore } from "~/stores/auth.store";

const store = useAuthStore();

const { user } = storeToRefs(store);
const { signIn, getSession } = useAuth();
let error = ref<string>("");

const handleSignIn = async () => {
  try {
    isLoading.value = true;
    let result = await signIn("credentials", {
      password: password.value,
      email: email.value,
      redirect: false,
    });

    if (result?.ok && !result.error) {
      const session = await getSession();
      store.getUserData(session.user);
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
    let result = await signIn(action, { redirect: true });

    if (result?.ok && !result.error) {
      await navigateTo("/");
    } else {
      error.value = result?.error ?? "Internal Server Error";
      alert("error");
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
        @click="socialAction('google')"
        name="google"
        sizeIcon="1.5rem"
        class="flex-grow"
        nameIcon="Google"
      />
      <BaseSocialButton
        name="facebook"
        sizeIcon="1.5rem"
        class="flex-grow"
        nameIcon="Facebook"
      />
    </div>
    <BaseSeperator text="Or continue with email" />
    <div class="mt-5 flex flex-col gap-y-5">
      <BaseMessages :is-error="true" :message="error" />
      <section class="grid gap-y-1">
        <BaseLabel name="email" />
        <BaseInput
          v-model="email"
          inputType="email"
          placeHolder="Your Email Address"
          id="email"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="password" />
        <BaseInput
          v-model="password"
          inputType="password"
          placeHolder="Your Password"
          id="password"
        />
      </section>
      <section class="flex gap-x-2">
        <BaseToggle />
        <BaseLabel name="Remember Me" />
      </section>
      <section class="grid gap-y-1">
        <BaseButton
          eventType="signin"
          bgColor="bg-color1"
          textColor="text-white"
          borderColor="border-border"
          :title="!isLoading ? 'sign in' : ''"
          @signin="handleSignIn"
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
