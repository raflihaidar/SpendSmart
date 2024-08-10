import { defineStore } from "pinia";
import type { ICreateUser, ILogin, UserState } from "~/types/IUser";
import type { LocationQueryValue } from "#vue-router";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isLoading: Ref<boolean> = ref(false);
    const isError: Ref<any | null> = ref(null);
    const user = ref<UserState | null>(null);
    const getUserData = async (payload: any): Promise<void> => {
      user.value = payload;
    };

    const verifyEmail = async (
      email: LocationQueryValue | LocationQueryValue[],
      token: number
    ): Promise<ILogin | null> => {
      try {
        isLoading.value = true;
        const res: ILogin = await $fetch(
          `/api/auth/verify-email?email=${email}&token=${token}`,
          {
            method: "POST",
            body: {
              email,
              token,
            },
          }
        );

        if (!res) {
          return null;
        }
        return res;
      } catch (error: Error) {
        isError.value = error.messages;
        throw error;
      } finally {
        isLoading.value = false;
      }
    };

    const register = async (payload: ICreateUser) => {
      try {
        isLoading.value = true;
        await $fetch("/api/auth/register", {
          method: "post",
          body: {
            name: payload.name,
            username: payload.username,
            email: payload.email,
            password: payload.password,
            confirm_password: payload.confirm_password,
          },
        });

        console.log("work");

        return true;
      } catch (error) {
        isError.value = error;
        throw error;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      user,
      isLoading,
      isError,
      getUserData,
      verifyEmail,
      register,
    };
  },
  {
    persist: true,
  }
);
