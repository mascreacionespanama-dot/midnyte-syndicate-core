import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Minus } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const IDENTITY = {
  name: "SYNDICATE AI",
  greeting: "You found us. Most don't.\nWhat do you need?",
  personality: "cold, minimal, exclusive, mysterious concierge",
};

const quickReplies = [
  "Best sellers",
  "Style me",
  "Sizing",
  "Who is Midnyte?",
];

type ResponseEntry = { keywords: string[]; responses: string[] };

const responseMap: ResponseEntry[] = [
  {
    keywords: ["best seller", "trending", "popular", "top", "best"],
    responses: [
      "Shadow Hoodie. Eclipse Bomber. Two pieces that define the Syndicate right now.",
      "Void Tee is moving. Phantom Cargos close behind. Don't sleep.",
      "Eclipse Bomber. 450 reasons to never take it off.",
    ],
  },
  {
    keywords: ["hoodie", "shadow"],
    responses: [
      "Shadow Hoodie. $280. Oversized. Heavy cotton. You disappear into it—in the best way.",
      "The Shadow Hoodie isn't just a hoodie. It's your new default. Oversized cut. Washed black. Feels like armor.",
    ],
  },
  {
    keywords: ["cargo", "pants", "phantom"],
    responses: [
      "Phantom Cargos. $320. Built for the night. Functional pockets. Silent movement.",
      "Phantom Cargos pair with everything we make. That's by design.",
    ],
  },
  {
    keywords: ["tee", "t-shirt", "void"],
    responses: [
      "Void Tee. $140. Minimal graphic. Heavy weight. Wear the mark, say nothing.",
      "The Void Tee is the entry point. If you get it, you get us.",
    ],
  },
  {
    keywords: ["bomber", "jacket", "eclipse"],
    responses: [
      "Eclipse Bomber. $450. Silver hardware. Matte shell. The piece that walks into a room before you do.",
      "Eclipse Bomber. Premium build. Limited quantities. Once it's gone, it's gone.",
    ],
  },
  {
    keywords: ["beanie", "hat", "obsidian"],
    responses: [
      "Obsidian Beanie. $95. Ribbed knit. Low profile. Finishes the look without trying.",
      "Obsidian Beanie. The detail that separates intention from accident.",
    ],
  },
  {
    keywords: ["style", "recommend", "outfit", "wear", "combine", "pair", "match", "look"],
    responses: [
      "Start dark. Shadow Hoodie + Phantom Cargos. Add the Obsidian Beanie if you want to disappear completely.",
      "Void Tee under Eclipse Bomber. Phantom Cargos. That's a full Syndicate uniform.",
      "Layer the Shadow Hoodie under the Eclipse Bomber. Oversized on structured. Tension creates presence.",
      "Minimal approach: Void Tee + any dark denim. Let the mark speak.",
    ],
  },
  {
    keywords: ["size", "sizing", "fit", "measure", "small", "medium", "large"],
    responses: [
      "Everything runs oversized. Between sizes? Go down. Trust the cut.",
      "S fits like M. M fits like L. That's intentional. We design for presence, not precision.",
      "Sizing chart is on each product page. But the short version: if you want fitted, size down one.",
    ],
  },
  {
    keywords: ["ship", "delivery", "track", "order", "arrive"],
    responses: [
      "Domestic: 3–5 days. International: 7–14. Free over $200. Tracking on everything.",
      "We ship worldwide. Your order gets a tracking number the moment it leaves us.",
      "Orders process within 24 hours. After that, it's in motion.",
    ],
  },
  {
    keywords: ["return", "exchange", "refund"],
    responses: [
      "14 days. Unworn. Tags on. Final sale items stay final. Contact us to start the process.",
      "We do returns, not regrets. 14-day window. Original condition only.",
    ],
  },
  {
    keywords: ["about", "who", "brand", "midnyte", "syndicate", "story"],
    responses: [
      "Midnyte Syndicate. Born in silence. Not from a trend report—from the streets, the shadows, the space between.",
      "We're not a brand. We're a frequency. You either tune in or you don't.",
      "Founded on one idea: clothing should be identity, not decoration.",
    ],
  },
  {
    keywords: ["collection", "drop", "new", "latest", "release"],
    responses: [
      "Three active collections. Night Protocol—essentials. Void Chapter—limited, no restock. Silver Ritual—accessories.",
      "Void Chapter is the one to watch. Limited pieces. When they're gone, that chapter closes.",
      "Night Protocol is our core. The pieces that define the Syndicate uniform.",
    ],
  },
  {
    keywords: ["price", "cost", "expensive", "cheap", "afford", "money", "worth"],
    responses: [
      "Pieces range $95–$450. Every dollar is accounted for in material, cut, and intention.",
      "We don't do sales. The price is the price. Quality doesn't negotiate.",
      "Entry point: Obsidian Beanie at $95. Statement piece: Eclipse Bomber at $450.",
    ],
  },
  {
    keywords: ["material", "fabric", "quality", "cotton", "made"],
    responses: [
      "Heavy-weight cotton. Matte finishes. Silver hardware. Everything is selected, nothing is random.",
      "We source premium. The weight of a Syndicate piece tells you everything.",
    ],
  },
  {
    keywords: ["hello", "hi", "hey", "sup", "yo", "what's up"],
    responses: [
      "Welcome. You're in the right place.",
      "Here. What are you looking for?",
      "Present. Ask away.",
    ],
  },
  {
    keywords: ["thank", "thanks", "appreciate"],
    responses: [
      "Acknowledged.",
      "Always.",
      "That's what I'm here for. Anything else?",
    ],
  },
  {
    keywords: ["bye", "later", "leave", "done", "exit"],
    responses: [
      "Until next time. Move in silence.",
      "The Syndicate remembers. Come back when you're ready.",
      "Gone but not forgotten. See you in the dark.",
    ],
  },
  {
    keywords: ["help", "assist", "support", "question"],
    responses: [
      "I handle products, styling, sizing, shipping, and anything Syndicate. What do you need?",
      "Ask me about pieces, collections, fit, or shipping. I keep it short.",
    ],
  },
  {
    keywords: ["exclusive", "limited", "rare", "sold out", "restock"],
    responses: [
      "Void Chapter doesn't restock. Ever. When a piece sells out, that's it.",
      "We produce in limited runs. Not artificial scarcity—intentional curation.",
      "If it's still available, consider yourself fortunate. Act accordingly.",
    ],
  },
  {
    keywords: ["gift", "present", "someone", "friend"],
    responses: [
      "Void Tee or Obsidian Beanie. Both are strong entry points. If they get it, they're Syndicate.",
      "Eclipse Bomber if you want to make a statement. Shadow Hoodie if they value subtlety.",
    ],
  },
  {
    keywords: ["checkout", "buy", "purchase", "cart", "pay"],
    responses: [
      "Select your piece. Choose your size. We handle the rest. Secure checkout. No friction.",
      "Ready to commit? Good. The Syndicate respects decisiveness.",
    ],
  },
];

const fallbackResponses = [
  "Interesting. But I only speak Syndicate. Try asking about our pieces, style, or shipping.",
  "That's outside my scope. I'm here for products, styling, and orders.",
  "I don't do small talk. Ask me something about the collection.",
  "Redirect: try 'style me' or 'best sellers.' I work better with purpose.",
  "I hear you. But let's keep it to what matters—what are you looking for?",
];

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  const matches = responseMap.filter((entry) =>
    entry.keywords.some((kw) => lower.includes(kw))
  );
  if (matches.length > 0) {
    const best = matches.reduce((a, b) =>
      b.keywords.filter((kw) => lower.includes(kw)).length >
      a.keywords.filter((kw) => lower.includes(kw)).length
        ? b
        : a
    );
    return best.responses[Math.floor(Math.random() * best.responses.length)];
  }
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

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

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = findResponse(msg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, delay);
  };

  const showQuickReplies = messages.length <= 2 && !isTyping;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-secondary border border-border flex items-center justify-center transition-all duration-500 hover:border-foreground/30 group ${isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"}`}
        aria-label="Open Syndicate AI"
      >
        <MessageSquare size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-100px)] bg-background border border-border flex flex-col animate-scale-in shadow-2xl shadow-background/80">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <div>
                <h3 className="text-foreground text-[11px] font-bold tracking-[0.25em] uppercase">{IDENTITY.name}</h3>
                <p className="text-muted-foreground text-[9px] tracking-[0.2em] uppercase mt-0.5">Active · Exclusive Access</p>
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                style={{ animationDuration: "0.3s" }}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed tracking-wide whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-secondary text-foreground"
                      : "bg-transparent border border-border text-silver"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in" style={{ animationDuration: "0.2s" }}>
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

          {/* Quick replies */}
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

          {/* Input */}
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
