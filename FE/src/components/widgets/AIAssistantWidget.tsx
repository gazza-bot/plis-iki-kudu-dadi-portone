import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Halo! Aku Nimo, asisten AI Adil. Ada yang bisa saya bantu hari ini?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }

    const frame = requestAnimationFrame(() => inputRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;

      const response = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "Maaf, terjadi kesalahan pada server AI." },
        ]);
      }
    } catch (error) {
      console.error("Gagal terhubung ke backend:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Gagal terhubung ke server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openPanel = () => {
    if (!isOpen) setShouldRender(true);
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      {shouldRender && (
        <div
          id="nimo-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Nimo, asisten AI portofolio"
          className={`mb-4 w-[calc(100vw-2rem)] origin-bottom-right border border-ink bg-paper shadow-editorial transition-all duration-300 ease-out sm:w-96 ${
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-4 border-b border-ink/15 bg-white-bg px-4 py-3">
            <div>
              <h2 className="font-heading text-2xl tracking-tight text-ink">
                NIMO
              </h2>
              <p className="font-p text-[10px] uppercase tracking-[0.16em] text-ink/70">
                Portfolio assistant
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid size-9 place-items-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white-bg"
              aria-label="Close AI assistant"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div
            className="max-h-72 space-y-3 overflow-y-auto p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] border px-3 py-2.5 font-p text-sm leading-relaxed ${
                    message.role === "user"
                      ? "border-blue-deep bg-blue-deep text-white"
                      : "border-ink/10 bg-white-bg text-ink/80"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] border border-ink/10 bg-white-bg px-3 py-2.5 font-p text-sm text-ink/70">
                  Nimo sedang berpikir
                  <span className="animate-dots" aria-hidden="true" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-ink/15 p-4"
          >
            <label
              htmlFor="nimo-message"
              className="font-p text-[10px] uppercase tracking-[0.16em] text-ink/70"
            >
              Message
            </label>
            <div className="mt-2 flex gap-2">
              <input
                ref={inputRef}
                id="nimo-message"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Tulis pesan..."
                disabled={loading}
                autoComplete="off"
                className="w-full border border-ink/20 bg-paper px-3 py-2 font-p text-sm text-ink placeholder:text-ink/65 transition-colors focus:border-blue-deep disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="border border-blue-deep bg-blue-deep px-4 py-2 font-p text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:border-ink hover:bg-ink disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={openPanel}
        className="grid size-16 place-items-center rounded-full border border-ink bg-ink text-white shadow-editorial-sm transition-colors hover:bg-blue-deep sm:size-20"
        aria-expanded={isOpen}
        aria-controls="nimo-panel"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        <svg
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8 fill-current sm:size-10"
          aria-hidden="true"
        >
          <g>
            <path d="M45.6,18.7,41,14.9V7.5a1,1,0,0,0-.6-.9L30.5,2.1h-.4l-.6.2L24,5.9,18.5,2.2,17.9,2h-.4L7.6,6.6a1,1,0,0,0-.6.9v7.4L2.4,18.7a.8.8,0,0,0-.4.8v9H2a.8.8,0,0,0,.4.8L7,33.1v7.4a1,1,0,0,0,.6.9l9.9,4.5h.4l.6-.2L24,42.1l5.5,3.7.6.2h.4l9.9-4.5a1,1,0,0,0,.6-.9V33.1l4.6-3.8a.8.8,0,0,0,.4-.7V19.4h0A.8.8,0,0,0,45.6,18.7Zm-5.1,6.8H42v1.6l-3.5,2.8-.4.3-.4-.2a1.4,1.4,0,0,0-2,.7,1.5,1.5,0,0,0,.6,2l.7.3h0v5.4l-6.6,3.1-4.2-2.8-.7-.5V25.5H27a1.5,1.5,0,0,0,0-3H25.5V9.7l.7-.5,4.2-2.8L37,9.5v5.4h0l-.7.3a1.5,1.5,0,0,0-.6,2,1.4,1.4,0,0,0,1.3.9l.7-.2.4-.2.4.3L42,20.9v1.6H40.5a1.5,1.5,0,0,0,0,3ZM21,25.5h1.5V38.3l-.7.5-4.2,2.8L11,38.5V33.1h0l.7-.3a1.5,1.5,0,0,0,.6-2,1.4,1.4,0,0,0-2-.7l-.4.2-.4-.3L6,27.1V25.5H7.5a1.5,1.5,0,0,0,0-3H6V20.9l3.5-2.8.4-.3.4.2.7.2a1.4,1.4,0,0,0,1.3-.9,1.5,1.5,0,0,0-.6-2L11,15h0V9.5l6.6-3.1,4.2,2.8.7.5V22.5H21a1.5,1.5,0,0,0,0,3Z" />
            <path d="M13.9,9.9a1.8,1.8,0,0,0,0,2.2l2.6,2.5v2.8l-4,4v5.2l4,4v2.8l-2.6,2.5a1.8,1.8,0,0,0,0,2.2,1.5,1.5,0,0,0,1.1.4,1.5,1.5,0,0,0,1.1-.4l3.4-3.5V29.4l-4-4V22.6l4-4V13.4L16.1,9.9A1.8,1.8,0,0,0,13.9,9.9Z" />
            <path d="M31.5,14.6l2.6-2.5a1.8,1.8,0,0,0,0-2.2,1.8,1.8,0,0,0-2.2,0l-3.4,3.5v5.2l4,4v2.8l-4,4v5.2l3.4,3.5a1.7,1.7,0,0,0,2.2,0,1.8,1.8,0,0,0,0-2.2l-2.6-2.5V30.6l4-4V21.4l-4-4Z" />
          </g>
        </svg>
      </button>
    </div>
  );
}
