import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";

const products = [
  { name: "Shadow Hoodie", price: "$280", image: product1, desc: "Oversized. Heavy cotton. Disappear into it." },
  { name: "Phantom Cargos", price: "$320", image: product2, desc: "Built for the night. Functional. Silent." },
  { name: "Void Tee", price: "$140", image: product3, desc: "Wear the mark. Say nothing." },
  { name: "Eclipse Bomber", price: "$450", image: product4, desc: "" },
  { name: "Obsidian Beanie", price: "$95", image: product5, desc: "" },
];

const FeaturedProducts = () => (
  <section id="products" className="py-24 lg:py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <h2 className="text-xs tracking-[0.3em] uppercase text-silver-muted font-medium">Featured</h2>
        <div className="h-px flex-1 bg-border ml-8" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {products.slice(0, 3).map((product, i) => (
          <div key={product.name} className="group cursor-pointer hover-lift opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={800}
                height={1024}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pt-6 pb-8">
              <h3 className="text-foreground text-sm font-semibold tracking-[0.15em] uppercase">{product.name}</h3>
              <p className="text-muted-foreground text-xs mt-2 tracking-wide leading-relaxed">{product.desc}</p>
              <p className="text-silver-muted text-xs mt-3 tracking-[0.2em]">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
        {products.slice(3).map((product, i) => (
          <div key={product.name} className="group cursor-pointer hover-lift opacity-0 animate-fade-in" style={{ animationDelay: `${(i + 3) * 0.15}s` }}>
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={800}
                height={1024}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pt-6 pb-8">
              <h3 className="text-foreground text-sm font-semibold tracking-[0.15em] uppercase">{product.name}</h3>
              <p className="text-silver-muted text-xs mt-3 tracking-[0.2em]">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
