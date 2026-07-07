import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createGroupPost,
  deleteGroupPost,
  joinGroup,
} from "@/app/actions/groups";
import {
  CalendarDays,
  Coffee,
  Lock,
  MessageCircle,
  MoreHorizontal,
  Sparkles,
  Target,
  Trash2,
  Users,
} from "lucide-react";

const groups = {
  entrepreneurs: {
    name: "Launch Circle",
    description:
      "A small circle for people building businesses, side projects, or startup ideas while balancing everyday life.",
    members: ["Jordan", "Maya", "Chris", "Alicia"],
    prompt:
      "What is one small step you can take this week toward your business idea?",
    meetup: {
      title: "Coffee + Accountability Check-In",
      time: "Saturday at 10:00 AM",
      location: "Roggenart • Columbia, MD",
    },
  },
  "career-changers": {
    name: "Career Pivot Circle",
    description:
      "A small circle for people transitioning into new careers and looking for encouragement, resources, and connection.",
    members: ["Sarah", "David", "Nia"],
    prompt: "What is one skill you're focusing on this month?",
    meetup: {
      title: "Career Goals Coffee Chat",
      time: "Thursday at 6:00 PM",
      location: "Baltimore County Library • Towson, MD",
    },
  },
  "new-to-city": {
    name: "New-to-City Circle",
    description:
      "A small circle for people who recently moved and want to build community in a new place.",
    members: ["Mike", "Taylor", "Avery", "Sam"],
    prompt:
      "What is one place in your new city you'd like to explore this week?",
    meetup: {
      title: "Saturday Coffee Walk",
      time: "Saturday at 11:00 AM",
      location: "Patterson Park • Baltimore, MD",
    },
  },
  "new-parents": {
    name: "New Parents Circle",
    description:
      "A small circle for first-time parents looking for support, shared experiences, and community.",
    members: ["Emily", "Rachel", "Marcus"],
    prompt:
      "What is one thing that would help you feel more supported this week?",
    meetup: {
      title: "Parent Support Meetup",
      time: "Sunday at 2:00 PM",
      location: "Lake Kittamaqundi • Columbia, MD",
    },
  },
};

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString();
}

type GroupSlug = keyof typeof groups;

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const { slug } = await params;
  const group = groups[slug as GroupSlug];

  if (!group) {
    notFound();
  }

  const membership = await prisma.groupMember.findUnique({
    where: {
      groupSlug_userId: {
        groupSlug: slug,
        userId,
      },
    },
  });

  const groupMembers = await prisma.groupMember.findMany({
    where: {
      groupSlug: slug,
    },
  });

  const memberProfiles = await prisma.profile.findMany({
    where: {
      clerkUserId: {
        in: groupMembers.map((member) => member.userId),
      },
    },
  });

  const groupPosts = await prisma.groupPost.findMany({
    where: {
      groupSlug: slug,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const postAuthors = await prisma.profile.findMany({
    where: {
      clerkUserId: {
        in: groupPosts.map((post) => post.userId),
      },
    },
  });

  const allMembers = [
    ...group.members,
    ...memberProfiles.map((profile) => profile.name),
  ];

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <Link href="/groups" className="text-gray-300 underline">
          ← Back to Circles
        </Link>

        <div className="mt-8 rounded-2xl border border-gray-700 bg-neutral-900 p-8">
          <div className="mb-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-950/40 px-3 py-1 text-sm text-emerald-300">
              <Sparkles size={14} />
              {membership ? "Your Circle" : "Circle Preview"}
            </p>

            <h1 className="mb-3 text-4xl font-bold">{group.name}</h1>

            <p className="max-w-2xl text-gray-300">{group.description}</p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-700 bg-neutral-950 p-4">
              <Users className="mb-3 h-6 w-6 text-gray-300" />
              <p className="text-2xl font-bold">{allMembers.length}</p>
              <p className="text-sm text-gray-400">active members</p>
            </div>

            <div className="rounded-xl border border-gray-700 bg-neutral-950 p-4">
              <Target className="mb-3 h-6 w-6 text-gray-300" />
              <p className="text-2xl font-bold">Weekly</p>
              <p className="text-sm text-gray-400">accountability prompt</p>
            </div>

            <div className="rounded-xl border border-gray-700 bg-neutral-950 p-4">
              <Coffee className="mb-3 h-6 w-6 text-gray-300" />
              <p className="text-2xl font-bold">Local</p>
              <p className="text-sm text-gray-400">meetup opportunity</p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <Target size={22} />
              Weekly Prompt
            </h2>

            <p className="rounded-xl border border-gray-700 bg-gray-800 p-4 text-gray-100">
              {group.prompt}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <CalendarDays size={22} />
              Upcoming Meetup
            </h2>

            <div className="rounded-xl border border-gray-700 bg-neutral-950 p-5">
              <p className="mb-1 font-semibold">{group.meetup.title}</p>
              <p className="text-gray-300">{group.meetup.time}</p>
              <p className="text-gray-400">{group.meetup.location}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <Users size={22} />
              Members
            </h2>

            <div className="space-y-3">
              {memberProfiles.length === 0 ? (
                <div className="flex flex-wrap gap-2">
                  {group.members.map((member) => (
                    <span
                      key={member}
                      className="rounded-full border border-gray-600 px-3 py-1 text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              ) : (
                memberProfiles.map((profile) => {
                  const isMe = profile.clerkUserId === userId;

                  return (
                    <div
                      key={profile.id}
                      className="flex items-center justify-between rounded-xl border border-gray-700 bg-neutral-950 p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          {profile.name}
                          {isMe ? " (You)" : ""}
                        </p>
                        <p className="text-sm text-gray-400">
                          {profile.transition ?? "Circle member"}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {!isMe && (
                          <Link
                            href={`/matches/${profile.id}`}
                            className="rounded-lg border border-gray-600 px-4 py-2 text-sm transition hover:border-gray-400"
                          >
                            View Profile
                          </Link>
                        )}

                        {membership && !isMe && (
                          <Link
                            href={`/messages/${profile.id}`}
                            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
                          >
                            Message
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <MessageCircle size={22} />
              Discussion
            </h2>

            {membership ? (
              <>
                <form action={createGroupPost} className="mb-6 space-y-3">
                  <input type="hidden" name="groupSlug" value={slug} />

                  <textarea
                    name="content"
                    placeholder="Share a win, goal, or update with your circle..."
                    className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 text-white"
                    required
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
                  >
                    Post Update
                  </button>
                </form>

                <div className="space-y-4">
                  {groupPosts.map((post) => {
                    const author = postAuthors.find(
                      (profile) => profile.clerkUserId === post.userId
                    );

                    const isMyPost = post.userId === userId;

                    return (
                      <div
                        key={post.id}
                        className="rounded-xl bg-gray-800 p-4"
                      >
                        <div className="mb-1 flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold">
                              {author?.name ?? "Circle Member"}
                            </p>

                            <p className="text-xs text-gray-400">
                              {formatTimeAgo(post.createdAt)}
                            </p>
                          </div>

                          {isMyPost && (
                            <details className="relative">
                              <summary className="list-none cursor-pointer rounded-full p-1 hover:bg-gray-700">
                                <MoreHorizontal size={18} />
                              </summary>

                              <div className="absolute right-0 z-10 mt-2 w-32 rounded-lg border border-gray-700 bg-neutral-950 p-2 shadow-lg">
                                <form action={deleteGroupPost}>
                                  <input
                                    type="hidden"
                                    name="postId"
                                    value={post.id}
                                  />

                                  <input
                                    type="hidden"
                                    name="groupSlug"
                                    value={slug}
                                  />

                                  <button
                                    type="submit"
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-800"
                                  >
                                    <Trash2 size={14} />
                                    Delete
                                  </button>
                                </form>
                              </div>
                            </details>
                          )}
                        </div>

                        <p className="text-gray-300">{post.content}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-gray-700 bg-neutral-950 p-6">
                <div className="mb-3 flex items-center gap-2 text-gray-200">
                  <Lock size={18} />
                  <h3 className="text-xl font-bold">
                    Join this circle to participate
                  </h3>
                </div>

                <p className="text-gray-300">
                  Members share weekly goals, wins, updates, and accountability
                  check-ins here.
                </p>

                <form
                  action={async () => {
                    "use server";
                    await joinGroup(slug);
                  }}
                >
                  <button
                    type="submit"
                    className="mt-5 rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
                  >
                    Join Circle
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}