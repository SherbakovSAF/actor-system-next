import { Actor_M, Prisma } from "@prisma/client";

export type CreateActor_DTO = Pick<Actor_M, "userId">;

export type ActorWithUser_DTO = Prisma.Actor_MGetPayload<{
  include: { user: true };
}>;
