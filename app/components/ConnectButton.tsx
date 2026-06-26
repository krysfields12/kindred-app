"use client";

import { useState } from "react";

export default function ConnectButton() {
  const [connected, setConnected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setConnected(true)}
      disabled={connected}
      className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-60"
    >
      {connected ? "Request Sent" : "Connect"}
    </button>
  );
}