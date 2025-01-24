import { CookiesName } from "@/types/cookies-name.type";
import prisma from "@prisma/prisma.client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/cookies-handler.lib";
import { HandlerResponse } from "@/lib/handler-response.lib";

export async function DELETE(request: NextRequest) {
  try {
    const cookiesStore = await cookies();

    const userIdByAccessToken = await getUserIdFromRequest(request);
    const refreshToken = cookiesStore.get(CookiesName.RefreshToken)?.value;
    if (!userIdByAccessToken || !refreshToken)
      return NextResponse.json(HandlerResponse.const("NOT_FOUND"));

    await prisma.refresh_M.delete({
      where: { token: refreshToken },
    });

    cookiesStore.delete(CookiesName.AccessToken);
    cookiesStore.delete(CookiesName.RefreshToken);

    return NextResponse.json(HandlerResponse.const("OK"));
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("BAD_REQUEST", error)
    );
  }
}
