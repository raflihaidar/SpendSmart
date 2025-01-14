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
    "nuxt-mailer",
  ],

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
    mailerUser: process.env.NUXT_MAILER_USER,
    mailerPass: process.env.NUXT_MAILER_PASS,
    mailerLog: process.env.NUXT_MAILER_LOG,
    mailerDriver: process.env.NUXT_MAILER_DRIVER,
    mailerHost: process.env.NUXT_MAILER_HOST,
    mailerPort: process.env.NUXT_MAILER_PORT,
    mailerSmtpTls: process.env.NUXT_MAILER_SMTP_TLS,
    mailerFromAddress: "",
    mailerToAddress: "",

    googleId: "",
    googleSecret: "",

    facebookId: "",
    facebookSecret: "",
  },

  auth: {
    isEnabled: true,
    // baseURL: `https://spend-smart-one.vercel.app/api/auth`,
    baseURL: "http://localhost:3000",
    provider: {
      type: "authjs",
      trustHost: true,
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

  compatibilityDate: "2025-01-14",
});
