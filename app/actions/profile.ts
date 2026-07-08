"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function saveProfile(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to create a profile.");
  }

  const name = formData.get("name") as string;
  const location = formData.get("location") as string;
  const lifeTransition = formData.get("lifeTransition") as string;
  const goals = formData.get("goals") as string;
  const interests = formData.get("interests") as string;
  const bio = formData.get("bio") as string;

await prisma.profile.upsert({
  where: {
    clerkUserId: userId,
  },
  update: {
    name,
    location,
    transition: lifeTransition,
    goals: goals.split(",").map((goal) => goal.trim()),
    interests: interests.split(",").map((interest) => interest.trim()),
    bio,
  },
  create: {
    clerkUserId: userId,
    name,
    location,
    transition: lifeTransition,
    goals: goals.split(",").map((goal) => goal.trim()),
    interests: interests.split(",").map((interest) => interest.trim()),
    bio,
  },
});

  redirect("/profile");
}