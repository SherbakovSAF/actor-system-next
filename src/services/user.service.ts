import { UserMinDTO_I } from "@/types/user.types";

import { callApi } from "./base.service";

// TODO: Добавить пагинацию
export const getAllUser = async (): Promise<UserMinDTO_I[]> => {
  try {
    return callApi<UserMinDTO_I[]>("GET", "user");
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // toast.error("Не удалось получить ваши данные");
    throw new Error();
  }
};
