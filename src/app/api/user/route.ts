import { userMinOptions } from "@/app/api/(lib)/consts.api";
import { getUserIdFromRequest } from "@/lib/cookies-handler.lib";
import { HandlerResponse } from "@/lib/handler-response.lib";
import { UserMinDTO_I } from "@/types/user.types";
import prisma from "@prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.user_M.findMany({
      select: userMinOptions.select,
    });

    return NextResponse.json<UserMinDTO_I[]>(data);
  } catch (error) {
    return NextResponse.json(HandlerResponse.nextResponse("NOT_FOUND", error));
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request).catch(() => null);
    if (!userId)
      return NextResponse.json(...HandlerResponse.nextResponse("NOT_FOUND"));

    const data: UserMinDTO_I = await request.json();
    const updatedUser: UserMinDTO_I = await prisma.user_M.update({
      where: { id: Number(userId) },
      data: {
        avatar: data.avatar,
        nickName: data.nickName,
        name: data.name,
      },
      select: userMinOptions.select,
    });
    return NextResponse.json<UserMinDTO_I>(updatedUser);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("BAD_REQUEST", error)
    );
  }
}
