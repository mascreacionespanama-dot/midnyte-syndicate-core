import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="text-foreground font-black text-lg tracking-[0.3em] uppercase">
            Midnyte Syndicate
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300">
              Shop
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300">
              About
            </Link>
            <Link to="/manifesto" className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300">
              Manifesto
            </Link>
            <Link to="/shipping" className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300">
              Shipping
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground text-sm tracking-[0.2em] uppercase transition-colors">Shop</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground text-sm tracking-[0.2em] uppercase transition-colors">About</Link>
            <Link to="/manifesto" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground text-sm tracking-[0.2em] uppercase transition-colors">Manifesto</Link>
            <Link to="/shipping" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground text-sm tracking-[0.2em] uppercase transition-colors">Shipping</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
