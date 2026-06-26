import { saveProfile } from "@/app/actions/profile";

export default function ProfilePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Create Your Profile</h1>

        <p className="mb-8 text-lg">
          Tell Kindred about your journey so we can help you find people on a similar path.
        </p>

        <form action={saveProfile} className="space-y-5">
          <input name="name" type="text" placeholder="Name" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white" />

          <input name="location" type="text" placeholder="Location" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white" />

          <select name="lifeTransition" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white">
            <option value="">Select your life transition</option>
            <option>Career Change</option>
            <option>Starting a Business</option>
            <option>New to a City</option>
            <option>Remote Worker</option>
            <option>New Parent</option>
          </select>

          <input name="goals" type="text" placeholder="Goals, e.g. build community, stay accountable" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white" />

          <input name="interests" type="text" placeholder="Interests, e.g. entrepreneurship, fitness, tech" required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white" />

          <textarea name="bio" placeholder="Short bio" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white" />

          <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg">
            Save Profile
          </button>
        </form>
      </section>
    </main>
  );
}