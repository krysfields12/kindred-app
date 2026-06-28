import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendMessage } from "@/app/actions/messages";

function formatMessageTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

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

  await prisma.message.updateMany({
    where: {
      senderId: profile.clerkUserId,
      receiverId: userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
});

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
       <Link href="/messages" className="underline">
        ← Back to Messages
      </Link>

        <div className="mt-8 rounded-xl border border-gray-700 bg-neutral-900 p-6">
  <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>

  <p className="text-gray-400 mb-8">
    Conversation with your Kindred connection.
  </p>

  <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2">
    {messages.length === 0 ? (
      <div className="rounded-xl border border-gray-700 bg-gray-900 p-4 text-gray-300">
        No messages yet. Start the conversation.
      </div>
    ) : (
      messages.map((message) => {
        const isMine = message.senderId === userId;

        return (
            <div
              key={message.id}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    isMine
                      ? "bg-black text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-semibold text-sm">
                      {isMine ? "You" : profile.name}
                    </span>

                    <span className="text-xs text-gray-400">
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>

                  <p className="leading-relaxed break-words">
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

        <form
          action={sendMessage}
          className="flex gap-3 border-t border-gray-800 pt-5"
        >
          <input
            type="hidden"
            name="receiverId"
            value={profile.clerkUserId}
          />

          <input
            type="hidden"
            name="profileId"
            value={profile.id}
          />

          <input
            name="content"
            type="text"
            placeholder="Write a message..."
            className="flex-1 rounded-xl border border-gray-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
          >
            Send
          </button>
        </form>
      </div>
      </section>
    </main>
  );
}