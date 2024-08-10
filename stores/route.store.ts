export const routeStore = defineStore("route", () => {
  const currentPage = ref("Dashboard");

  return {
    currentPage,
  };
});
