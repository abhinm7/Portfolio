"use client";

import { useState } from "react";

export default function InputBar({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <div className="p-3 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="
          flex-1 p-2.5 rounded-lg 
          bg-white/60 backdrop-blur-sm 
          border border-slate-300/50
          text-sm
          focus:outline-none
        "
        placeholder="Ask something..."
      />

      <button
        onClick={handleSend}
        className="
          px-4 py-2 rounded-lg text-sm bg-blue-600 text-white 
          hover:bg-blue-700 transition-all
        "
      >
        Send
      </button>
    </div>
  );
}
