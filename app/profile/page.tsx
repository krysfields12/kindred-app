/* add a simple form with: 
    - Location
    - Life Transition
    - Goals
    - Interests
    - Bio
*/
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Create Your Profile</h1>

        <p className="mb-8 text-lg">
          Tell Kindred about your journey so we can help you find people on a similar path.
        </p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white">
            <option>Select your life transition</option>
            <option>Career Change</option>
            <option>Starting a Business</option>
            <option>New to a City</option>
            <option>Remote Worker</option>
            <option>New Parent</option>
          </select>

          <input
            type="text"
            placeholder="Goals, e.g. build community, stay accountable"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <input
            type="text"
            placeholder="Interests, e.g. entrepreneurship, fitness, tech"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <textarea
            placeholder="Short bio"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <Link
            href="/matches"
            className="bg-black text-white px-6 py-3 rounded-lg"
        >
            Save Profile
          </Link>
        </form>
      </section>
    </main>
  );
}