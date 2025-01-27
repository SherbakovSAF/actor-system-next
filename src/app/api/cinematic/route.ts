import { cinematicWithUsersOptions } from "@/app/api/(lib)/consts.api";
import { getPaginationParams } from "@/lib/get-params.lib";
import { HandlerResponse } from "@/lib/handler-response.lib";
import {
  CinematicCreate_DTO,
  CinematicWithUsers_DTO,
} from "@/types/cinematic.types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma.client";

export async function POST(request: NextRequest) {
  try {
    const data: CinematicCreate_DTO = await request.json();

    const allActors = await prisma.actor_M.findMany({ select: { id: true } });

    const cinematicMembersData = allActors.map((actor) => ({
      actorId: actor.id,
    }));

    const newCinematic = await prisma.cinematic_M.create({
      data: {
        title: data.title,
        startAt: new Date(data.startAt),
        countSheet: data.countSheet,
        description: data.description,
        cinematicMember: {
          createMany: {
            data: cinematicMembersData,
          },
        },
      },

      include: cinematicWithUsersOptions,
    });

    return NextResponse.json<CinematicWithUsers_DTO>(newCinematic);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { skip, take } = getPaginationParams(request);

    const cinematics = await prisma.cinematic_M.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: cinematicWithUsersOptions,
      skip,
      take,
    });
    return NextResponse.json<CinematicWithUsers_DTO[]>(cinematics);
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}
