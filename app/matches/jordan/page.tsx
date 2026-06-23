import Link from "next/link";

export default function JordanProfilePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <Link href="/matches" className="underline">
          ← Back to Matches
        </Link>

        <div className="mt-8 rounded-xl border border-gray-700 bg-neutral-900 p-8">
          <h1 className="text-4xl font-bold mb-2">Jordan</h1>
          <p className="text-xl mb-1">Starting a Business</p>
          <p className="text-gray-400 mb-6">Columbia, MD</p>

          <p className="text-lg mb-8">
            Jordan is building a side business while working full-time and is
            looking to connect with other aspiring entrepreneurs for
            accountability, support, and idea sharing.
          </p>

          <div className="flex gap-4 mb-8">
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Connect
            </button>

            <button className="border border-gray-600 px-6 py-3 rounded-lg">
              Message
            </button>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Why You Match</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Starting a Business",
                "Entrepreneurship",
                "Accountability",
                "Personal Growth",
              ].map((reason) => (
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
              <li>Launch a business</li>
              <li>Stay accountable</li>
              <li>Build a network of founders</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Interests</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Entrepreneurship</li>
              <li>AI</li>
              <li>Startups</li>
              <li>Personal Growth</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Looking For</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Accountability partners</li>
              <li>Founder communities</li>
              <li>Meaningful connections</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}