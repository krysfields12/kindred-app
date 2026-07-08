import Link from "next/link";
import { saveProfile } from "@/app/actions/profile";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Heart, MapPin, Target, UserRound } from "lucide-react";

export default async function EditProfilePage() {
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
      <section className="mx-auto max-w-3xl">
        <Link href="/profile" className="text-gray-300 underline">
          ← Back to My Profile
        </Link>

        <div className="mt-8 rounded-2xl border border-gray-700 bg-neutral-900 p-8">
          <p className="mb-4 inline-flex rounded-full border border-emerald-600 bg-emerald-950/40 px-3 py-1 text-sm text-emerald-300">
            {profile ? "Edit Profile" : "Create Profile"}
          </p>

          <h1 className="mb-3 text-4xl font-bold">
            {profile ? "Update your Kindred profile" : "Create your Kindred profile"}
          </h1>

          <p className="mb-8 text-gray-300">
            Tell Kindred about your current journey so we can recommend the right
            circle and help others understand how to connect with you.
          </p>

          <form action={saveProfile} className="space-y-6">
            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <UserRound size={18} />
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                defaultValue={profile?.name ?? ""}
                className="w-full rounded-lg border border-gray-700 bg-neutral-950 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <MapPin size={18} />
                Location
              </label>
              <input
                name="location"
                type="text"
                placeholder="City, State"
                required
                defaultValue={profile?.location ?? ""}
                className="w-full rounded-lg border border-gray-700 bg-neutral-950 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <Target size={18} />
                Life Transition
              </label>
              <select
                name="lifeTransition"
                required
                defaultValue={profile?.transition ?? ""}
                className="w-full rounded-lg border border-gray-700 bg-neutral-950 px-4 py-3 text-white"
              >
                <option value="">Select your current journey</option>
                <option>Career Change</option>
                <option>Starting a Business</option>
                <option>New to a City</option>
                <option>Remote Worker</option>
                <option>New Parent</option>
                <option>Starting a New Job</option>
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <Target size={18} />
                Goals
              </label>
              <input
                name="goals"
                type="text"
                placeholder="Example: stay accountable, build community"
                required
                defaultValue={profile?.goals?.join(", ") ?? ""}
                className="w-full rounded-lg border border-gray-700 bg-neutral-950 px-4 py-3 text-white"
              />
              <p className="mt-2 text-sm text-gray-400">
                Separate multiple goals with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <Heart size={18} />
                Interests
              </label>
              <input
                name="interests"
                type="text"
                placeholder="Example: entrepreneurship, fitness, tech"
                required
                defaultValue={profile?.interests?.join(", ") ?? ""}
                className="w-full rounded-lg border border-gray-700 bg-neutral-950 px-4 py-3 text-white"
              />
              <p className="mt-2 text-sm text-gray-400">
                Separate multiple interests with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 font-semibold">Bio</label>
              <textarea
                name="bio"
                placeholder="Share a little about where you are in life and what kind of connection would be helpful right now."
                defaultValue={profile?.bio ?? ""}
                rows={6}
                className="w-full rounded-lg border border-gray-700 bg-neutral-950 px-4 py-3 text-white"
              />
            </div>

            <div className="flex gap-3 border-t border-gray-800 pt-6">
              <button
                type="submit"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                {profile ? "Save Changes" : "Save Profile"}
              </button>

              <Link
                href="/profile"
                className="rounded-lg border border-gray-600 px-6 py-3 transition hover:border-gray-400"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}