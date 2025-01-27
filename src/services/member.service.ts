import {
  CreateMember_DTO,
  DeleteMember_DTO,
  MemberWithUser_DTO,
} from "@/types/member.types";
import { CinematicMember_M } from "@prisma/client";
import { callApi } from "@/services/base.service";

export const createMembersService = (
  members: CreateMember_DTO[]
): Promise<MemberWithUser_DTO[]> => {
  try {
    return callApi<MemberWithUser_DTO[]>("POST", "member", members);
  } catch {
    alert("не удалось создать съёмку");
    throw new Error("не удалось создать съёмку");
  }
};

// TODO: Вернуться к нормальной типизации. Как то надо на сервере понимать что мне придёт id: number
export const updateMembersService = (
  member: MemberWithUser_DTO
): Promise<MemberWithUser_DTO> => {
  try {
    return callApi("PUT", `member/${member.id}`, member);
  } catch {
    alert("не удалось создать съёмку");
    throw new Error("не удалось создать съёмку");
  }
};

// TODO: Вернуться к нормальной типизации. Как то надо на сервере понимать что мне придёт id: number
export const deleteMembersService = (
  id: DeleteMember_DTO["id"]
): Promise<CinematicMember_M[]> => {
  try {
    return callApi("DELETE", `member/${id}`);
  } catch {
    alert("не удалось создать съёмку");
    throw new Error("не удалось создать съёмку");
  }
};
