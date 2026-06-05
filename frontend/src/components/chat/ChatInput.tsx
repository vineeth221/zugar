"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();

    const cleanMessage = message.trim();
    if (!cleanMessage || disabled) return;

    onSend(cleanMessage);
    setMessage("");
  };

  return (
    <form
      onSubmit={submit}
      className="relative w-full rounded-[28px] bg-gradient-to-r from-[#7c5cff] via-[#a855f7] to-[#00d4ff] p-[2px] shadow-2xl shadow-indigo-200"
    >
      <div className="flex items-center gap-3 rounded-[26px] bg-white px-4 py-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3f0ff]">
          <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#7c5cff] opacity-60" />
          <span className="h-3 w-3 rounded-full bg-[#5b43ff]" />
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-[#f6f4ff] px-3 py-2 text-xs font-semibold text-[#5b43ff] sm:flex">
          <Sparkles size={14} />
          ARKHA AI
        </div>

        <input
          value={message}
          disabled={disabled}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask ARKHA what home fits your life..."
          className="min-w-0 flex-1 bg-transparent px-2 py-4 text-[16px] font-medium text-gray-900 outline-none placeholder:text-gray-400"
        />

        <button
          disabled={disabled || !message.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5b43ff] text-white shadow-lg shadow-indigo-200 transition hover:scale-105 disabled:opacity-40"
        >
          <ArrowUp size={22} />
        </button>
      </div>
    </form>
  );
}