import { defineStore } from "pinia";
import type { ICreateUser, ILogin, UserState } from "~/types/IUser";
import type { LocationQueryValue } from "#vue-router";

export const useAuthStore = defineStore("auth", () => {
  const isLoading: Ref<boolean> = ref(false);
  const isError: Ref<any | null> = ref(null);
  const { data, signOut } = useAuth();

  const user = computed<UserState | null>(() => data.value?.user || null);

  const verifyEmail = async (
    email: LocationQueryValue | LocationQueryValue[],
    token: number,
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
        },
      );

      if (!res) {
        return null;
      }
      return res;
    } catch (error: Error) {
      isError.value = error;
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

      return true;
    } catch (error) {
      isError.value = error;
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const resetError = async () => {
    isError.value = "";
  };
  return {
    user,
    isLoading,
    logout,
    isError,
    verifyEmail,
    register,
    resetError,
  };
});
