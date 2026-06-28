import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import {
  CheckCircle2,
  Heart,
  MapPin,
  Sprout,
  Target,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import ConnectButton from "@/app/components/ConnectButton";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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

  const matchReasons = [
    profile.transition ?? "Similar life stage",
    ...profile.interests.slice(0, 2),
  ];

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <Link href="/matches" className="text-gray-300 underline">
          ← Back to Matches
        </Link>

        <div className="mt-8 rounded-2xl border border-gray-700 bg-neutral-900 p-8">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-bold text-black">
              {getInitials(profile.name)}
            </div>

            <div className="flex-1">
              <h1 className="mb-3 text-5xl font-bold">{profile.name}</h1>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-600 px-4 py-2 text-gray-200">
                  <Sprout size={18} />
                  {profile.transition ?? "Life Transition"}
                </span>

                <span className="inline-flex items-center gap-2 text-gray-400">
                  <MapPin size={18} />
                  {profile.location ?? "Location not provided"}
                </span>
              </div>

              {existingConnection?.status === "accepted" ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-950/40 px-4 py-2">
                    <CheckCircle2 className="text-emerald-400" size={18} />
                    <span className="font-medium text-emerald-300">
                      Connected
                    </span>
                  </div>

                  <Link
                    href={`/messages/${profile.id}`}
                    className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-gray-200"
                  >
                    Message
                  </Link>
                </div>
              ) : existingConnection?.status === "pending" ? (
                <div className="inline-flex rounded-lg border border-gray-700 bg-gray-900 px-5 py-3">
                  Request Pending
                </div>
              ) : (
                <ConnectButton
                  receiverId={profile.clerkUserId}
                  receiverName={profile.name}
                />
              )}
            </div>
          </div>

          <section className="mb-10 border-t border-gray-800 pt-8">
            <h2 className="mb-3 text-2xl font-bold">About</h2>
            <p className="text-lg leading-8 text-gray-300">{profile.bio}</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Goals</h2>

            <div className="space-y-3">
              {profile.goals.map((goal) => (
                <div key={goal} className="flex items-center gap-3 text-gray-200">
                  <Target size={18} />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Interests</h2>

            <div className="flex flex-wrap gap-3">
              {profile.interests.map((interest) => (
                <div
                  key={interest}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-gray-200"
                >
                  <Heart size={16} />
                  {interest}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-700 bg-neutral-950 p-6">
            <h2 className="mb-4 text-2xl font-bold">Why You Might Connect</h2>

            <div className="space-y-3">
              {matchReasons.map((reason) => (
                <div key={reason} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="text-emerald-400" size={18} />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}