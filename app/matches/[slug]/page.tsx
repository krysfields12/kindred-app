"use client";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

const profiles = {
  jordan: {
    name: "Jordan",
    transition: "Starting a Business",
    location: "Columbia, MD",
    bio: "Jordan is building a side business while working full-time and wants to connect with other aspiring entrepreneurs.",
    goals: ["Launch a business", "Stay accountable", "Build a founder network"],
    interests: ["Entrepreneurship", "AI", "Personal Growth"],
    matchReasons: ["Starting a Business", "Entrepreneurship", "Accountability"],
  },
  sarah: {
    name: "Sarah",
    transition: "Career Change",
    location: "Baltimore, MD",
    bio: "Sarah recently changed careers and is looking for people who understand the transition into a new professional path.",
    goals: ["Build a network", "Find mentors", "Stay motivated"],
    interests: ["Technology", "Reading", "Career Growth"],
    matchReasons: ["Career Growth", "Technology", "Personal Growth"],
  },
  mike: {
    name: "Mike",
    transition: "New to a City",
    location: "Ellicott City, MD",
    bio: "Mike recently relocated and wants to build meaningful local friendships and discover community in his new area.",
    goals: ["Build friendships", "Explore the city", "Find community"],
    interests: ["Hiking", "Coffee Shops", "Local Events"],
    matchReasons: ["Building Community", "Local Connection", "Shared Interests"],
  },
};

type ProfileSlug = keyof typeof profiles;


export default function MatchProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const profile = profiles[slug as ProfileSlug];
  const [connected, setConnected] = useState(false);

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
            <h2 className="text-2xl font-bold mb-3">Why You Match</h2>
            <div className="flex flex-wrap gap-2">
              {profile.matchReasons.map((reason) => (
                <span
                  key={reason}
                  className="rounded-full border border-gray-600 px-3 py-1 text-sm text-gray-300"
                >
                  {reason}
                </span>
              ))}
            </div>
          </section>

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

          <button
            onClick={() => setConnected(true)}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {connected ? "Connection Sent" : "Connect"}
        </button>
        </div>
      </section>
    </main>
  );
}