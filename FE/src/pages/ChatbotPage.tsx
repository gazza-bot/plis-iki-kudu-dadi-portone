import { useEffect, useRef, useState } from "react";
import { PageBackLink } from "../components/ui/PageBackLink";
import { useEscapeToHome } from "../hooks/useEscapeToHome";
import { getApiUrl } from "../lib/api";

interface ChatMessage {
  id: number;
  role: "ai" | "user";
  text: string;
}

export default function ChatbotPage() {
  useEscapeToHome();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "ai",
      text: "Halo! Aku Nimo, asisten AI Adil. Tanyakan tentang karya, pengalaman, atau cara Adil mengerjakan proyek.",
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: loading ? "auto" : "smooth",
    });
  }, [loading, messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    const userMessage = input.trim();

    if (!userMessage || loading) return;

    setInput("");
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: userMessage },
    ]);
    setLoading(true);

    try {
      const response = await fetch(getApiUrl("/api/chat"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      if (!response.ok || !data.reply) {
        throw new Error("The AI server returned an invalid response.");
      }

      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "ai", text: data.reply },
      ]);
    } catch (error) {
      console.error("Gagal mengirim pesan ke backend:", error);
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "Pesan belum bisa diproses. Coba lagi beberapa saat lagi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col overflow-hidden bg-ink text-white">
      <PageBackLink />
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-5 pb-5 pt-24 md:px-10 md:pb-6 md:pt-20">
          <div>
            <p className="font-p text-[10px] uppercase tracking-[0.24em] text-blue-light">
              Private room
            </p>
            <h1 className="mt-2 font-heading text-4xl leading-none tracking-wide">
              NIMO<span className="text-blue-main">.</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-5 py-5 md:px-10 md:py-8">
        <section
          className="flex min-h-0 flex-1 flex-col border border-white/15 bg-white/[0.03]"
          aria-label="Chat with Nimo"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-6">
            <p className="font-p text-xs text-white/65">
              Ask about Adil&apos;s work and projects
            </p>
            <p className="hidden font-p text-[10px] uppercase tracking-[0.16em] text-blue-light sm:block">
              Esc to exit
            </p>
          </div>

          <div
            className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-6 md:px-8 md:py-8"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[min(85%,42rem)] border px-4 py-3 font-p text-sm leading-relaxed ${
                    message.role === "user"
                      ? "border-blue-main bg-blue-main text-white"
                      : "border-white/15 bg-white/[0.07] text-white/85"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="border border-white/15 bg-white/[0.07] px-4 py-3 font-p text-sm text-white/65">
                  Nimo sedang berpikir
                  <span className="animate-dots" aria-hidden="true" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-white/10 p-4 md:p-6"
          >
            <label
              htmlFor="nimo-message"
              className="font-p text-[10px] uppercase tracking-[0.16em] text-white/60"
            >
              Message
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                ref={inputRef}
                id="nimo-message"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Tulis pesan untuk Nimo..."
                disabled={loading}
                autoComplete="off"
                className="min-h-11 w-full border border-white/20 bg-ink px-3 py-3 font-p text-sm text-white placeholder:text-white/45 transition-colors focus:border-blue-light focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="min-h-11 border border-blue-main bg-blue-main px-6 py-3 font-p text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
