import MatchCard from "@/app/components/MatchCard";

const matches = [
  {
    slug: "jordan",
    name: "Jordan",
    transition: "Starting a Business",
    location: "Columbia, MD",
    goals: ["Launch a business", "Stay accountable"],
    interests: ["Entrepreneurship", "AI", "Personal Growth"],
    matchReasons: ["Starting a Business", "Entrepreneurship", "Accountability"],
  },
  {
    slug: "sarah",
    name: "Sarah",
    transition: "Career Change",
    location: "Baltimore, MD",
    goals: ["Build a network", "Find mentors"],
    interests: ["Technology", "Reading", "Career Growth"],
    matchReasons: ["Career Growth", "Technology", "Personal Growth"],
  },
  {
    slug: "mike",
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
            <MatchCard key={match.slug} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}