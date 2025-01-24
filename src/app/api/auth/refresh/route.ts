import { CookiesName } from "@/types/cookies-name.type";
import { getPayloadJWTToken } from "@/lib/jwt-tokens.lib";
import prisma from "@prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";
import { HandlerResponse } from "@/lib/handler-response.lib";
import { createAccessTokenCookie } from "@/lib/cookies-handler.lib";

export async function GET(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get(CookiesName.RefreshToken)?.value;

    if (!refreshToken) throw new Error(HandlerResponse.const("NOT_FOUND"));
    if (!getPayloadJWTToken(refreshToken))
      throw new Error(HandlerResponse.const("UNAUTHORIZED"));

    const { userId } = await prisma.refresh_M.findFirstOrThrow({
      where: { token: refreshToken },
      select: { userId: true },
    });

    const response = NextResponse.json(
      ...HandlerResponse.nextResponse("CREATED")
    );
    await createAccessTokenCookie(response, userId);

    return response;
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("BAD_REQUEST", error)
    );
  }
}
