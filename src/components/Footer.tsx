import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-foreground font-black text-sm tracking-[0.3em] uppercase mb-6">Midnyte Syndicate</h3>
          <p className="text-muted-foreground text-xs leading-relaxed tracking-wide">
            Not for everyone.
          </p>
        </div>
        <div>
          <h4 className="text-silver-muted text-xs tracking-[0.2em] uppercase mb-6">Navigate</h4>
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-xs tracking-wide transition-colors">Shop</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground text-xs tracking-wide transition-colors">About</Link>
            <Link to="/manifesto" className="text-muted-foreground hover:text-foreground text-xs tracking-wide transition-colors">Manifesto</Link>
            <Link to="/shipping" className="text-muted-foreground hover:text-foreground text-xs tracking-wide transition-colors">Shipping</Link>
          </div>
        </div>
        <div>
          <h4 className="text-silver-muted text-xs tracking-[0.2em] uppercase mb-6">Connect</h4>
          <div className="flex flex-col gap-3">
            <span className="text-muted-foreground text-xs tracking-wide">Instagram</span>
            <span className="text-muted-foreground text-xs tracking-wide">Twitter / X</span>
            <span className="text-muted-foreground text-xs tracking-wide">contact@midnytesyndicate.com</span>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground text-xs tracking-[0.15em]">
          © 2026 MIDNYTE SYNDICATE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
