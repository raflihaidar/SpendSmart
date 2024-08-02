<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { registerSchema } from "~/validators/register.schema";

const { handleSubmit } = useForm({
  validationSchema: registerSchema,
});

const { value: fullname } = useField("fullname");
const { value: username } = useField("username");
const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: confirm_password } = useField("confirm_password");

let isError = ref<any | null>(null);
let isLoading = ref(false);

const onSubmit = handleSubmit(async (values: any) => {
  try {
    isLoading.value = true;
    const { error, data: response } = await useFetch("/api/auth/register", {
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
      console.log(isError.value);
      return;
    }
  } catch (error) {
    console.log("error : ", error);
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
      <BaseSocialButton name="facebook" sizeIcon="2rem" />
      <BaseSocialButton name="google" sizeIcon="2rem" />
    </div>
    <BaseSeperator />
    <form class="flex flex-col gap-y-5" @submit.prevent="onSubmit">
      <BaseMessages messageType="error" :message="isError" />
      <section class="grid gap-y-1">
        <BaseLabel name="name" />
        <BaseInput
          v-model="fullname"
          inputType="text"
          placeHolder="Your full name"
          id="fullname"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="username" />
        <BaseInput
          v-model="username"
          inputType="text"
          placeHolder="Your username"
          id="username"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="email" />
        <BaseInput
          v-model="email"
          inputType="email"
          placeHolder="Your email address"
          id="email"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="password" />
        <BaseInput
          v-model="password"
          inputType="password"
          placeHolder="Your password"
          id="password"
        />
      </section>
      <section class="grid gap-y-1">
        <BaseLabel name="confirm password" />
        <BaseInput
          v-model="confirm_password"
          inputType="password"
          placeHolder="confirm your password"
          id="confirm_password"
        />
      </section>
      <BaseButton
        eventType="signin"
        bgColor="bg-color1"
        textColor="text-white"
        borderColor="border-border"
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
