import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { joinGroup } from "@/app/actions/groups";

const groups = [
  {
    slug: "entrepreneurs",
    name: "Aspiring Entrepreneurs Circle",
    description:
      "For people building businesses, side projects, or startup ideas while balancing everyday life.",
    members: 18,
    goal: "Build businesses with accountability and support",
  },
  {
    slug: "career-changers",
    name: "Career Changers Circle",
    description:
      "For people transitioning into new careers and looking for encouragement, resources, and connection.",
    members: 24,
    goal: "Navigate career change together",
  },
  {
    slug: "new-to-city",
    name: "New-to-City Circle",
    description:
      "For people who recently moved and want to build community in a new place.",
    members: 31,
    goal: "Build local friendships and belonging",
  },
  {
    slug: "new-parents",
    name: "New Parents Circle",
    description:
      "For first-time parents looking for support, shared experiences, and community.",
    members: 15,
    goal: "Find support in a new life stage",
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

  const joinedGroupSlugs = memberships.map((membership) => membership.groupSlug);

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Small Groups</h1>

        <p className="text-lg mb-10">
          Join circles of people navigating similar life transitions and goals.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((group) => {
            const joined = joinedGroupSlugs.includes(group.slug);

            return (
              <div
                key={group.slug}
                className="rounded-xl border border-gray-700 bg-neutral-900 p-6"
              >
                <h2 className="text-2xl font-bold mb-3">{group.name}</h2>

                <p className="text-gray-300 mb-5">{group.description}</p>

                <p className="mb-2">
                  <span className="font-semibold">Shared Goal:</span>{" "}
                  {group.goal}
                </p>

                <p className="text-gray-400 mb-6">
                  {joined ? group.members + 1 : group.members} members
                </p>

                <div className="flex gap-3">
                  {joined ? (
                    <span className="rounded-lg border border-gray-700 bg-gray-900 px-6 py-3">
                      Joined
                    </span>
                  ) : (
                    <form
                      action={async () => {
                        "use server";
                        await joinGroup(group.slug);
                      }}
                    >
                      <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-lg"
                      >
                        Join Group
                      </button>
                    </form>
                  )}

                  <Link
                    href={`/groups/${group.slug}`}
                    className="border border-gray-600 px-6 py-3 rounded-lg text-center"
                  >
                    View Group
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