import Link from "next/link";
import { notFound } from "next/navigation";

const groups = {
  entrepreneurs: {
    name: "Aspiring Entrepreneurs Circle",
    description:
      "For people building businesses, side projects, or startup ideas while balancing everyday life.",
    members: ["Jordan", "Maya", "Chris", "Alicia"],
    prompt: "What is one small step you can take this week toward your business idea?",
    posts: [
      {
        author: "Jordan",
        text: "I'm trying to stay consistent with building after work. Would love accountability.",
      },
      {
        author: "Maya",
        text: "I'm working on validating my idea before I build too much.",
      },
    ],
  },

  "career-changers": {
    name: "Career Changers Circle",
    description:
      "For people transitioning into new careers and looking for encouragement, resources, and connection.",
    members: ["Sarah", "David", "Nia"],
    prompt: "What is one skill you're focusing on this month?",
    posts: [
      {
        author: "Sarah",
        text: "I'm practicing technical interviews and trying to stay motivated.",
      },
      {
        author: "David",
        text: "I'm rebuilding my resume and trying to figure out how to tell my career story.",
      },
    ],
  },

  "new-to-city": {
    name: "New-to-City Circle",
    description:
      "For people who recently moved and want to build community in a new place.",
    members: ["Mike", "Taylor", "Avery", "Sam"],
    prompt: "What is one place in your new city you'd like to explore this week?",
    posts: [
      {
        author: "Mike",
        text: "I moved recently and want to find more low-pressure ways to meet people locally.",
      },
      {
        author: "Taylor",
        text: "I'm looking for coffee shops, walking groups, and weekend activities.",
      },
    ],
  },

  "new-parents": {
    name: "New Parents Circle",
    description:
      "For first-time parents looking for support, shared experiences, and community.",
    members: ["Emily", "Rachel", "Marcus"],
    prompt: "What is one thing that would help you feel more supported this week?",
    posts: [
      {
        author: "Emily",
        text: "I'm trying to balance parenthood with still feeling like myself.",
      },
      {
        author: "Marcus",
        text: "I'd love to hear how others are managing sleep, routines, and social life.",
      },
    ],
  },
};

type GroupSlug = keyof typeof groups;

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = groups[slug as GroupSlug];

  if (!group) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-4xl mx-auto">
        <Link href="/groups" className="underline">
          ← Back to Groups
        </Link>

        <div className="mt-8 rounded-xl border border-gray-700 bg-neutral-900 p-8">
          <h1 className="text-4xl font-bold mb-3">{group.name}</h1>
          <p className="text-gray-300 mb-8">{group.description}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Weekly Prompt</h2>
            <p className="rounded-lg bg-gray-800 p-4">{group.prompt}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Members</h2>
            <div className="flex flex-wrap gap-2">
              {group.members.map((member) => (
                <span
                  key={member}
                  className="rounded-full border border-gray-600 px-3 py-1 text-sm"
                >
                  {member}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Discussion</h2>
            <div className="space-y-4">
              {group.posts.map((post, index) => (
                <div key={index} className="rounded-lg bg-gray-800 p-4">
                  <p className="font-semibold mb-1">{post.author}</p>
                  <p className="text-gray-300">{post.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}