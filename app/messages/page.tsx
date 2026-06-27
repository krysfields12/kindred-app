import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function MessagesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const connections = await prisma.connection.findMany({
    where: {
      status: "accepted",
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const otherUserIds = connections.map((connection) =>
    connection.senderId === userId ? connection.receiverId : connection.senderId
  );

  const profiles = await prisma.profile.findMany({
    where: {
      clerkUserId: {
        in: otherUserIds,
      },
    },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Messages</h1>

        <p className="text-lg mb-8">
          Continue conversations with your Kindred connections.
        </p>

        {profiles.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
            <h2 className="text-2xl font-bold mb-2">No messages yet</h2>
            <p className="text-gray-300">
              Once you connect with someone, your conversation will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/messages/${profile.id}`}
                className="block rounded-xl border border-gray-700 bg-neutral-900 p-6 hover:bg-neutral-800"
              >
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-gray-400 mb-2">
                  {profile.transition} • {profile.location}
                </p>
                <p className="text-gray-300">Open conversation</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}