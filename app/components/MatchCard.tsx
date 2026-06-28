import Link from "next/link";
import {
  MapPin,
  Sprout,
  Target,
  Heart,
  CheckCircle2,
} from "lucide-react";

type Match = {
  slug: string;
  name: string;
  transition: string;
  location: string;
  goals: string[];
  interests: string[];
  matchReasons: string[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MatchCard({ match }: { match: Match }) {
  const topGoals = match.goals.slice(0, 2);
  const topInterests = match.interests.slice(0, 3);

  return (
    <div className="group rounded-2xl border border-gray-700 bg-neutral-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
          {getInitials(match.name)}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{match.name}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} />
            <span>{match.location}</span>
        </div>
        </div>
      </div>

      <div className="mb-5">
        <span className="inline-block rounded-full border border-gray-600 px-3 py-1 text-sm text-gray-200">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-600 px-3 py-1 text-sm text-gray-200">
            <Sprout size={16} />
            <span>{match.transition}</span>
        </div>
        </span>
      </div>

      <div className="mb-5">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Goals
        </h3>

        <div className="space-y-2">
        {topGoals.map((goal) => (
          <div key={goal} className="flex items-center gap-2 text-gray-200">
            <Target size={16} />
            <span>{goal}</span>
          </div>
        ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Interests
        </h3>

        <div className="flex flex-wrap gap-2">
          {topInterests.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-200"
            >
              <div
                key={interest}
                className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-200"
                >
                <Heart size={14} />
                <span>{interest}</span>
            </div>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-gray-700 bg-neutral-950 p-4">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Why you match
        </h3>

        <div className="space-y-2">
        {match.matchReasons.slice(0, 3).map((reason) => (
          <div
            key={reason}
            className="flex items-center gap-2 text-sm text-gray-300"
            >
            <CheckCircle2 size={16} className="text-green-400" />
            <span>{reason}</span>
          </div>
        ))}
        </div>
      </div>

      <Link
        href={`/matches/${match.slug}`}
        className="block w-full rounded-xl bg-white px-4 py-3 text-center font-semibold text-black transition hover:bg-gray-200"
      >
        View Profile →
      </Link>
    </div>
  );
}