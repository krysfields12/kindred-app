import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { joinGroup } from "@/app/actions/groups";
import { CheckCircle2, MapPin, Sparkles, Users } from "lucide-react";

const circles = [
  {
    slug: "entrepreneurs",
    name: "Launch Circle",
    description:
      "A small circle for people building businesses, side projects, or startup ideas while balancing everyday life.",
    members: 6,
    goal: "Build businesses with accountability and support",
    recommended: true,
    location: "Local or virtual",
     reasons: [
    "Starting a Business",
    "Similar goals",
    "Interested in entrepreneurship",
    "Members are nearby",
  ],
  },
  {
    slug: "career-changers",
    name: "Career Pivot Circle",
    description:
      "A small circle for people transitioning into new careers and looking for encouragement, resources, and connection.",
    members: 7,
    goal: "Navigate career change together",
    recommended: false,
    location: "Local or virtual",
    reasons: [
      "Changing careers",
      "Looking for support",
      "Interested in career development",
      "Members are nearby",
    ],
  },
  {
    slug: "new-to-city",
    name: "New-to-City Circle",
    description:
      "A small circle for people who recently moved and want to build community in a new place.",
    members: 5,
    goal: "Build local friendships and belonging",
    recommended: false,
    location: "Local preferred",
    reasons: [
      "New to the area",
      "Building local friendships",
      "Nearby members",
    ],
  },
  {
    slug: "new-parents",
    name: "New Parents Circle",
    description:
      "A small circle for first-time parents looking for support, shared experiences, and community.",
    members: 6,
    goal: "Find support in a new life stage",
    recommended: false,
    location: "Local or virtual",
    reasons: [
      "New parent",
      "Looking for support",
      "Interested in parent community",
      "Members are nearby",
    ],
  },
];

export default async function GroupsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const memberships = await prisma.groupMember.findMany({
    where: {
      userId,
    },
  });

  const joinedCircleSlugs = memberships.map(
    (membership) => membership.groupSlug
  );

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300">
          <Sparkles size={16} />
          Circle MVP
        </p>

        <h1 className="mb-3 text-4xl font-bold">Recommended Circles</h1>

        <p className="mb-10 max-w-2xl text-lg text-gray-300">
          Based on your journey, Kindred recommends small circles of people
          navigating similar life transitions, goals, and next steps.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {circles.map((circle) => {
            const joined = joinedCircleSlugs.includes(circle.slug);

            return (
              <div
                key={circle.slug}
                className={`rounded-2xl border bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 ${
                  circle.recommended
                    ? "border-emerald-500/70"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                {circle.recommended && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-950/40 px-3 py-1 text-sm text-emerald-300">
                    <Sparkles size={14} />
                    Recommended for you
                  </div>
                )}

                <h2 className="mb-3 text-2xl font-bold">{circle.name}</h2>

                <p className="mb-5 text-gray-300">{circle.description}</p>

                <div className="mb-5 space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users size={18} />
                    <span>{joined ? circle.members + 1 : circle.members} members</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} />
                    <span>{circle.location}</span>
                  </div>
                </div>

                <div className="mb-6 rounded-xl border border-gray-700 bg-neutral-950 p-4">
                  <p className="mb-2 text-sm font-semibold text-gray-400">
                    Circle Focus
                  </p>

                  <p className="mb-5 text-gray-200">{circle.goal}</p>

                  <p className="mb-2 text-sm font-semibold text-gray-400">
                    Why this circle?
                  </p>

                  <div className="space-y-2">
                    {circle.reasons.map((reason) => (
                      <div
                        key={reason}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-400"
                        />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {joined ? (
                    <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 bg-emerald-950/40 px-6 py-3 text-emerald-300">
                      <CheckCircle2 size={18} />
                      Your Circle
                    </span>
                  ) : (
                    <form
                      action={async () => {
                        "use server";
                        await joinGroup(circle.slug);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
                      >
                        Join Circle
                      </button>
                    </form>
                  )}

                  <Link
                    href={`/groups/${circle.slug}`}
                    className="rounded-lg border border-gray-600 px-6 py-3 text-center transition hover:border-gray-400"
                  >
                    View Circle
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}