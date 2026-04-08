import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShoppingBag } from "lucide-react";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useShopifyProducts(6);

  if (isLoading) {
    return (
      <section id="products" className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center py-16">
          <div className="w-5 h-5 border border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section id="products" className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-xs tracking-[0.3em] uppercase text-silver-muted font-medium">Featured</h2>
            <div className="h-px flex-1 bg-border ml-8" />
          </div>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-30 mb-4" />
            <p className="text-foreground text-sm tracking-[0.2em] uppercase">No products yet</p>
            <p className="text-muted-foreground text-xs tracking-wide mt-2">The first drop is coming.</p>
          </div>
        </div>
      </section>
    );
  }

  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3);

  return (
    <section id="products" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-xs tracking-[0.3em] uppercase text-silver-muted font-medium">Featured</h2>
          <div className="h-px flex-1 bg-border ml-8" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {firstRow.map((product, i) => (
            <Link
              to={`/product/${product.node.handle}`}
              key={product.node.id}
              className="group cursor-pointer hover-lift opacity-0 animate-fade-in block"
              style={{ animationDelay: `${i * 0.15}s` }}
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
        {secondRow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
            {secondRow.map((product, i) => (
              <Link
                to={`/product/${product.node.handle}`}
                key={product.node.id}
                className="group cursor-pointer hover-lift opacity-0 animate-fade-in block"
                style={{ animationDelay: `${(i + 3) * 0.15}s` }}
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
                  <p className="text-silver-muted text-xs mt-3 tracking-[0.2em]">
                    {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
