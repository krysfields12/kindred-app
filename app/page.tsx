import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import {
  Baby,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Laptop,
  MapPinned,
  MessageCircle,
  Rocket,
  Sprout,
  Target,
  Users,
} from "lucide-react";

const audiences = [
  { label: "New to a City", icon: MapPinned },
  { label: "Career Change", icon: Briefcase },
  { label: "Starting a Business", icon: Rocket },
  { label: "New Parent", icon: Baby },
  { label: "Recent Graduate", icon: GraduationCap },
  { label: "Remote Worker", icon: Laptop },
  { label: "Starting a New Job", icon: Briefcase },
  { label: "Personal Growth", icon: Sprout },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto mb-32 flex max-w-4xl flex-col items-center text-center">
        <p className="mb-4 rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300">
          For adults navigating life transitions
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
          Find your people at every stage of life.
        </h1>

        <p className="mb-8 max-w-2xl text-xl text-gray-300">
          Moving, changing careers, starting a business, becoming a parent, or
          simply trying to build meaningful friendships again.
        </p>

        <div className="flex gap-4">
          <SignUpButton forceRedirectUrl="/onboarding">
            <button className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200">
              Find Your People
            </button>
          </SignUpButton>

          <Link
            href="#how-it-works"
            className="rounded-lg border border-gray-600 px-6 py-3 font-semibold"
          >
            How It Works
          </Link>
        </div>
      </section>

      <section className="mx-auto mb-32 max-w-4xl rounded-2xl border border-gray-700 bg-neutral-900 p-8 text-center">
        <HeartHandshake className="mx-auto mb-5 h-10 w-10 text-gray-300" />

        <h2 className="mb-4 text-4xl font-bold">Why Kindred Exists</h2>

        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300">
          Making friends as an adult is hard. Most friendships happen because
          life puts people together — school, college, work. After that,
          finding genuine connection becomes much harder.
        </p>
      </section>

      <section className="mx-auto mb-32 max-w-5xl">
        <h2 className="mb-8 text-center text-4xl font-bold">
          Who is Kindred for?
        </h2>

        <div className="grid gap-4 md:grid-cols-4">
          {audiences.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-700 bg-neutral-900 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800"
            >
              <Icon className="mx-auto mb-4 h-8 w-8 text-gray-300" />
              <p className="font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto mb-32 max-w-5xl">
        <h2 className="mb-8 text-center text-4xl font-bold">How It Works</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800">
            <Target className="mb-4 h-8 w-8 text-gray-300" />
            <h3 className="mb-3 text-2xl font-bold">1. Share Your Journey</h3>
            <p className="text-gray-300">
              Tell Kindred about your goals, interests, and current life
              transition.
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800">
            <MapPinned className="mb-4 h-8 w-8 text-gray-300" />
            <h3 className="mb-3 text-2xl font-bold">2. Discover People</h3>
            <p className="text-gray-300">
              Meet others navigating similar seasons, goals, and experiences.
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800">
            <Users className="mb-4 h-8 w-8 text-gray-300" />
            <h3 className="mb-3 text-2xl font-bold">3. Grow Together</h3>
            <p className="text-gray-300">
              Connect, message, join groups, and build meaningful community.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-32 max-w-5xl">
        <h2 className="mb-8 text-center text-4xl font-bold">
          Built for meaningful connection
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800">
            <HeartHandshake className="mb-4 h-8 w-8 text-gray-300" />
            <h3 className="mb-2 text-xl font-bold">Matches</h3>
            <p className="text-gray-300">
              Find people who understand the stage of life you&apos;re in.
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800">
            <MessageCircle className="mb-4 h-8 w-8 text-gray-300" />
            <h3 className="mb-2 text-xl font-bold">Messages</h3>
            <p className="text-gray-300">
              Start conversations with people you&apos;ve mutually connected
              with.
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-neutral-800">
            <Users className="mb-4 h-8 w-8 text-gray-300" />
            <h3 className="mb-2 text-xl font-bold">Groups</h3>
            <p className="text-gray-300">
              Join small circles centered around shared goals and life
              transitions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-4xl font-bold">
          Ready to find your people?
        </h2>

        <p className="mb-8 text-lg text-gray-300">
          Join Kindred and start building connections that actually fit your
          life.
        </p>

        <SignUpButton forceRedirectUrl="/onboarding">
          <button className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200">
            Get Started
          </button>
        </SignUpButton>
      </section>
    </main>
  );
}