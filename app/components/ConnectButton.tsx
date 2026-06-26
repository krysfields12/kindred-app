"use client";

import { useState } from "react";
import { sendConnectionRequest } from "@/app/actions/connections";

export default function ConnectButton({
  receiverId,
  receiverName,
}: {
  receiverId: string;
  receiverName: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
        <p className="font-semibold">Request sent</p>
        <p className="text-sm text-gray-400">
          Your connection request has been sent to {receiverName}.
        </p>
      </div>
    );
  }

  return (
    <form action={async (formData) => {
      await sendConnectionRequest(formData);
      setSent(true);
    }} className="space-y-4">
      <input type="hidden" name="receiverId" value={receiverId} />

      <div>
        <label className="block font-semibold mb-2">
          Message to {receiverName} <span className="text-gray-400">(optional)</span>
        </label>

        <textarea
          name="message"
          placeholder={`Hi ${receiverName}! I noticed we have similar goals and wanted to connect.`}
          className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Send Request
      </button>
    </form>
  );
}
