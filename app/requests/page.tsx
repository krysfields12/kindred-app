import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  acceptConnectionRequest,
  declineConnectionRequest,
} from "@/app/actions/connections";

export default async function RequestsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const requests = await prisma.connection.findMany({
    where: {
      receiverId: userId,
      status: "pending",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const senderIds = requests.map((request) => request.senderId);

  const senders = await prisma.profile.findMany({
    where: {
      clerkUserId: {
        in: senderIds,
      },
    },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Connection Requests</h1>

        <p className="text-lg mb-8">
          People who would like to connect with you.
        </p>

        {requests.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
            <h2 className="text-2xl font-bold mb-2">No requests yet</h2>
            <p className="text-gray-300">
              When someone sends you a connection request, it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => {
              const sender = senders.find(
                (profile) => profile.clerkUserId === request.senderId
              );

              return (
                <div
                  key={request.id}
                  className="rounded-xl border border-gray-700 bg-neutral-900 p-6"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {sender?.name ?? "Someone"} wants to connect
                  </h2>

                  {sender && (
                    <p className="text-gray-400 mb-4">
                      {sender.transition} • {sender.location}
                    </p>
                  )}

                  {request.message && (
                    <p className="text-gray-300 mb-6">"{request.message}"</p>
                  )}

                  <div className="flex gap-3">
                    <form
                      action={async () => {
                        "use server";
                        await acceptConnectionRequest(request.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="bg-black text-white px-5 py-2 rounded-lg"
                      >
                        Accept
                      </button>
                    </form>

                    <form
                      action={async () => {
                        "use server";
                        await declineConnectionRequest(request.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="border border-gray-600 px-5 py-2 rounded-lg"
                      >
                        Decline
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}