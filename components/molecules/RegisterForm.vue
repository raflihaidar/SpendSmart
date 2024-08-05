<script setup lang="ts">
import { registerSchema } from "~/validators/register.schema";

const { handleSubmit } = useForm({
  validationSchema: registerSchema,
});

const { value: fullname } = useField("fullname");
const { value: username } = useField("username");
const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: confirm_password } = useField("confirm_password");

const isError = ref<any | null>(null);
const isLoading = ref(false);

const onSubmit = handleSubmit(async () => {
  try {
    isLoading.value = true;
    const { error } = await useFetch("/api/auth/register", {
      method: "post",
      body: {
        fullname,
        username,
        email,
        password,
        confirm_password,
      },
    });

    if (error) {
      isError.value = error.value?.statusMessage;
      return;
    }
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
    navigateTo("/sign-in");
  }
});
</script>

<template>
  <div>
    <h1 class="font-bold text-center">Register with</h1>
    <div class="flex justify-center gap-x-2 mt-10">
      <BaseSocialButton name="facebook" size-icon="2rem" />
      <BaseSocialButton name="google" size-icon="2rem" />
    </div>
    <BaseSeperator />
    <form class="flex flex-col gap-y-5" @submit.prevent="onSubmit">
      <BaseMessages message-type="error" :message="isError" />
      <section class="grid gap-y-1">
        <BaseLabel name="name" />
        <BaseInput
          id="fullname"
          v-model="fullname"
          input-type="text"
          place-holder="Your full name"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="username" />
        <BaseInput
          id="username"
          v-model="username"
          input-type="text"
          place-holder="Your username"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="email" />
        <BaseInput
          id="email"
          v-model="email"
          input-type="email"
          place-holder="Your email address"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="password" />
        <BaseInput
          id="password"
          v-model="password"
          input-type="password"
          place-holder="Your password"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="confirm password" />
        <BaseInput
          id="confirm_password"
          v-model="confirm_password"
          input-type="password"
          place-holder="confirm your password"
        />
      </section>
      <BaseButton
        event-type="submit"
        bg-color="bg-color1"
        text-color="text-white"
        border-color="border-border"
        :title="!isLoading ? 'sign up' : ''"
      />
    </form>
    <p class="mt-5 text-center">
      Already have an account?
      <NuxtLink class="text-color1 font-bold cursor-pointer" to="/sign-in"
        >sign in</NuxtLink
      >
    </p>
  </div>
</template>
