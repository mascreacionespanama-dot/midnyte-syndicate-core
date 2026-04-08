import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShoppingBag } from "lucide-react";

const Drop01 = () => {
  const { data: products, isLoading } = useShopifyProducts(20);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 lg:pt-24">
        <section className="px-6 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 lg:mb-24">
              <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-4">Currently Active</p>
              <h1 className="text-foreground text-3xl lg:text-5xl font-black tracking-[0.15em] uppercase">Drop 01</h1>
              <p className="text-silver-muted text-sm tracking-wide mt-4 max-w-md leading-relaxed">
                Night Protocol. The first wave. Built for those who move after midnight.
              </p>
              <div className="h-px bg-border mt-10 max-w-xs" />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="w-5 h-5 border border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : !products || products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-30 mb-4" />
                <p className="text-foreground text-sm tracking-[0.2em] uppercase">No products found</p>
                <p className="text-muted-foreground text-xs tracking-wide mt-2">The drop is loading.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {products.map((product, i) => (
                  <Link
                    to={`/product/${product.node.handle}`}
                    key={product.node.id}
                    className="group cursor-pointer hover-lift opacity-0 animate-fade-in block"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-secondary">
                      {product.node.images.edges[0] && (
                        <img
                          src={product.node.images.edges[0].node.url}
                          alt={product.node.images.edges[0].node.altText || product.node.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="pt-6 pb-8">
                      <h3 className="text-foreground text-sm font-semibold tracking-[0.15em] uppercase">{product.node.title}</h3>
                      <p className="text-muted-foreground text-xs mt-2 tracking-wide leading-relaxed line-clamp-2">{product.node.description}</p>
                      <p className="text-silver-muted text-xs mt-3 tracking-[0.2em]">
                        {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

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
};

export default Drop01;
