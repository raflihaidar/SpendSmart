import { defineStore } from "pinia";
import type { UserState } from "~/types/IUser";
// import type { UserState } from "~/types/IUser";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<UserState | null>(null);

    const getUserData = async (payload: any): Promise<void> => {
      user.value = payload;
    };

    return {
      user,
      getUserData,
    };
  },
  {
    persist: true,
  }
);
