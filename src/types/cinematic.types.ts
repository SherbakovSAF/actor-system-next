import { Cinematic_M, Prisma } from "@prisma/client";

export type CinematicCreate_DTO = Pick<
  Cinematic_M,
  "title" | "startAt" | "countSheet" | "description"
>;

export type CinematicWithUsers_DTO = Prisma.Cinematic_MGetPayload<{
  include: {
    cinematicMember: {
      include: { actor: { include: { user: true } } };
    };
  };
}>;
