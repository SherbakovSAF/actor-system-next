import { HandlerResponse } from "@/lib/handler-response.lib";
import { NextRequest, NextResponse, userAgent } from "next/server";
import prisma from "@prisma/prisma.client";
import {
  createAccessTokenCookie,
  createRefreshTokenCookie,
} from "@/lib/cookies-handler.lib";
import { genPass } from "@/lib/hash-password.lib";
import { AuthSignUpUser_T } from "@/types/auth.types";

export async function POST(request: NextRequest) {
  try {
    const data: AuthSignUpUser_T = await request.json();

    const newUser = await prisma.user_M.create({
      data: {
        nickName: data.nickName,
        password: await genPass(data.password),
        mail: data.mail ?? "",
      },
    });

    const response = NextResponse.json(
      ...HandlerResponse.nextResponse("CREATED")
    );
    await createAccessTokenCookie(response, newUser.id);
    const newRefreshToken = await createRefreshTokenCookie(response);

    await prisma.refresh_M.create({
      data: {
        token: newRefreshToken,
        userId: newUser.id,
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
