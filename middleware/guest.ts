export default defineNuxtRouteMiddleware((to, from) => {
  const cookies = useRequestHeaders(["cookie"]); // Ambil semua cookies dari header
  const userToken = cookies?.cookie
    ?.split("; ")
    .find((cookie) => cookie.startsWith("next-auth.session-token"));

  if (
    (userToken && to.name === "sign-in") ||
    (userToken && to.name === "sign-up")
  ) {
    // Jika pengguna memiliki token (sudah login) dan mencoba ke halaman login
    return navigateTo("/");
  }
});
