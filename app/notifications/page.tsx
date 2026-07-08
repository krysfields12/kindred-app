import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { openNotification } from "@/app/actions/notifications";
import { CircleDot, MessageCircle, Users, Clock3 } from "lucide-react";

function formatNotificationType(type: string) {
  return type.replaceAll("_", " ");
}

function getNotificationIcon(type: string) {
  if (type.includes("message")) return <MessageCircle size={18} />;
  if (type.includes("group") || type.includes("circle")) {
    return <Users size={18} />;
  }

  return <CircleDot size={18} />;
}

function formatTime(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString();
}

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

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-3 text-4xl font-bold">Notifications</h1>

        <p className="mb-4 text-lg text-gray-300">
          Stay updated on circle activity, messages, and meaningful
          connections.
        </p>

        {unreadCount > 0 && (
          <p className="mb-8 text-sm text-gray-400">
            {unreadCount} unread notification
            {unreadCount === 1 ? "" : "s"}
          </p>
        )}

        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-gray-700 bg-neutral-900 p-8">
            <h2 className="mb-2 text-2xl font-bold">No notifications yet</h2>

            <p className="text-gray-300">
              When something happens in your circle, you'll see it here.
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
                  className={`block w-full rounded-2xl border p-6 text-left transition hover:border-gray-500 hover:bg-neutral-800 ${
                    notification.isRead
                      ? "border-gray-700 bg-neutral-900"
                      : "border-emerald-600 bg-neutral-800"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`rounded-full border p-3 ${
                        notification.isRead
                          ? "border-gray-700 text-gray-400"
                          : "border-emerald-600 text-emerald-300"
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-lg font-semibold">
                          {notification.message}
                        </p>

                        {!notification.isRead && (
                          <div className="mt-2 h-3 w-3 rounded-full bg-emerald-400" />
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                        <span className="capitalize">
                          {formatNotificationType(notification.type)}
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={14} />
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                    </div>
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