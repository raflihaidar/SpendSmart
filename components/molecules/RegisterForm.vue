<script setup lang="ts">
import { registerSchema } from "~/validators/register.schema";

const { handleSubmit } = useForm({
  validationSchema: registerSchema,
});

const { value: name } = useField<string>("name");
const { value: username } = useField<string>("username");
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: confirm_password } = useField<string>("confirm_password");

const authStore = useAuthStore();
const { isLoading, isError } = storeToRefs(authStore);

const onSubmit = handleSubmit(async () => {
  const result = await authStore.register({
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    confirm_password: confirm_password.value,
  });

  if (result) {
    navigateTo(`/verify-email?email=${email.value}`);
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
    <div class="flex flex-col gap-y-5">
      <BaseMessages message-type="error" :message="isError" />
      <section class="grid gap-y-1">
        <BaseLabel name="name" />
        <BaseInput
          id="name"
          v-model="name"
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
        event-type="button"
        bg-color="bg-color1"
        text-color="text-white"
        border-color="border-border"
        :title="!isLoading ? 'sign up' : ''"
        @handler="onSubmit"
      />
    </div>
    <p class="mt-5 text-center">
      Already have an account?
      <NuxtLink class="text-color1 font-bold cursor-pointer" to="/sign-in"
        >sign in</NuxtLink
      >
    </p>
  </div>
</template>
