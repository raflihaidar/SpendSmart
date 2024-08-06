// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/device",
    "@nuxt/eslint",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "@nuxt/icon",
    "@vee-validate/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
    googleId: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET_ID,
  },
  auth: {
    baseURL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/auth`
      : undefined,
    provider: {
      type: "authjs",
    },
  },
  imports: {
    autoImport: true,
    dirs: ["stores"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  plugins: [
    {
      src: "~/plugins/apexChart.ts",
      mode: "client",
    },
  ],
});
