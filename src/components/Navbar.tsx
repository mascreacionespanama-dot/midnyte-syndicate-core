import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";

const dropsLinks = [
  { to: "/drops/01", label: "Drop 01", note: "Active" },
  { to: "/drops/02", label: "Drop 02", note: "Scheduled" },
  { to: "/drops/archive", label: "Archive", note: "" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropsOpen, setDropsOpen] = useState(false);
  const [mobileDropsOpen, setMobileDropsOpen] = useState(false);
  const dropsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropsRef.current && !dropsRef.current.contains(e.target as Node)) {
        setDropsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinkClass = "text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300";
  const mobileLinkClass = "text-muted-foreground hover:text-foreground text-sm tracking-[0.2em] uppercase transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="text-foreground font-black text-lg tracking-[0.3em] uppercase">
            Midnyte Syndicate
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className={navLinkClass}>Home</Link>
            <Link to="/shop" className={navLinkClass}>Shop</Link>

            {/* Drops Dropdown */}
            <div ref={dropsRef} className="relative">
              <button
                onClick={() => setDropsOpen(!dropsOpen)}
                className={`${navLinkClass} flex items-center gap-1`}
              >
                Drops
                <ChevronDown size={10} className={`transition-transform duration-300 ${dropsOpen ? "rotate-180" : ""}`} />
              </button>

              {dropsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-card border border-border animate-fade-in">
                  {dropsLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setDropsOpen(false)}
                      className="flex items-center justify-between px-5 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <span className="text-[11px] tracking-[0.15em] uppercase">{link.label}</span>
                      {link.note && (
                        <span className="text-accent text-[8px] tracking-[0.2em] uppercase">{link.note}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/future-drops" className={navLinkClass}>Future Drops</Link>
            <Link to="/about" className={navLinkClass}>About</Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-6">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Shop</Link>

            {/* Mobile Drops Accordion */}
            <button
              onClick={() => setMobileDropsOpen(!mobileDropsOpen)}
              className={`${mobileLinkClass} flex items-center gap-2`}
            >
              Drops
              <ChevronDown size={12} className={`transition-transform duration-300 ${mobileDropsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileDropsOpen && (
              <div className="flex flex-col gap-4 pl-4 border-l border-border animate-fade-in">
                {dropsLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => { setIsOpen(false); setMobileDropsOpen(false); }}
                    className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
                  >
                    {link.label}
                    {link.note && <span className="text-accent text-[8px] tracking-[0.2em]">({link.note})</span>}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/future-drops" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Future Drops</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={mobileLinkClass}>About</Link>
            <Link to="/manifesto" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Manifesto</Link>
            <Link to="/shipping" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Shipping</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
