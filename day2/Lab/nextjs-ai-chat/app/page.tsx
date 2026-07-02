"use client";

import { useChat } from "@ai-sdk/react";
import { MessageSquare, Plus, Send, Bot, User } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";

export default function ChatPage() {
  const { messages, sendMessage, setMessages, status } = useChat();
  const [input, setInput] = useState("");

  const submitMessage = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || status === "streaming") {
      return;
    }

    sendMessage({ text: trimmedInput });
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  const getTextContent = (message: (typeof messages)[number]) =>
    message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");

  return (
    <div className="flex h-screen w-screen bg-[#212121] text-gray-200 overflow-hidden">
      <aside className="w-64 bg-[#171717] h-full hidden md:flex flex-col p-3 justify-between border-r border-zinc-800">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setMessages([])}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 transition duration-200"
          >
            <Plus size={16} />
            New chat
          </button>

          <div className="pt-4">
            <p className="text-xs font-semibold text-zinc-500 px-3 uppercase tracking-wider">
              History
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-zinc-800 text-zinc-200 cursor-pointer truncate">
                <MessageSquare size={14} />
                Current Conversation
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full bg-[#212121]">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-3xl w-full mx-auto CustomScrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
              <Bot size={48} className="text-zinc-400" />
              <h2 className="text-xl font-semibold">
                How can I help you today?
              </h2>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="flex gap-4 items-start text-base"
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${message.role === "user" ? "bg-zinc-700" : "bg-emerald-600 text-white"}`}
                >
                  {message.role === "user" ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>
                <div className="prose prose-invert max-w-none pt-1">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {getTextContent(message)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-[#212121]">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl w-full mx-auto relative flex items-center"
          >
            <input
              className="w-full bg-[#2f2f2f] text-zinc-100 placeholder-zinc-500 text-sm rounded-2xl pl-4 pr-12 py-3.5 focus:outline-none focus:ring-1 focus:ring-zinc-600 shadow-lg border border-zinc-700/50"
              value={input}
              placeholder="Message ChatGPT..."
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={submitMessage}
              disabled={!input.trim() || status === "streaming"}
              className="absolute right-2.5 p-2 rounded-xl bg-white text-black disabled:bg-zinc-700 disabled:text-zinc-500 transition duration-200"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="text-xs text-center text-zinc-500 mt-2">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </main>
    </div>
  );
}
