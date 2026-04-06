import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Minus } from "lucide-react";
import { streamNyteChat } from "@/lib/nyte-stream";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const IDENTITY = {
  name: "NYTE",
  greeting: "After midnight, things get interesting.\nYou're here. That says enough.",
};

const quickReplies = [
  "Best sellers",
  "Style me",
  "Sizing",
  "Who are you?",
];

const SyndicateAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: IDENTITY.greeting },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    const userMsg: Message = { role: "user", content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    let assistantContent = "";

    // Build conversation history for AI (exclude the greeting)
    const aiMessages = newMessages
      .filter((_, i) => i > 0 || newMessages[0].role !== "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    // If greeting is first, include user messages starting from index 1
    const historyForAI = newMessages.slice(1).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    streamNyteChat({
      messages: historyForAI,
      onDelta: (chunk) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last !== newMessages[0]) {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [...prev, { role: "assistant", content: assistantContent }];
        });
      },
      onDone: () => setIsTyping(false),
      onError: (errMsg) => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errMsg },
        ]);
        setIsTyping(false);
      },
    });
  };

  const showQuickReplies = messages.length <= 2 && !isTyping;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-secondary border border-border flex items-center justify-center transition-all duration-500 hover:border-foreground/30 group ${isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"}`}
        aria-label="Open NYTE"
      >
        <MessageSquare size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-100px)] bg-background border border-border flex flex-col animate-scale-in shadow-2xl shadow-background/80">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <div>
                <h3 className="text-foreground text-[11px] font-bold tracking-[0.25em] uppercase">{IDENTITY.name}</h3>
                <p className="text-muted-foreground text-[9px] tracking-[0.2em] uppercase mt-0.5">Online · Members Only</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1.5">
                <Minus size={14} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1.5">
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                style={{ animationDuration: "0.3s" }}
              >
                {msg.role === "assistant" && (
                  <span className="text-[9px] text-accent font-bold tracking-[0.2em] uppercase mr-2 mt-3 shrink-0">N</span>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 text-xs leading-relaxed tracking-wide whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-secondary text-foreground"
                      : "bg-transparent border border-border text-silver"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start animate-fade-in" style={{ animationDuration: "0.2s" }}>
                <span className="text-[9px] text-accent font-bold tracking-[0.2em] uppercase mr-2 mt-3 shrink-0">N</span>
                <div className="px-4 py-3 border border-border">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {showQuickReplies && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleSend(qr)}
                  className="text-[10px] text-muted-foreground border border-border px-3 py-1.5 hover:text-foreground hover:border-foreground/30 transition-all duration-300 tracking-[0.15em] uppercase"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          <div className="px-5 py-4 border-t border-border bg-card">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Speak..."
                className="flex-1 bg-transparent text-foreground text-xs tracking-wide placeholder:text-muted-foreground outline-none"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !input.trim()}
                className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
              >
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
