import { UserMinDTO_I } from "@/types/user.types";

import { callApi } from "./base.service";

export const getUser = async (): Promise<UserMinDTO_I> => {
  try {
    return callApi<UserMinDTO_I>("GET", "user/1");
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // toast.error("Не удалось получить ваши данные");
    throw new Error();
  }
};

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

export const updateUser = async (user: UserMinDTO_I): Promise<UserMinDTO_I> => {
  try {
    return callApi<UserMinDTO_I>("PUT", "user", user);
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // toast.error("Не удалось получить ваши данные");
    throw new Error();
  }
};
