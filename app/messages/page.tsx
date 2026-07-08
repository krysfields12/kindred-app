import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MessageCircle } from "lucide-react";

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

export default async function MessagesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const membership = await prisma.groupMember.findFirst({
    where: { userId },
  });

  if (!membership) {
    return (
      <main className="min-h-screen px-6 py-16">
        <section className="mx-auto max-w-3xl">
          <h1 className="mb-3 text-4xl font-bold">Messages</h1>

          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
            <h2 className="mb-2 text-2xl font-bold">Join a circle first</h2>
            <p className="mb-5 text-gray-300">
              Once you join a circle, you’ll be able to message members from
              your community.
            </p>

            <Link
              href="/groups"
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black"
            >
              Find Your Circle
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const circleMembers = await prisma.groupMember.findMany({
    where: {
      groupSlug: membership.groupSlug,
      userId: {
        not: userId,
      },
    },
  });

  const memberProfiles = await prisma.profile.findMany({
    where: {
      clerkUserId: {
        in: circleMembers.map((member) => member.userId),
      },
    },
  });

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300">
          <MessageCircle size={16} />
          Circle Messages
        </p>

        <h1 className="mb-3 text-4xl font-bold">Messages</h1>

        <p className="mb-8 text-lg text-gray-300">
          Continue conversations with members from your circle.
        </p>

        {memberProfiles.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
            <h2 className="mb-2 text-2xl font-bold">No circle members yet</h2>
            <p className="text-gray-300">
              When other people join your circle, you’ll be able to message them
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {memberProfiles.map((profile) => {
              const conversationMessages = messages.filter(
                (message) =>
                  (message.senderId === userId &&
                    message.receiverId === profile.clerkUserId) ||
                  (message.senderId === profile.clerkUserId &&
                    message.receiverId === userId)
              );

              const latestMessage = conversationMessages[0];

              const unreadCount = conversationMessages.filter(
                (message) =>
                  message.receiverId === userId && message.isRead === false
              ).length;

              return (
                <Link
                  key={profile.id}
                  href={`/messages/${profile.id}`}
                  className="block rounded-xl border border-gray-700 bg-neutral-900 p-6 transition hover:bg-neutral-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="mb-1 text-2xl font-bold">
                        {profile.name}
                      </h2>

                      <p className="mb-3 text-gray-400">
                        {profile.transition} • {profile.location}
                      </p>

                      <p className="text-gray-300">
                        {latestMessage
                          ? latestMessage.senderId === userId
                            ? `You: ${latestMessage.content}`
                            : latestMessage.content
                          : "No messages yet. Start the conversation."}
                      </p>

                      {latestMessage && (
                        <p className="mt-2 text-xs text-gray-500">
                          {formatTimeAgo(latestMessage.createdAt)}
                        </p>
                      )}
                    </div>

                    {unreadCount > 0 && (
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-black">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}