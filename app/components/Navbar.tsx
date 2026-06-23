import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Kindred
        </Link>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/matches">Matches</Link>
          <Link href="/messages">Messages</Link>
        </div>
      </div>
    </nav>
  );
}