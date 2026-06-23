"use client";

import { useState } from "react";

const initialMessages = [
  {
    sender: "Jordan",
    text: "Hey! I saw we’re both interested in entrepreneurship and accountability.",
  },
  {
    sender: "You",
    text: "Nice to meet you! I’m working on a startup idea too.",
  },
  {
    sender: "Jordan",
    text: "That’s awesome. I’d love to hear more about what you’re building.",
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  function handleSend() {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "You",
        text: newMessage,
      },
    ]);

    setNewMessage("");
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Messages</h1>

        <p className="text-lg mb-8">
          Continue conversations with your Kindred connections.
        </p>

        <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
          <h2 className="text-2xl font-bold mb-6">Jordan</h2>

          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-md rounded-lg px-4 py-3 ${
                  message.sender === "You"
                    ? "ml-auto bg-black text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                <p className="text-sm font-semibold mb-1">{message.sender}</p>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 rounded-lg border border-gray-700 bg-transparent px-4 py-3"
            />

            <button
              type="button"
              onClick={handleSend}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}