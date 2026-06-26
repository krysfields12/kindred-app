import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ConnectButton from "@/app/components/ConnectButton";

export default async function MatchProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const profile = await prisma.profile.findUnique({
    where: {
      id: slug,
    },
  });

  if (!profile) {
    notFound();
  }

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

         <ConnectButton receiverId={profile.clerkUserId} receiverName={profile.name} />
        </div>
      </section>
    </main>
  );
}