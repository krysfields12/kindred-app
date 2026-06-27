import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendMessage } from "@/app/actions/messages";

export default async function MessageThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const { id } = await params;

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });

  if (!profile) {
    notFound();
  }

  const connection = await prisma.connection.findFirst({
    where: {
      status: "accepted",
      OR: [
        {
          senderId: userId,
          receiverId: profile.clerkUserId,
        },
        {
          senderId: profile.clerkUserId,
          receiverId: userId,
        },
      ],
    },
  });

  if (!connection) {
    redirect("/connections");
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          senderId: userId,
          receiverId: profile.clerkUserId,
        },
        {
          senderId: profile.clerkUserId,
          receiverId: userId,
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <Link href="/connections" className="underline">
          ← Back to Connections
        </Link>

        <div className="mt-8 rounded-xl border border-gray-700 bg-neutral-900 p-6">
          <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>

          <p className="text-gray-400 mb-8">
            Conversation with your Kindred connection.
          </p>

          <div className="space-y-4 mb-6">
            {messages.length === 0 ? (
              <div className="rounded-lg bg-gray-800 p-4 max-w-md">
                <p className="text-sm font-semibold mb-1">{profile.name}</p>
                <p className="text-gray-300">
                  Start the conversation with your Kindred connection.
                </p>
              </div>
            ) : (
              messages.map((message) => {
                const isMine = message.senderId === userId;

                return (
                  <div
                    key={message.id}
                    className={`rounded-lg p-4 max-w-md ${
                      isMine
                        ? "ml-auto bg-black text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {isMine ? "You" : profile.name}
                    </p>
                    <p>{message.content}</p>
                  </div>
                );
              })
            )}
          </div>

          <form action={sendMessage} className="flex gap-3">
            <input type="hidden" name="receiverId" value={profile.clerkUserId} />
            <input type="hidden" name="profileId" value={profile.id} />

            <input
              name="content"
              type="text"
              placeholder="Write a message..."
              className="flex-1 rounded-lg border border-gray-700 bg-transparent px-4 py-3 text-white"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}