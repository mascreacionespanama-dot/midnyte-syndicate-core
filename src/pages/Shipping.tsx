import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";

const Shipping = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-32 lg:pt-48 pb-24 lg:pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.1em] text-foreground mb-12">Shipping</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-foreground text-sm font-bold tracking-[0.2em] uppercase mb-4">Domestic</h2>
            <p className="text-silver-muted text-sm leading-relaxed tracking-wide">
              Free shipping on all orders over $200. Standard delivery: 3–5 business days. 
              Express available at checkout for 1–2 business days.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <h2 className="text-foreground text-sm font-bold tracking-[0.2em] uppercase mb-4">International</h2>
            <p className="text-silver-muted text-sm leading-relaxed tracking-wide">
              We ship worldwide. International orders: 7–14 business days. 
              Duties and taxes are the responsibility of the buyer. Tracking provided on all orders.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <h2 className="text-foreground text-sm font-bold tracking-[0.2em] uppercase mb-4">Returns</h2>
            <p className="text-silver-muted text-sm leading-relaxed tracking-wide">
              14-day return window. Items must be unworn, unwashed, with original tags attached. 
              Final sale items are non-returnable. Contact us to initiate a return.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <h2 className="text-foreground text-sm font-bold tracking-[0.2em] uppercase mb-4">Order Issues</h2>
            <p className="text-silver-muted text-sm leading-relaxed tracking-wide">
              For damaged, lost, or incorrect items, contact contact@midnytesyndicate.com within 48 hours of delivery. 
              We'll resolve it.
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    <SyndicateAI />
  </div>
);

export default Shipping;
