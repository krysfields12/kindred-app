"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/");
  revalidatePath("/notifications");

  redirect(notification.link ?? "/notifications");
}