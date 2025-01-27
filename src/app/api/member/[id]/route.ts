import { HandlerResponse } from "@/lib/handler-response.lib";
import { MemberWithUser_DTO } from "@/types/member.types";
import prisma from "@prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: MemberWithUser_DTO = await request.json();
    const updatedMember: MemberWithUser_DTO =
      await prisma.cinematicMember_M.update({
        where: { id: Number(id) },
        data: {
          isPromiseCome: data.isPromiseCome,
          wasHours: data.wasHours,
        },
        include: {
          actor: { include: { user: true } },
        },
      });
    return NextResponse.json<MemberWithUser_DTO>(updatedMember);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}

// TODO: Вернуться к нормальной типизации. Как то надо на сервере понимать что мне придёт id: number
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.cinematicMember_M.delete({ where: { id: Number(id) } });

    return NextResponse.json(...HandlerResponse.nextResponse("OK"));
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}
