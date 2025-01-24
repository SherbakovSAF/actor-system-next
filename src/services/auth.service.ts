// import { toast } from "sonner";
import { callApi } from "@/services/base.service";
import { AuthSignUpUser_T, AuthSingInUser_T } from "@/types/auth.types";

export const signInService = async (signInDTO: AuthSingInUser_T) => {
  try {
    const result = await callApi("POST", "auth/sign-in", signInDTO);
    // TODO: Добавить toast
    // toast.success("Успешный вход", {
    //   description: "Ожидайте перехода на главный экран",
    // });
    return result;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // TODO: Добавить toast
    // toast.error("Ошибка входа");
    return null;
  }
};

export const signUpService = async (signUpDTO: AuthSignUpUser_T) => {
  try {
    const result = await callApi("POST", "auth/sign-up", signUpDTO);
    // TODO: Добавить toast
    // toast.success("Успешная регистрация", {
    //   description: "Ожидайте перехода на главный экран",
    // });
    return result;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // TODO: Добавить toast
    // toast.error("Ошибка регистрации");
    return null;
  }
};

export const signOutService = async () => {
  try {
    const result = await callApi("DELETE", "auth/sign-out");
    // TODO: Добавить toast
    // toast("Пока", {
    //   description: "Будем ждать тебя снова",
    // });
    return result;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // TODO: Добавить toast
    // toast.error("Не удалось выйти");
    return null;
  }
};
