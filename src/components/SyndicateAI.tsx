import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "What's trending?",
  "Help me find my style",
  "Sizing guide",
  "Shipping info",
];

const botResponses: Record<string, string> = {
  "what's trending?": "Shadow Hoodie. Eclipse Bomber. Moving fast. Choose wisely.",
  "help me find my style": "Dark or darker? Start with the Void Tee. Build from there.",
  "sizing guide": "Oversized fit. If you're between sizes, go down. Trust the cut.",
  "shipping info": "Worldwide. 3-5 days domestic. 7-14 international. No exceptions.",
};

const fallbackResponses = [
  "Not everyone gets it. But you might.",
  "Interesting choice. Let me think on that.",
  "Limited pieces. Choose wisely.",
  "You're looking at core items. Good taste.",
  "This fits your energy.",
];

const SyndicateAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to the Syndicate. How can I assist?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const lower = msg.toLowerCase();
      const matched = Object.entries(botResponses).find(([key]) => lower.includes(key));
      const response = matched
        ? matched[1]
        : fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-secondary border border-border flex items-center justify-center transition-all duration-300 hover:bg-muted ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label="Open Syndicate AI"
      >
        <MessageSquare size={18} className="text-foreground" />
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-card border border-border flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="text-foreground text-xs font-bold tracking-[0.2em] uppercase">Syndicate AI</h3>
              <p className="text-muted-foreground text-[10px] tracking-wider mt-0.5">Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 text-xs tracking-wide leading-relaxed ${
                    msg.role === "user"
                      ? "bg-secondary text-foreground"
                      : "bg-transparent border border-border text-silver-muted"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleSend(qr)}
                  className="text-[10px] text-muted-foreground border border-border px-3 py-1.5 hover:text-foreground hover:border-foreground/30 transition-colors tracking-wider uppercase"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-5 py-4 border-t border-border">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-foreground text-xs tracking-wide placeholder:text-muted-foreground outline-none"
              />
              <button onClick={() => handleSend()} className="text-muted-foreground hover:text-foreground transition-colors">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SyndicateAI;
