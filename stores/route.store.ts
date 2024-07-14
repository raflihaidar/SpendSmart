import { defineStore } from "pinia";

export const routeStore = defineStore("route", () => {
  const currentPath = useRoute();
  const currentPage = ref("Dashboard");

  return {
    currentPage,
  };
});
