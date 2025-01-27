import { HandlerResponse } from "@/lib/handler-response.lib";
import { MemberWithUser_DTO } from "@/types/member.types";
import { CinematicMember_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma.client";

export async function POST(request: NextRequest) {
  try {
    const data: CinematicMember_M[] = await request.json();

    const newMembers = await prisma.cinematicMember_M.createManyAndReturn({
      data: data,
      include: { actor: { include: { user: true } } },
    });

    return NextResponse.json<MemberWithUser_DTO[]>(newMembers);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data: MemberWithUser_DTO[] = await request.json();
    const updatedMember: MemberWithUser_DTO[] =
      await prisma.cinematicMember_M.updateManyAndReturn({
        data,
        include: { actor: { include: { user: true } } },
      });
    return NextResponse.json<MemberWithUser_DTO[]>(updatedMember);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}
