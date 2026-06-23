import Link from "next/link";

const matches = [
  {
    name: "Jordan",
    transition: "Starting a Business",
    location: "Columbia, MD",
    goals: ["Launch a business", "Stay accountable"],
    interests: ["Entrepreneurship", "AI", "Personal Growth"],
    matchReasons: ["Starting a Business", "Entrepreneurship", "Accountability"],
  },
  {
    name: "Sarah",
    transition: "Career Change",
    location: "Baltimore, MD",
    goals: ["Build a network", "Find mentors"],
    interests: ["Technology", "Reading", "Career Growth"],
    matchReasons: ["Career Growth", "Technology", "Personal Growth"],
  },
  {
    name: "Mike",
    transition: "New to a City",
    location: "Ellicott City, MD",
    goals: ["Build friendships", "Explore the city"],
    interests: ["Hiking", "Coffee Shops", "Local Events"],
    matchReasons: ["Building Community", "Local Connection", "Shared Interests"],
  },
];

export default function MatchesPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Discover Your People</h1>

        <p className="text-lg mb-10">
          People navigating similar journeys, goals, and life transitions.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {matches.map((match) => (
            <div
              key={match.name}
              className="rounded-xl border border-gray-700 p-6 bg-neutral-900"
            >
              <h2 className="text-2xl font-bold mb-1">{match.name}</h2>
              <p className="mb-1">{match.transition}</p>
              <p className="text-gray-400 mb-5">{match.location}</p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Goals</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {match.goals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Interests</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {match.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Why You Match</h3>
                <div className="flex flex-wrap gap-2">
                  {match.matchReasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full border border-gray-600 px-3 py-1 text-sm text-gray-300"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                  href="/matches/jordan"
                  className="block w-full bg-black text-white px-4 py-3 rounded-lg text-center"
                  >
                  View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}