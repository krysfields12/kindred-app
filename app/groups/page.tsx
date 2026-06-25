"use client";

import { useState } from "react";

const groups = [
  {
    name: "Aspiring Entrepreneurs Circle",
    description:
      "For people building businesses, side projects, or startup ideas while balancing everyday life.",
    members: 18,
    goal: "Build businesses with accountability and support",
  },
  {
    name: "Career Changers Circle",
    description:
      "For people transitioning into new careers and looking for encouragement, resources, and connection.",
    members: 24,
    goal: "Navigate career change together",
  },
  {
    name: "New-to-City Circle",
    description:
      "For people who recently moved and want to build community in a new place.",
    members: 31,
    goal: "Build local friendships and belonging",
  },
  {
    name: "New Parents Circle",
    description:
      "For first-time parents looking for support, shared experiences, and community.",
    members: 15,
    goal: "Find support in a new life stage",
  },
];

export default function GroupsPage() {
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  function handleJoin(groupName: string) {
    if (joinedGroups.includes(groupName)) return;

    setJoinedGroups([...joinedGroups, groupName]);
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Small Groups</h1>

        <p className="text-lg mb-10">
          Join circles of people navigating similar life transitions and goals.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((group) => {
            const joined = joinedGroups.includes(group.name);

            return (
              <div
                key={group.name}
                className="rounded-xl border border-gray-700 bg-neutral-900 p-6"
              >
                <h2 className="text-2xl font-bold mb-3">{group.name}</h2>

                <p className="text-gray-300 mb-5">{group.description}</p>

                <p className="mb-2">
                  <span className="font-semibold">Shared Goal:</span>{" "}
                  {group.goal}
                </p>

                <p className="text-gray-400 mb-6">
                  {joined ? group.members + 1 : group.members} members
                </p>

                <button
                  type="button"
                  onClick={() => handleJoin(group.name)}
                  className="bg-black text-white px-6 py-3 rounded-lg"
                >
                  {joined ? "Joined" : "Join Group"}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}