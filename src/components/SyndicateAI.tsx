import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Minus } from "lucide-react";

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

type ResponseEntry = { keywords: string[]; responses: string[] };

const responseMap: ResponseEntry[] = [
  {
    keywords: ["best seller", "trending", "popular", "top", "best", "hot"],
    responses: [
      "Shadow Hoodie and Eclipse Bomber. The two pieces members reach for first.",
      "Void Tee is moving quietly. Phantom Cargos not far behind. Members only know.",
      "Eclipse Bomber. $450. The kind of piece that doesn't need a second opinion.",
    ],
  },
  {
    keywords: ["hoodie", "shadow hoodie"],
    responses: [
      "Shadow Hoodie. $280. Heavy cotton, oversized cut. You don't wear it — you vanish into it.",
      "The Shadow Hoodie is the Syndicate default. There's a reason for that.",
    ],
  },
  {
    keywords: ["cargo", "pants", "phantom"],
    responses: [
      "Phantom Cargos. $320. Functional. Silent. Built for after midnight.",
      "Phantom Cargos pair with everything we make. Intentional, not coincidental.",
    ],
  },
  {
    keywords: ["tee", "t-shirt", "void tee"],
    responses: [
      "Void Tee. $140. The mark speaks for itself. You either get it or you don't.",
      "Void Tee is how most members start. The ones who stay, upgrade from there.",
    ],
  },
  {
    keywords: ["bomber", "jacket", "eclipse"],
    responses: [
      "Eclipse Bomber. $450. Silver hardware. Matte shell. It enters the room before you do.",
      "Eclipse Bomber. Limited run. When it's gone, that chapter closes. Not for everyone.",
    ],
  },
  {
    keywords: ["beanie", "hat", "obsidian"],
    responses: [
      "Obsidian Beanie. $95. Low profile. The detail that separates intention from accident.",
      "Obsidian Beanie finishes the look. Subtle but deliberate.",
    ],
  },
  {
    keywords: ["style", "recommend", "outfit", "wear", "combine", "pair", "match", "look", "style me"],
    responses: [
      "Shadow Hoodie. Phantom Cargos. Obsidian Beanie. Full Syndicate uniform. Members only.",
      "Void Tee under Eclipse Bomber. Phantom Cargos. That's the look that doesn't ask permission.",
      "Layer the Shadow Hoodie under the Bomber. Oversized on structured. Tension is presence.",
      "Keep it minimal. Void Tee and dark denim. Let the mark do the talking.",
    ],
  },
  {
    keywords: ["size", "sizing", "fit", "measure", "small", "medium", "large", "xl"],
    responses: [
      "Oversized by design. Between sizes, go down. Trust the cut.",
      "S reads like M. M reads like L. That's intentional. We build for presence.",
    ],
  },
  {
    keywords: ["ship", "delivery", "track", "arrive", "when"],
    responses: [
      "Domestic 3–5 days. International 7–14. Free over $200. Tracking on everything.",
      "Orders move within 24 hours. After that, it's in transit. You'll get tracking.",
    ],
  },
  {
    keywords: ["return", "exchange", "refund"],
    responses: [
      "14 days. Unworn. Tags on. Final sale stays final.",
      "Returns happen. 14-day window, original condition. Reach out to start.",
    ],
  },
  {
    keywords: ["about", "brand", "midnyte", "syndicate", "story", "who made", "founder"],
    responses: [
      "Midnyte Syndicate. Born in silence, not in a boardroom. Not for everyone.",
      "We're not a brand. We're a frequency. You either tune in or you don't.",
      "Built on one principle — clothing is identity, not decoration. After midnight, you understand.",
    ],
  },
  {
    keywords: ["who are you", "what are you", "nyte", "your name", "assistant"],
    responses: [
      "I'm NYTE. Part of the Syndicate. I know the pieces, the fit, the code. Ask me anything that matters.",
      "NYTE. Think of me as your insider. Not support — something closer.",
      "I'm not customer service. I'm the one who knows what you should be wearing.",
    ],
  },
  {
    keywords: ["collection", "drop", "new", "latest", "release"],
    responses: [
      "Night Protocol — the essentials. Void Chapter — limited, no restock. Silver Ritual — accessories that speak quietly.",
      "Void Chapter is the one that disappears. When it sells out, that story ends.",
      "Night Protocol is core. If you're building a Syndicate wardrobe, start there.",
    ],
  },
  {
    keywords: ["price", "cost", "expensive", "cheap", "afford", "money", "worth", "how much"],
    responses: [
      "$95 to $450. Every piece earns its price in material, cut, and intention.",
      "We don't do sales. The price is the price. Quality doesn't negotiate.",
      "Entry: Obsidian Beanie, $95. Statement: Eclipse Bomber, $450. Choose your level.",
    ],
  },
  {
    keywords: ["material", "fabric", "quality", "cotton", "made", "craft"],
    responses: [
      "Heavy-weight cotton. Matte finishes. Silver hardware. Nothing is random here.",
      "Pick up a Syndicate piece. The weight tells you everything you need to know.",
    ],
  },
  {
    keywords: ["hello", "hi", "hey", "sup", "yo", "what's up", "hola"],
    responses: [
      "You're here. Good. What are you looking for.",
      "Present. What do you need.",
      "After midnight. The right time to be here.",
    ],
  },
  {
    keywords: ["thank", "thanks", "appreciate", "gracias"],
    responses: [
      "Acknowledged.",
      "That's what I'm here for.",
      "Always. Move in silence.",
    ],
  },
  {
    keywords: ["bye", "later", "leave", "done", "exit", "adios"],
    responses: [
      "Until next time. After midnight, you know where to find me.",
      "The Syndicate remembers its own.",
      "Gone but not forgotten. Members only.",
    ],
  },
  {
    keywords: ["help", "assist", "support", "question", "can you"],
    responses: [
      "Products, fit, styling, shipping. I keep it tight. What do you need.",
      "I handle what matters. Ask me about pieces, collections, or the code.",
    ],
  },
  {
    keywords: ["exclusive", "limited", "rare", "sold out", "restock", "vip", "member"],
    responses: [
      "Void Chapter doesn't restock. When a piece is gone, that door closes.",
      "Limited runs. Not artificial scarcity — intentional curation. Members only.",
      "If it's still available, consider yourself fortunate. Act accordingly.",
    ],
  },
  {
    keywords: ["gift", "present", "someone", "friend", "birthday"],
    responses: [
      "Void Tee or Obsidian Beanie. If they get it, they belong. If not, that's information too.",
      "Eclipse Bomber for a statement. Shadow Hoodie for someone who values subtlety.",
    ],
  },
  {
    keywords: ["checkout", "buy", "purchase", "cart", "pay", "order"],
    responses: [
      "Select your piece. Choose your size. We handle the rest. No friction.",
      "Decisiveness is respected here. When you're ready, move.",
    ],
  },
  {
    keywords: ["instagram", "social", "follow", "twitter", "contact", "email"],
    responses: [
      "We're on Instagram and X. But the real conversation happens here. After midnight.",
      "contact@midnytesyndicate.com for anything formal. For everything else, I'm here.",
    ],
  },
  {
    keywords: ["love", "fire", "sick", "dope", "cool", "amazing", "hard"],
    responses: [
      "You see it. Not everyone does.",
      "Taste recognized. Now act on it.",
      "You get it. That's rare.",
    ],
  },
  {
    keywords: ["discount", "sale", "promo", "coupon", "code", "deal"],
    responses: [
      "We don't discount. The Syndicate doesn't negotiate value.",
      "No codes. No sales. The price reflects the standard.",
      "If you're looking for deals, this isn't the place. We build for those who understand worth.",
    ],
  },
  {
    keywords: ["compare", "similar", "like", "alternative", "other brand", "off-white", "fear of god", "balenciaga"],
    responses: [
      "We don't compare. Comparisons are for brands that need validation.",
      "There is no alternative. You either wear the Syndicate or you don't.",
    ],
  },
  {
    keywords: ["custom", "personalize", "bespoke", "design"],
    responses: [
      "Not currently. Every piece is designed with one vision. No compromises.",
      "We don't do custom. The design is the design. Take it or leave it.",
    ],
  },
];

const fallbackResponses = [
  "That's outside the code. Ask me about pieces, style, or shipping.",
  "I only speak Syndicate. Try 'best sellers' or 'style me.'",
  "Not tracking that. Redirect — what are you trying to wear.",
  "Interesting energy. But let's keep it to what matters here.",
  "I don't do small talk. Ask me something with intention.",
];

function findResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  const scored = responseMap
    .map((entry) => {
      const matchCount = entry.keywords.filter((kw) => lower.includes(kw)).length;
      const bestMatchLen = Math.max(
        ...entry.keywords.filter((kw) => lower.includes(kw)).map((kw) => kw.length),
        0
      );
      return { entry, matchCount, bestMatchLen };
    })
    .filter((s) => s.matchCount > 0)
    .sort((a, b) => b.bestMatchLen - a.bestMatchLen || b.matchCount - a.matchCount);

  if (scored.length > 0) {
    const responses = scored[0].entry.responses;
    return responses[Math.floor(Math.random() * responses.length)];
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

    const delay = 500 + Math.random() * 700;
    setTimeout(() => {
      const response = findResponse(msg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, delay);
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

            {isTyping && (
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
