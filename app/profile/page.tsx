import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MapPin, Target, Heart, Users } from "lucide-react";

const circles = {
  entrepreneurs: "Launch Circle",
  "career-changers": "Career Pivot Circle",
  "new-to-city": "New-to-City Circle",
  "new-parents": "New Parents Circle",
};

type CircleSlug = keyof typeof circles;

export default async function MyProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  const membership = await prisma.groupMember.findFirst({
    where: {
      userId,
    },
  });

  const currentCircleName = membership
    ? circles[membership.groupSlug as CircleSlug]
    : null;

  if (!profile) {
    return (
      <main className="min-h-screen px-6 py-16">
        <section className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-gray-700 bg-neutral-900 p-8">
            <h1 className="mb-3 text-4xl font-bold">Create Your Profile</h1>

            <p className="mb-6 text-gray-300">
              Tell Kindred about your journey so we can recommend the right
              circle for you.
            </p>

            <Link
              href="/profile"
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Create Profile
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-700 bg-neutral-900 p-8">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-emerald-600 bg-emerald-950/40 px-3 py-1 text-sm text-emerald-300">
                My Profile
              </p>

              <h1 className="mb-2 text-4xl font-bold">{profile.name}</h1>

              <p className="mb-2 text-xl">{profile.transition}</p>

              <p className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                {profile.location}
              </p>
            </div>

            <Link
              href="/profile/edit"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Edit Profile
            </Link>
          </div>

          {profile.bio && (
            <section className="mb-8 border-t border-gray-800 pt-8">
              <h2 className="mb-3 text-2xl font-bold">About</h2>
              <p className="leading-8 text-gray-300">{profile.bio}</p>
            </section>
          )}

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-700 bg-neutral-950 p-5">
              <Users className="mb-3 h-6 w-6 text-gray-300" />
              <p className="text-sm text-gray-400">Current Circle</p>
              <p className="mt-1 font-semibold">
                {currentCircleName ?? "No circle yet"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-700 bg-neutral-950 p-5">
              <Target className="mb-3 h-6 w-6 text-gray-300" />
              <p className="text-sm text-gray-400">Goals</p>
              <p className="mt-1 font-semibold">
                {profile.goals.length} added
              </p>
            </div>

            <div className="rounded-xl border border-gray-700 bg-neutral-950 p-5">
              <Heart className="mb-3 h-6 w-6 text-gray-300" />
              <p className="text-sm text-gray-400">Interests</p>
              <p className="mt-1 font-semibold">
                {profile.interests.length} added
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-bold">Goals</h2>

            <div className="flex flex-wrap gap-2">
              {profile.goals.map((goal) => (
                <span
                  key={goal}
                  className="rounded-full border border-gray-700 bg-neutral-950 px-4 py-2 text-sm text-gray-300"
                >
                  {goal}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-bold">Interests</h2>

            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-gray-700 bg-neutral-950 px-4 py-2 text-sm text-gray-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          <div className="flex gap-3 border-t border-gray-800 pt-8">
            <Link
              href="/groups"
              className="rounded-lg border border-gray-600 px-6 py-3 transition hover:border-gray-400"
            >
              View My Circle
            </Link>

            <Link
              href="/messages"
              className="rounded-lg border border-gray-600 px-6 py-3 transition hover:border-gray-400"
            >
              Messages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}