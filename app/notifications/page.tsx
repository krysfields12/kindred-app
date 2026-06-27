import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { openNotification } from "@/app/actions/notifications";

export default async function NotificationsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Notifications</h1>

        <p className="text-lg mb-8">
          Stay updated on connection requests, messages, and group activity.
        </p>

        {notifications.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
            <h2 className="text-2xl font-bold mb-2">No notifications yet</h2>
            <p className="text-gray-300">
              When something happens on Kindred, you’ll see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <form
                key={notification.id}
                action={async () => {
                  "use server";
                  await openNotification(notification.id);
                }}
              >
                <button
                  type="submit"
                  className={`block w-full rounded-xl border border-gray-700 p-6 text-left hover:bg-neutral-800 transition ${
                    notification.isRead
                      ? "bg-neutral-900"
                      : "bg-neutral-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold mb-1">
                        {notification.message}
                      </p>

                      <p className="text-sm text-gray-400 capitalize">
                        {notification.type.replace("_", " ")}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <span className="rounded-full bg-white text-black px-3 py-1 text-sm font-semibold">
                        New
                      </span>
                    )}
                  </div>
                </button>
              </form>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}