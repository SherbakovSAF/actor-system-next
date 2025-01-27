import { Prisma } from "@prisma/client";

export const cinematicWithUsersOptions = {
  cinematicMember: {
    orderBy: {
      id: Prisma.SortOrder.desc,
    },
    include: { actor: { include: { user: true } } },
  },
};

export const userMinOptions = {
  select: {
    id: true,
    name: true,
    isVerifyMail: true,
    mail: true,
    quote: true,
    avatar: true,
    nickName: true,
    createdAt: true,
    isApprove: true,
  },
};
