"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Trash2, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const QUICK_PROMPTS = [
  "NIFTY 50 outlook today",
  "Top gainers & losers NSE",
  "Best IT stocks to watch",
  "Gold vs Nifty this week",
];

type Message = { role: "user" | "assistant"; content: string };

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm your **AI Market Assistant** 📊\n\nAsk me about Indian stocks, technical indicators, sector analysis, or market news. I'll give you quick, professional insights.",
  },
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput("");
    const userMsg: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message || "Sorry, I couldn't process your request.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  const showQuickPrompts = messages.length === 1;

  return (
    <>
      {/* Floating open button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[999] h-14 w-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-gray-950 shadow-2xl shadow-teal-500/30 transition-all duration-300 hover:scale-110 hover:shadow-teal-500/50 flex items-center justify-center ${
          isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"
        }`}
        aria-label="Open AI Market Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-[1000] flex flex-col overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{ width: "min(380px, calc(100vw - 24px))", height: "min(580px, calc(100vh - 100px))" }}
      >
        <div className="flex flex-col h-full rounded-2xl border border-gray-700/50 bg-[#050505] shadow-2xl shadow-black/50 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800/80 bg-[#0a0a0a] px-4 py-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20">
                <Bot className="h-4.5 w-4.5 text-teal-400" />
                {/* Live indicator */}
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-teal-500 border-2 border-[#0a0a0a]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-100 leading-none">Market AI</h3>
                <p className="text-[10px] text-teal-400 mt-0.5 font-medium">Powered by Gemini</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <button
                  onClick={clearConversation}
                  title="Clear conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-800 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-800 hover:text-gray-100 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide-default">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 h-6 w-6 shrink-0 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-teal-400" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-teal-500 text-gray-950 font-medium rounded-br-sm"
                      : "bg-[#111111] border border-gray-800/60 text-gray-200 rounded-bl-sm"
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              </div>
            ))}

            {/* Typing dots */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="mr-2 h-6 w-6 shrink-0 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mt-1">
                  <Bot className="h-3 w-3 text-teal-400" />
                </div>
                <div className="bg-[#111111] border border-gray-800/60 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            {/* Quick prompts */}
            {showQuickPrompts && (
              <div className="pt-1 space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-gray-600 font-semibold px-1">Try asking</p>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-left text-xs rounded-xl border border-gray-800 bg-[#0d0d0d] px-3 py-2 text-gray-400 hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-300 transition-all duration-200 leading-tight"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-800/80 bg-[#0a0a0a] px-3 py-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about stocks, sectors, indicators..."
                className="flex-1 h-10 border-gray-700/60 bg-[#111111] text-gray-100 placeholder:text-gray-600 text-sm focus:border-teal-500/50 focus:ring-0 rounded-xl"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 rounded-xl bg-teal-500 text-gray-950 hover:bg-teal-400 disabled:opacity-40 shrink-0 transition-all hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
