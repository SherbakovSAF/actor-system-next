import { HandlerResponse } from "@/lib/handler-response.lib";
import { verifyPass } from "@/lib/hash-password.lib";
import { NextRequest, NextResponse, userAgent } from "next/server";
import prisma from "@prisma/prisma.client";
import {
  createAccessTokenCookie,
  createRefreshTokenCookie,
} from "@/lib/cookies-handler.lib";
import { AuthSingInUser_T } from "@/types/auth.types";

export async function POST(request: NextRequest) {
  try {
    const data: AuthSingInUser_T = await request.json();

    const finedUser = await prisma.user_M.findFirstOrThrow({
      where: {
        OR: [{ nickName: data.nickName }, { mail: data.nickName }],
      },
    });

    if (!(await verifyPass(data.password, finedUser.password)))
      return NextResponse.json(...HandlerResponse.nextResponse("NOT_FOUND"));

    const response = NextResponse.json(
      ...HandlerResponse.nextResponse("CREATED")
    );

    await createAccessTokenCookie(response, finedUser.id);
    const newRefreshToken = await createRefreshTokenCookie(response);

    await prisma.refresh_M.create({
      data: {
        token: newRefreshToken,
        userId: finedUser.id,
        agent: userAgent(request).ua,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("BAD_REQUEST", error)
    );
  }
}
