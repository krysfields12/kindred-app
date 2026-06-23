import Link from "next/link";

type Match = {
  slug: string;
  name: string;
  transition: string;
  location: string;
  goals: string[];
  interests: string[];
  matchReasons: string[];
};

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="rounded-xl border border-gray-700 p-6 bg-neutral-900">
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
        href={`/matches/${match.slug}`}
        className="block w-full bg-black text-white px-4 py-3 rounded-lg text-center"
      >
        View Profile
      </Link>
    </div>
  );
}