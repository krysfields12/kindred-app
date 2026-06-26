import MatchCard from "@/app/components/MatchCard";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MatchesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const profiles = await prisma.profile.findMany({
    where: {
      clerkUserId: {
        not: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Discover Your People</h1>

        <p className="text-lg mb-10">
          People navigating similar journeys, goals, and life transitions.
        </p>

        {profiles.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
            <h2 className="text-2xl font-bold mb-2">No matches yet</h2>
            <p className="text-gray-300">
              As more people join Kindred, you’ll see profiles here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {profiles.map((profile) => (
              <MatchCard
                key={profile.id}
                match={{
                  slug: profile.id,
                  name: profile.name,
                  transition: profile.transition ?? "Life Transition",
                  location: profile.location ?? "Location not provided",
                  goals: profile.goals,
                  interests: profile.interests,
                  matchReasons: [
                    profile.transition ?? "Shared Journey",
                    ...profile.interests.slice(0, 2),
                  ],
                }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}