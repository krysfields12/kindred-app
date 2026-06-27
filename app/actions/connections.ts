"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendConnectionRequest(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to connect.");
  }

  const receiverId = formData.get("receiverId") as string;
  const message = formData.get("message") as string;

  if (userId === receiverId) {
    throw new Error("You cannot connect with yourself.");
  }

  await prisma.connection.upsert({
    where: {
      senderId_receiverId: {
        senderId: userId,
        receiverId,
      },
    },
    update: {
      message,
      status: "pending",
    },
    create: {
      senderId: userId,
      receiverId,
      message,
      status: "pending",
    },
  });
  await prisma.notification.create({
    data: {
      userId: receiverId,
      type: "connection_request",
      message: "Someone sent you a connection request.",
      link: "/requests",
    },
 });
}

export async function acceptConnectionRequest(connectionId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  await prisma.connection.update({
    where: {
      id: connectionId,
      receiverId: userId,
    },
    data: {
      status: "accepted",
    },
  });

  revalidatePath("/requests");
}

export async function declineConnectionRequest(connectionId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  await prisma.connection.update({
    where: {
      id: connectionId,
      receiverId: userId,
    },
    data: {
      status: "declined",
    },
  });

  revalidatePath("/requests");
}