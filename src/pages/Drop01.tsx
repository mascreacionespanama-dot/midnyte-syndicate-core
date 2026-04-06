import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";
import { products } from "@/lib/products";

const Drop01 = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
      <section className="px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 lg:mb-24">
            <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-4">Currently Active</p>
            <h1 className="text-foreground text-3xl lg:text-5xl font-black tracking-[0.15em] uppercase">Drop 01</h1>
            <p className="text-silver-muted text-sm tracking-wide mt-4 max-w-md leading-relaxed">
              Night Protocol. The first wave. Five pieces built for those who move after midnight.
            </p>
            <div className="h-px bg-border mt-10 max-w-xs" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {products.map((product, i) => (
              <Link
                to={`/product/${product.slug}`}
                key={product.slug}
                className="group cursor-pointer hover-lift opacity-0 animate-fade-in block"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-6 pb-8">
                  <h3 className="text-foreground text-sm font-semibold tracking-[0.15em] uppercase">{product.name}</h3>
                  <p className="text-muted-foreground text-xs mt-2 tracking-wide leading-relaxed">{product.tagline}</p>
                  <p className="text-silver-muted text-xs mt-3 tracking-[0.2em]">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 border-t border-border pt-10 flex items-center justify-between">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">Limited availability. No restock.</p>
            <Link to="/drops/archive" className="text-accent text-[10px] tracking-[0.3em] uppercase hover:text-foreground transition-colors">
              View Archive →
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <SyndicateAI />
  </>
);

export default Drop01;
