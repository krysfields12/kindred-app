"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function joinGroup(groupSlug: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  await prisma.groupMember.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.groupMember.create({
    data: {
      groupSlug,
      userId,
    },
  });

  revalidatePath("/groups");
  revalidatePath(`/groups/${groupSlug}`);
}

export async function createGroupPost(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  const groupSlug = formData.get("groupSlug") as string;
  const content = formData.get("content") as string;

  if (!content.trim()) return;

  await prisma.groupPost.create({
    data: {
      groupSlug,
      userId,
      content,
    },
  });

  const author = await prisma.profile.findUnique({
  where: {
    clerkUserId: userId,
  },
});

const groupMembers = await prisma.groupMember.findMany({
  where: {
    groupSlug,
    userId: {
      not: userId,
    },
  },
});

await prisma.notification.createMany({
  data: groupMembers.map((member) => ({
    userId: member.userId,
    type: "group_post",
    message: `${author?.name ?? "Someone"} posted in your group.`,
    link: `/groups/${groupSlug}`,
  })),
});
  revalidatePath(`/groups/${groupSlug}`);
}

export async function deleteGroupPost(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  const postId = formData.get("postId") as string;
  const groupSlug = formData.get("groupSlug") as string;

  const post = await prisma.groupPost.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  if (post.userId !== userId) {
    throw new Error("You can only delete your own posts.");
  }

  await prisma.groupPost.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath(`/groups/${groupSlug}`);
}