import {
  CinematicCreate_DTO,
  CinematicWithUsers_DTO,
} from "@/types/cinematic.types";
import { Pagination_I } from "@/types/main.types";
import { Cinematic_M } from "@prisma/client";
import { callApi } from "@/services/base.service";

export const createCinematicService = (
  data: CinematicCreate_DTO
): Promise<CinematicWithUsers_DTO> => {
  try {
    return callApi("POST", "cinematic", data);
  } catch {
    alert("не удалось создать съёмку");
    throw new Error("не удалось создать съёмку");
  }
};

export const getAllCinematics = (settings?: Pagination_I) => {
  try {
    return callApi<CinematicWithUsers_DTO[]>("GET", "cinematic", null, {
      ...settings,
    });
  } catch {
    throw new Error("не удалось получить съёмки");
  }
};

export const deleteCinematicsService = (id: Cinematic_M["id"]) => {
  try {
    return callApi("DELETE", `cinematic/${id}`);
  } catch {
    throw new Error("не удалось получить съёмки");
  }
};

export const updateCinematicsService = (cinematic: Cinematic_M) => {
  try {
    return callApi<CinematicWithUsers_DTO>(
      "PUT",
      `cinematic/${cinematic.id}`,
      cinematic
    );
  } catch {
    throw new Error("не удалось получить съёмки");
  }
};
