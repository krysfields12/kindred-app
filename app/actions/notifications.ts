"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function openNotification(notificationId: string) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId,
    },
  });

  if (!notification) {
    redirect("/notifications");
  }

  await prisma.notification.update({
    where: {
      id: notification.id,
    },
    data: {
      isRead: true,
    },
  });

  redirect(notification.link ?? "/notifications");
}