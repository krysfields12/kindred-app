import Link from "next/link";
import { Show, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function Navbar() {
  const { userId } = await auth();

  let unreadNotifications = 0;

  if (userId) {
    unreadNotifications = await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  return (
    <nav className="border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            Kindred
          </Link>

          <Show when="signed-out">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/how-it-works">How it Works</Link>
          </Show>

          <Show when="signed-in">
            <Link href="/">Home</Link>
            <Link href="/matches">Matches</Link>
            <Link href="/messages">Messages</Link>
            <Link href="/groups">Groups</Link>
            <Link href="/requests">Requests</Link>
            <Link href="/connections">Connections</Link>

            <Link href="/notifications" className="flex items-center gap-2">
              Notifications
              {unreadNotifications > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-2 text-xs font-bold text-white">
                  {unreadNotifications}
                </span>
              )}
            </Link>
          </Show>
        </div>

        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignUpButton forceRedirectUrl="/onboarding">
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Get Started
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}