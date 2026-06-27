import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ConnectButton from "@/app/components/ConnectButton";

export default async function MatchProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const { slug } = await params;

  const profile = await prisma.profile.findUnique({
    where: {
      id: slug,
    },
  });

  if (!profile) {
    notFound();
  }

  const existingConnection = await prisma.connection.findFirst({
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
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <Link href="/matches" className="underline">
          ← Back to Matches
        </Link>

        <div className="mt-8 rounded-xl border border-gray-700 bg-neutral-900 p-8">
          <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>

          <p className="text-xl mb-1">{profile.transition}</p>

          <p className="text-gray-400 mb-6">{profile.location}</p>

          <p className="text-lg mb-8">{profile.bio}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Goals</h2>

            <ul className="list-disc list-inside text-gray-300">
              {profile.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Interests</h2>

            <ul className="list-disc list-inside text-gray-300">
              {profile.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </section>

        {existingConnection?.status === "accepted" ? (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-950/40 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-emerald-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>

          <span className="font-medium text-emerald-300">
            Connected
          </span>
        </div>

        <Link
          href={`/messages/${profile.id}`}
          className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Message
        </Link>
      </div>
    ) : existingConnection?.status === "pending" ? (
            <div className="rounded-lg border border-gray-700 bg-gray-900 px-5 py-3 inline-block">
              Request Pending
            </div>
          ) : (
            <ConnectButton
              receiverId={profile.clerkUserId}
              receiverName={profile.name}
            />
          )}
        </div>
      </section>
    </main>
  );
}