import { HandlerResponse } from "@/lib/handler-response.lib";
import { UserMinDTO_I } from "@/types/user.types";
import prisma from "@prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";
import { userMinOptions } from "@/app/api/(lib)/consts.api";
import { getUserIdFromRequest } from "@/lib/cookies-handler.lib";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request).catch(() => null);
    if (!userId)
      return NextResponse.json(...HandlerResponse.nextResponse("NOT_FOUND"));

    const finedUser: UserMinDTO_I = await prisma.user_M.findFirstOrThrow({
      where: { id: Number(userId) },
      select: userMinOptions.select,
    });
    return NextResponse.json<UserMinDTO_I>(finedUser);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}
