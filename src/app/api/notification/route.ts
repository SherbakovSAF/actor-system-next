import { Notification_M } from "./../../../../node_modules/.prisma/client/index.d";
import { getUserIdFromRequest } from "@/lib/cookies-handler.lib";
import { HandlerResponse } from "@/lib/handler-response.lib";
import prisma from "@prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) throw new Error(HandlerResponse.const("NOT_FOUND"));

    const data = await request.json();

    if (!data) throw new Error(HandlerResponse.const("NOT_FOUND"));

    if (!data.keys.auth || !data.keys.p256dh)
      throw new Error(HandlerResponse.const("NOT_FOUND"));
    await prisma.notification_M.create({
      data: {
        userId,
        endpoint: data.endpoint,
        p256dh: data.keys.p256dh,
        auth: data.keys.auth,
      },
    });
    return NextResponse.json(...HandlerResponse.nextResponse("OK"));
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) throw new Error(HandlerResponse.const("NOT_FOUND"));
    const data: PushSubscription = await request.json();
    if (!data) throw new Error(HandlerResponse.const("NOT_FOUND"));

    const requestNotification = await prisma.notification_M
      .delete({
        where: {
          userId,
          endpoint: data.endpoint,
        },
      })
      .catch(() => null);

    if (!requestNotification)
      NextResponse.json(
        ...HandlerResponse.nextResponse("NOT_FOUND_NOTIFICATION")
      );
    return NextResponse.json(...HandlerResponse.nextResponse("OK"));
  } catch (error) {
    return NextResponse.json(
      ...HandlerResponse.nextResponse("NOT_FOUND", error)
    );
  }
}

import { sendNotification, setVapidDetails } from "web-push";
setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);
export async function GET(request: NextRequest) {
  try {
    const endpoint = request.nextUrl.searchParams.get("endpoint");
    if (!endpoint) throw new Error(HandlerResponse.const("NOT_FOUND"));
    const sub = await prisma.notification_M.findFirst({
      where: { endpoint },
    });
    if (!sub) throw new Error(HandlerResponse.const("NOT_FOUND"));
    return NextResponse.json(...HandlerResponse.nextResponse("OK"));
  } catch {
    return NextResponse.json(...HandlerResponse.nextResponse("NOT_FOUND"));
  }
}

const sendPushNotificationOrErr = async (
  notification: Notification_M,
  options: { title?: string; body: string }
) => {
  try {
    const { endpoint, auth, p256dh } = notification;
    const payload = {
      title: options.title ?? "Уведомление",
      body: options.body,
    };

    await sendNotification(
      { endpoint, keys: { auth, p256dh }, expirationTime: null },
      JSON.stringify(payload)
    );
  } catch {
    throw new Error(HandlerResponse.const("BAD_REQUEST"));
  }
};
