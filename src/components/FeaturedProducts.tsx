import { Link } from "react-router-dom";
import { products } from "@/lib/products";

const FeaturedProducts = () => (
  <section id="products" className="py-24 lg:py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <h2 className="text-xs tracking-[0.3em] uppercase text-silver-muted font-medium">Featured</h2>
        <div className="h-px flex-1 bg-border ml-8" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {products.slice(0, 3).map((product, i) => (
          <Link
            to={`/product/${product.slug}`}
            key={product.slug}
            className="group cursor-pointer hover-lift opacity-0 animate-fade-in block"
            style={{ animationDelay: `${i * 0.15}s` }}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
        {products.slice(3).map((product, i) => (
          <Link
            to={`/product/${product.slug}`}
            key={product.slug}
            className="group cursor-pointer hover-lift opacity-0 animate-fade-in block"
            style={{ animationDelay: `${(i + 3) * 0.15}s` }}
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
              <p className="text-silver-muted text-xs mt-3 tracking-[0.2em]">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
