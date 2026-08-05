import { useState, useRef, useEffect } from 'react';

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Halo! Ada yang bisa saya bantu hari ini?' }
  ]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Otomatis scroll ke pesan paling bawah saat ada pesan baru
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fungsi untuk mengirim pesan ke Backend Express
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');

    // Tambahkan pesan user ke UI
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Mengambil URL dari env (atau fallback ke localhost:5000)
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'ai', text: 'Maaf, terjadi kesalahan pada server AI.' },
        ]);
      }
    } catch (error) {
      console.error('Gagal terhubung ke backend:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Gagal terhubung ke server. Pastikan backend sudah berjalan.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Widget AI Assistant (Jendela Chat) */}
      {isOpen && (
        <div className="mb-4 w-80 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl transition-all duration-300 sm:w-96">
          {/* Header Widget */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
              <h3 className="font-p font-semibold text-gray-800">AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Tutup AI Assistant"
            >
              ✕
            </button>
          </div>

          {/* Area Percakapan / Isi Widget */}
          <div className="my-4 h-64 overflow-y-auto pr-1 space-y-3 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`font-p max-w-[85%] rounded-2xl p-3 ${
                    msg.role === 'user'
                      ? 'rounded-tr-none bg-blue-main text-white'
                      : 'rounded-tl-none bg-gray-100 text-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Indikator Loading */}
            {loading && (
              <div className="flex justify-start">
                <div className="font-p max-w-[85%] rounded-2xl rounded-tl-none bg-gray-100 p-3 text-gray-400 italic">
                  Memikirkan jawaban...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-gray-100 pt-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan..."
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-blue-main px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              Kirim
            </button>
          </form>
        </div>
      )}

      {/* Floating Button (Tombol Pemicu) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex size-24 items-center justify-center rounded-full bg-blue-main text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110 hover:bg-white-bg hover:text-blue-main hover:shadow-md active:scale-95"
        aria-label="Toggle AI Assistant"
      >
        <svg
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="size-12 fill-current transition-transform duration-1000 group-hover:rotate-360"
        >
          <title>ai</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="invisible_box" data-name="invisible box">
              <rect width="48" height="48" fill="none" />
            </g>
            <g id="Q3_icons" data-name="Q3 icons">
              <g>
                <path d="M45.6,18.7,41,14.9V7.5a1,1,0,0,0-.6-.9L30.5,2.1h-.4l-.6.2L24,5.9,18.5,2.2,17.9,2h-.4L7.6,6.6a1,1,0,0,0-.6.9v7.4L2.4,18.7a.8.8,0,0,0-.4.8v9H2a.8.8,0,0,0,.4.8L7,33.1v7.4a1,1,0,0,0,.6.9l9.9,4.5h.4l.6-.2L24,42.1l5.5,3.7.6.2h.4l9.9-4.5a1,1,0,0,0,.6-.9V33.1l4.6-3.8a.8.8,0,0,0,.4-.7V19.4h0A.8.8,0,0,0,45.6,18.7Zm-5.1,6.8H42v1.6l-3.5,2.8-.4.3-.4-.2a1.4,1.4,0,0,0-2,.7,1.5,1.5,0,0,0,.6,2l.7.3h0v5.4l-6.6,3.1-4.2-2.8-.7-.5V25.5H27a1.5,1.5,0,0,0,0-3H25.5V9.7l.7-.5,4.2-2.8L37,9.5v5.4h0l-.7.3a1.5,1.5,0,0,0-.6,2,1.4,1.4,0,0,0,1.3.9l.7-.2.4-.2.4.3L42,20.9v1.6H40.5a1.5,1.5,0,0,0,0,3ZM21,25.5h1.5V38.3l-.7.5-4.2,2.8L11,38.5V33.1h0l.7-.3a1.5,1.5,0,0,0,.6-2,1.4,1.4,0,0,0-2-.7l-.4.2-.4-.3L6,27.1V25.5H7.5a1.5,1.5,0,0,0,0-3H6V20.9l3.5-2.8.4-.3.4.2.7.2a1.4,1.4,0,0,0,1.3-.9,1.5,1.5,0,0,0-.6-2L11,15h0V9.5l6.6-3.1,4.2,2.8.7.5V22.5H21a1.5,1.5,0,0,0,0,3Z" />
                <path d="M13.9,9.9a1.8,1.8,0,0,0,0,2.2l2.6,2.5v2.8l-4,4v5.2l4,4v2.8l-2.6,2.5a1.8,1.8,0,0,0,0,2.2,1.5,1.5,0,0,0,1.1.4,1.5,1.5,0,0,0,1.1-.4l3.4-3.5V29.4l-4-4V22.6l4-4V13.4L16.1,9.9A1.8,1.8,0,0,0,13.9,9.9Z" />
                <path d="M31.5,14.6l2.6-2.5a1.8,1.8,0,0,0,0-2.2,1.8,1.8,0,0,0-2.2,0l-3.4,3.5v5.2l4,4v2.8l-4,4v5.2l3.4,3.5a1.7,1.7,0,0,0,2.2,0,1.8,1.8,0,0,0,0-2.2l-2.6-2.5V30.6l4-4V21.4l-4-4Z" />
              </g>
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}