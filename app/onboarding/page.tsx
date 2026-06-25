import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Kindred</h1>

        <p className="text-xl mb-8">
          Tell us about your journey so we can help you find people on a similar path.
        </p>

        <div className="rounded-xl border border-gray-700 bg-neutral-900 p-8 text-left mb-8">
          <h2 className="text-2xl font-bold mb-4">What happens next?</h2>

          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>Complete your profile.</li>
            <li>Share your life transition, goals, and interests.</li>
            <li>Discover people navigating similar experiences.</li>
            <li>Build community, accountability, and meaningful connections.</li>
          </ol>
        </div>

        <Link
          href="/profile"
          className="bg-black text-white px-6 py-3 rounded-lg inline-block"
        >
          Complete Your Profile
        </Link>
      </section>
    </main>
  );
}