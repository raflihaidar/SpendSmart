<script setup lang="ts">
definePageMeta({
    layout: "auth",
});

// Definisikan tipe untuk kode verifikasi
type Verify = {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    input5: string;
    input6: string;
};

// Reactive object untuk menyimpan nilai input
const code: Verify = reactive({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
});

// Refs untuk menyimpan referensi input elements
const inputRefs = ref<HTMLInputElement[]>([]);

const authStore = useAuthStore();
const { isError, isLoading } = storeToRefs(authStore);

// Gabungkan nilai input menjadi satu kode verifikasi
const combinedCode = computed(() => {
    const combinedString = `${code.input1}${code.input2}${code.input3}${code.input4}${code.input5}${code.input6}`;
    return Number(combinedString);
});

// Validasi input dan pindahkan fokus ke input berikutnya
const validateInput = (event: Event, index: number): void => {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Menghapus semua karakter selain angka
    value = value.replace(/[^0-9]/g, "");
    inputElement.value = value;

    // Pindahkan fokus ke input berikutnya jika ada
    if (value.length === 1 && index < 6) {
        inputRefs.value[index].focus();
    }
};

// Ambil email dari query params
const router = useRoute();
const email = ref<string | null>(null);

onMounted(() => {
    email.value = router.query.email as string | null;
});

// Fungsi untuk menangani verifikasi
const handleVerify = async () => {
    await authStore.verifyEmail(email.value, combinedCode.value);
    navigateTo("/sign-in");
};

const handleCancel = () => {
    useRouter().push("/sign-up");
    authStore.resetError();
};

watch(
    () => isError.value,
    (newValue: boolean) => {
        if (newValue) {
            code.input1 = "";
            code.input2 = "";
            code.input3 = "";
            code.input4 = "";
            code.input5 = "";
            code.input6 = "";
        }
    },
);
</script>

<template>
    <div class="bg-slate-100 w-screen h-screen">
        <main
            class="bg-white lg:w-auto w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 rounded-lg"
        >
            <section class="mb-5">
                <BaseMessages :is-error="true" :message="isError" />
            </section>
            <section class="flex items-center gap-x-5 w-full">
                <div class="border border-color3 rounded-md pt-2 px-2">
                    <Icon
                        name="ic:round-mail-outline"
                        size="2rem"
                        style="padding: 0"
                    />
                </div>
                <div>
                    <h1 class="lg:text-2xl text-xl font-semibold">
                        Check your email
                    </h1>
                    <p>
                        We sent a code to
                        <span class="underline cursor-pointer">{{
                            email
                        }}</span>
                    </p>
                </div>
            </section>
            <section class="w-full flex justify-center gap-x-3 mt-3">
                <input
                    v-for="(input, index) in 6"
                    :key="index"
                    type="text"
                    maxlength="1"
                    v-model="code[`input${index + 1}`]"
                    ref="inputRefs"
                    :class="
                        code[`input${index + 1}`]
                            ? 'border-color1'
                            : 'border-black'
                    "
                    class="lg:text-3xl text-xl lg:w-20 lg:h-20 w-10 h-10 border-2 border-black rounded-lg text-center outline-none"
                    @input="validateInput($event, index + 1)"
                />
            </section>
            <section class="text-center mt-5 w-full">
                <p class="text-sm">
                    Didn't get a code?
                    <span class="underline font-semibold cursor-pointer"
                        >Click to resend</span
                    >
                </p>
            </section>
            <section class="flex justify-between gap-x-3 mt-3 w-full">
                <BaseButton
                    event-type="button"
                    title="Cancel"
                    border-color="border-color3"
                    text-color="text-black"
                    @handler="handleCancel"
                />
                <BaseButton
                    event-type="button"
                    bg-color="bg-color1"
                    :title="!isLoading ? 'Verify' : ''"
                    text-color="text-white"
                    @handler="handleVerify"
                />
            </section>
        </main>
    </div>
</template>
