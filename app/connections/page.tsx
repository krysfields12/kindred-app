import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ConnectionsPage() {
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
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Your Connections</h1>

        <p className="text-lg mb-8">
          People you’ve connected with through Kindred.
        </p>

        {profiles.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
            <h2 className="text-2xl font-bold mb-2">No connections yet</h2>
            <p className="text-gray-300">
              Accepted connection requests will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="rounded-xl border border-gray-700 bg-neutral-900 p-6"
              >
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="mb-1">{profile.transition}</p>
                <p className="text-gray-400 mb-4">{profile.location}</p>

                <p className="text-gray-300 mb-5">{profile.bio}</p>

                <div className="flex gap-3">
                  <Link
                    href={`/matches/${profile.id}`}
                    className="inline-block bg-black text-white px-5 py-2 rounded-lg"
                  >
                    View Profile
                  </Link>

                  <Link
                    href={`/messages/${profile.id}`}
                    className="inline-block border border-gray-600 px-5 py-2 rounded-lg"
                  >
                    Message
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}