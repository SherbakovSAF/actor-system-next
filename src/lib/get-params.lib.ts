"only server";

import { Pagination_I } from "@/types/main.types";
import { NextRequest } from "next/server";

export const getPaginationParams = (request: NextRequest): Pagination_I => {
  const skip = Number(request.nextUrl.searchParams.get("skip"));
  const take = Number(request.nextUrl.searchParams.get("take"));

  if (skip && take) return { skip, take };
  return { skip: 0, take: 10 };
};
