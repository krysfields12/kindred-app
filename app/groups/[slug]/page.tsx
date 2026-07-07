import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { joinGroup } from "@/app/actions/groups";
import {
  CheckCircle2,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

const circles = [
  {
    slug: "entrepreneurs",
    name: "Launch Circle",
    description:
      "A small circle for people building businesses, side projects, or startup ideas while balancing everyday life.",
    members: ["Meredith", "Jordan", "Alex", "Maya", "Chris", "Tia"],
    goal: "Build businesses with accountability and support",
    recommended: true,
    distance: "Most members are within 15 miles",
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
    members: ["Sarah", "David", "Nia", "Taylor", "Avery", "Morgan"],
    goal: "Navigate career change together",
    recommended: false,
    distance: "Average distance: 18 miles",
    reasons: ["Career Change", "Similar goals", "Encouragement and support"],
  },
  {
    slug: "new-to-city",
    name: "New-to-City Circle",
    description:
      "A small circle for people who recently moved and want to build community in a new place.",
    members: ["Mike", "Taylor", "Avery", "Sam", "Riley"],
    goal: "Build local friendships and belonging",
    recommended: false,
    distance: "Most members are nearby",
    reasons: ["New to a City", "Local connection", "Building community"],
  },
  {
    slug: "new-parents",
    name: "New Parents Circle",
    description:
      "A small circle for first-time parents looking for support, shared experiences, and community.",
    members: ["Emily", "Rachel", "Marcus", "Jasmine", "Leah", "Noah"],
    goal: "Find support in a new life stage",
    recommended: false,
    distance: "Local or virtual",
    reasons: ["New Parent", "Shared experiences", "Supportive community"],
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
          Based on your profile, we found these circles that best match your
          current journey. Choose one to begin building your community.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {circles.map((circle) => {
            const joined = joinedCircleSlugs.includes(circle.slug);

            return (
              <div
                key={circle.slug}
                className={`rounded-2xl border bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 ${
                  circle.recommended
                    ? "border-emerald-500 bg-gradient-to-b from-emerald-950/20 to-neutral-900"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                {circle.recommended && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-950/40 px-3 py-1 text-sm text-emerald-300">
                    <Sparkles size={14} />
                    Recommended based on your profile
                  </div>
                )}

                <h2 className="mb-3 text-2xl font-bold">{circle.name}</h2>

                <p className="mb-5 text-gray-300">{circle.description}</p>

                <div className="mb-5 space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users size={18} />
                    <span>{circle.members.length} members</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} />
                    <span>{circle.distance}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="mb-3 text-sm font-semibold text-gray-400">
                    Members
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {circle.members.slice(0, 3).map((member) => (
                      <span
                        key={member}
                        className="rounded-full border border-gray-700 bg-neutral-950 px-3 py-1 text-sm text-gray-300"
                      >
                        {member}
                      </span>
                    ))}

                    <span className="rounded-full border border-gray-700 bg-neutral-950 px-3 py-1 text-sm text-gray-400">
                      +{circle.members.length - 3} more
                    </span>
                  </div>
                </div>

                <div className="mb-6 rounded-xl border border-gray-700 bg-neutral-950 p-4">
                  <p className="mb-2 text-sm font-semibold text-gray-400">
                    Circle Focus
                  </p>

                  <p className="mb-4 text-gray-200">{circle.goal}</p>

                  <p className="mb-2 text-sm font-semibold text-gray-400">
                    Why this circle?
                  </p>

                  <div className="space-y-2">
                    {circle.reasons.map((reason) => (
                      <div
                        key={reason}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle2 size={16} className="text-emerald-400" />
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