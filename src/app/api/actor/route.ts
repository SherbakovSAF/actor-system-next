import { HandlerResponse } from "@/lib/handler-response.lib";
import { ActorWithUser_DTO, CreateActor_DTO } from "@/types/actor.types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma.client";

export async function POST(request: NextRequest) {
  try {
    const data: CreateActor_DTO = await request.json();
    const newActor = await prisma.actor_M.create({
      data: { userId: data.userId },
      include: { user: true },
    });

    return NextResponse.json<ActorWithUser_DTO>(newActor);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}

export async function GET() {
  try {
    const allActors = await prisma.actor_M.findMany({
      include: { user: true },
    });

    return NextResponse.json<ActorWithUser_DTO[]>(allActors);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}
