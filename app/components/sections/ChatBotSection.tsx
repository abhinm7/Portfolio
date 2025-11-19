"use client";

import { useState } from "react";
import Reveal from "../ui/Reveal";

import ChatContainer from "../chatbot/ChatContainer";

export default function ChatBotSection() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // app/api/chat/sampleQuestions.ts

  const sampleQuestions = [
    "Tell me about yourself.",
    "Tell me about your Social Media Microservices app.",
    "What is your tech stack?",
    "Tell me about your Email Aggregator project.",
    "Why should I hire you?"
  ];

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    // user sends
    setMessages((m) => [...m, { from: "user", text }]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    // bot responds
    setMessages((m) => [...m, { from: "bot", text: data.text }]);
    setLoading(false);
  }

  return (
    <section className="py-16 border-t border-slate-200/60 text-slate-900">
      <div className="section-container max-w-md mx-auto sm:max-w-lg">
        <Reveal>
          <h2 className="text-2xl font-bold text-center mb-6">AI Assistant</h2>
        </Reveal>

        <ChatContainer
          messages={messages}
          loading={loading}
          sampleQuestions={sampleQuestions}
          sendMessage={sendMessage}
        />
      </div>
    </section>
  );
}
