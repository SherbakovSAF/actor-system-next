import { cinematicWithUsersOptions } from "@/app/api/(lib)/consts.api";
import { HandlerResponse } from "@/lib/handler-response.lib";
import { CinematicWithUsers_DTO } from "@/types/cinematic.types";
import { Cinematic_M } from "@prisma/client";
import prisma from "@prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const data: Cinematic_M = await request.json();

    const updatedCinematic = await prisma.cinematic_M.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        startAt: data.startAt,
        countSheet: data.countSheet,
        endAt: data.endAt,
      },
      include: cinematicWithUsersOptions,
    });

    return NextResponse.json<CinematicWithUsers_DTO>(updatedCinematic);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Number(id)) throw new Error(HandlerResponse.const("NOT_FOUND"));
    await prisma.cinematic_M.delete({ where: { id: Number(id) } });

    return NextResponse.json(...HandlerResponse.nextResponse("OK"));
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}
