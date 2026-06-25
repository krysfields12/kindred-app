import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="flex flex-col items-center text-center mb-20">
        <h1 className="text-5xl font-bold mb-4">Kindred</h1>

        <p className="text-xl max-w-2xl mb-8">
          Find community, accountability, and belonging through life's transitions.
        </p>

        <SignUpButton mode="modal">
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Find Your People
        </button>
    </SignUpButton>
      </section>

      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-xl mb-2">1. Share Your Journey</h3>
            <p>
              Share your goals, interests, and life transition.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">2. Discover Your People</h3>
            <p>
              Discover people navigating similar experiences.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">3. Grow Together</h3>
            <p>
              Build community, accountability, and meaningful connections.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}