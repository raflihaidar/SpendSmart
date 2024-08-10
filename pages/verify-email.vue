<script setup lang="ts">
import type { LocationQueryValue } from "#vue-router";
definePageMeta({
  layout: "auth",
});

type verify = {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
};

const code: verify = reactive({
  input1: "",
  input2: "",
  input3: "",
  input4: "",
  input5: "",
  input6: "",
});

const authStore = useAuthStore();
const { signIn, getSession } = useAuth();

const isLoading = ref(false);
const error = ref<string>("");

const combinedCode = computed(() => {
  // Gabungkan nilai input menjadi satu string
  const combinedString = `${code.input1}${code.input2}${code.input3}${code.input4}${code.input5}${code.input6}`;

  // Konversi string menjadi number, jika string tidak bisa dikonversi menjadi number, hasilnya NaN
  const combinedNumber = Number(combinedString);

  return combinedNumber;
});

const validateInput = (event: Event): void => {
  const inputElement = event.target as HTMLInputElement;
  let value = inputElement.value;

  // Menghapus semua karakter selain angka
  value = value.replace(/[^0-9]/g, "");

  inputElement.value = value;
};

const router = useRoute();

const email = ref<LocationQueryValue | LocationQueryValue[]>(null);

onMounted(() => {
  email.value = router.query.email;
});

const handleVerify = async () => {
  try {
    isLoading.value = true;
    await authStore.verifyEmail(email.value, combinedCode.value);
    navigateTo("/sign-in");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="bg-slate-100 w-screen h-screen">
    <main
      class="bg-white lg:w-auto w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 rounded-lg"
    >
      <section>
        <BaseMessages :is-error="true" :message="error" />
      </section>
      <section class="flex items-center gap-x-5 w-full">
        <div class="border border-color3 rounded-md pt-2 px-2">
          <Icon name="ic:round-mail-outline" size="2rem" style="padding: 0" />
        </div>
        <div>
          <h1 class="lg:text-2xl text-xl font-semibold">Check your email</h1>
          <p>
            we sent a code to
            <span class="underline cursor-pointer">{{ email }}</span>
          </p>
        </div>
      </section>
      <section class="w-full flex justify-center gap-x-3 mt-3">
        <input
          type="text"
          maxlength="1"
          id="input-1"
          v-model="code.input1"
          @input="validateInput($event)"
          class="lg:text-3xl text-xl lg:w-20 lg:h-20 w-10 h-10 border-2 border-black rounded-lg text-center outline-none"
        />
        <input
          type="text"
          maxlength="1"
          id="input-2"
          v-model="code.input2"
          @input="validateInput($event)"
          class="lg:text-3xl text-xl lg:w-20 lg:h-20 w-10 h-10 border-2 border-black rounded-lg text-center outline-none"
        />
        <input
          type="text"
          maxlength="1"
          id="input-3"
          v-model="code.input3"
          @input="validateInput($event)"
          class="lg:text-3xl text-xl lg:w-20 lg:h-20 w-10 h-10 border-2 border-black rounded-lg text-center outline-none"
        />
        <input
          type="text"
          maxlength="1"
          id="input-4"
          v-model="code.input4"
          @input="validateInput($event)"
          class="lg:text-3xl text-xl lg:w-20 lg:h-20 w-10 h-10 border-2 border-black rounded-lg text-center outline-none"
        />
        <input
          type="text"
          maxlength="1"
          id="input-5"
          v-model="code.input5"
          @input="validateInput($event)"
          class="lg:text-3xl text-xl lg:w-20 lg:h-20 w-10 h-10 border-2 border-black rounded-lg text-center outline-none"
        />
        <input
          type="text"
          maxlength="1"
          id="input-6"
          v-model="code.input6"
          @input="validateInput($event)"
          class="lg:text-3xl text-xl lg:w-20 lg:h-20 w-10 h-10 border-2 border-black rounded-lg text-center outline-none"
        />
      </section>
      <section class="text-center mt-5 w-full">
        <p class="text-sm">
          Didn't get a code ?
          <span class="underline font-semibold">Click to resend</span>
        </p>
      </section>
      <section class="flex justify-between gap-x-3 mt-3 w-full">
        <BaseButton
          eventType="button"
          title="Cancel"
          borderColor="border-color3"
          textColor="text-black"
        />
        <BaseButton
          eventType="button"
          bgColor="bg-color1"
          :title="!isLoading ? 'Verify' : ''"
          textColor="text-white"
          @handler="handleVerify"
        />
      </section>
    </main>
  </div>
</template>
