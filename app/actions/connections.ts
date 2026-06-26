"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
}