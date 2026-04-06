import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";

const allProducts = [
  { name: "Shadow Hoodie", price: "$280", image: product1, desc: "Oversized. Heavy cotton. Disappear into it.", collection: "Night Protocol" },
  { name: "Phantom Cargos", price: "$320", image: product2, desc: "Built for the night. Functional. Silent.", collection: "Night Protocol" },
  { name: "Void Tee", price: "$140", image: product3, desc: "Wear the mark. Say nothing.", collection: "Night Protocol" },
  { name: "Eclipse Bomber", price: "$450", image: product4, desc: "Silver hardware. Matte shell. Limited.", collection: "Void Chapter" },
  { name: "Obsidian Beanie", price: "$95", image: product5, desc: "Low profile. Deliberate.", collection: "Silver Ritual" },
];

const Shop = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
    <section className="px-6 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <h1 className="text-foreground text-3xl lg:text-5xl font-black tracking-[0.15em] uppercase">Shop</h1>
          <p className="text-silver-muted text-sm tracking-wide mt-4 max-w-md leading-relaxed">
            Everything currently available. When it's gone, it moves to the Archive.
          </p>
          <div className="h-px bg-border mt-10 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {allProducts.map((product, i) => (
            <div key={product.name} className="group cursor-pointer hover-lift opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
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
                <p className="text-accent text-[9px] tracking-[0.3em] uppercase mb-1">{product.collection}</p>
                <h3 className="text-foreground text-sm font-semibold tracking-[0.15em] uppercase">{product.name}</h3>
                <p className="text-muted-foreground text-xs mt-2 tracking-wide leading-relaxed">{product.desc}</p>
                <p className="text-silver-muted text-xs mt-3 tracking-[0.2em]">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
    <Footer />
    <SyndicateAI />
  </>
);

export default Shop;
