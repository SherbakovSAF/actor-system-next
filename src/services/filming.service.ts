import { Filming_DTO } from "@/types/filming.types";

export const createFilmingService = (
  title: string,
  dateStart: Date
): Promise<Filming_DTO> => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          users: [{ id: 1 }, { id: 2 }, { id: 3 }],
          filming: {
            id: 1,
            title,
            dateStart: dateStart.toISOString(),
          },
        });
      }, 1000);
      // reject("Не получилось");
    });
  } catch {
    alert("не удалось создать съёмку");
    throw new Error("не удалось создать съёмку");
  }
};

export const removeActorFromFilmingService = (
  idFilming: number,
  idActor: number
): Promise<{ title: string }> => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: idActor + idFilming + "",
        });
      }, 1000);
      // reject("Не получилось");
    });
  } catch {
    alert("не удалось убрать  актёра");
    throw new Error("не удалось убрать  актёра");
  }
};
