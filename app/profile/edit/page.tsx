import { saveProfile } from "@/app/actions/profile";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {profile ? "Edit Your Profile" : "Create Your Profile"}
        </h1>

        <p className="mb-8 text-lg">
          Tell Kindred about your journey so we can help you find people on a similar path.
        </p>

        <form action={saveProfile} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            defaultValue={profile?.name ?? ""}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <input
            name="location"
            type="text"
            placeholder="Location"
            required
            defaultValue={profile?.location ?? ""}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <select
            name="lifeTransition"
            required
            defaultValue={profile?.transition ?? ""}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          >
            <option value="">Select your life transition</option>
            <option>Career Change</option>
            <option>Starting a Business</option>
            <option>New to a City</option>
            <option>Remote Worker</option>
            <option>New Parent</option>
          </select>

          <input
            name="goals"
            type="text"
            placeholder="Goals, e.g. build community, stay accountable"
            required
            defaultValue={profile?.goals?.join(", ") ?? ""}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <input
            name="interests"
            type="text"
            placeholder="Interests, e.g. entrepreneurship, fitness, tech"
            required
            defaultValue={profile?.interests?.join(", ") ?? ""}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <textarea
            name="bio"
            placeholder="Short bio"
            defaultValue={profile?.bio ?? ""}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {profile ? "Save Changes" : "Save Profile"}
          </button>
        </form>
      </section>
    </main>
  );
}