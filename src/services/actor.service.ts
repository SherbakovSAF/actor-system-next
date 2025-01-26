import { ActorWithUser_DTO, CreateActor_DTO } from "@/types/actor.types";
import { Actor_M } from "@prisma/client";
import { callApi } from "./base.service";

// TODO: Добавить пагинацию
export const createActorService = async (
  actor: CreateActor_DTO
): Promise<Actor_M> => {
  try {
    return callApi<Actor_M>("POST", "actor", actor);
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // toast.error("Не удалось получить ваши данные");
    throw new Error();
  }
};

export const getActorsService = async (): Promise<ActorWithUser_DTO[]> => {
  try {
    return callApi<ActorWithUser_DTO[]>("GET", "actor");
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    // toast.error("Не удалось получить ваши данные");
    throw new Error();
  }
};
