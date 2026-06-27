"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  const receiverId = formData.get("receiverId") as string;
  const content = formData.get("content") as string;
  const profileId = formData.get("profileId") as string;

  if (!content.trim()) {
    return;
  }

  await prisma.message.create({
    data: {
      senderId: userId,
      receiverId,
      content,
      isRead: false,
    },
  });

  revalidatePath(`/messages/${profileId}`);
}