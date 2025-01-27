import { CinematicMember_M, Prisma } from "@prisma/client";

export type CreateMember_DTO = Pick<
  CinematicMember_M,
  "actorId" | "cinematicId"
>;

export type MemberWithUser_DTO = Prisma.CinematicMember_MGetPayload<{
  include: { actor: { include: { user: true } } };
}>;

export type DeleteMember_DTO = Pick<CinematicMember_M, "id">;
