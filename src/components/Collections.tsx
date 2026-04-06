import col1 from "@/assets/collection-1.jpg";
import col2 from "@/assets/collection-2.jpg";
import col3 from "@/assets/collection-3.jpg";

const collections = [
  { name: "Night Protocol", desc: "Core essentials for the unseen.", image: col1 },
  { name: "Void Chapter", desc: "Limited pieces. No restock.", image: col2 },
  { name: "Silver Ritual", desc: "Accessories that speak without words.", image: col3 },
];

const Collections = () => (
  <section className="py-24 lg:py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <h2 className="text-xs tracking-[0.3em] uppercase text-silver-muted font-medium">Collections</h2>
        <div className="h-px flex-1 bg-border ml-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {collections.map((col, i) => (
          <div key={col.name} className="group cursor-pointer relative overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={col.image}
                alt={col.name}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-all duration-500" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <h3 className="text-foreground text-lg font-bold tracking-[0.15em] uppercase">{col.name}</h3>
              <p className="text-silver-muted text-xs mt-2 tracking-wide">{col.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Collections;
