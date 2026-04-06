import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";
import col1 from "@/assets/collection-1.jpg";
import col2 from "@/assets/collection-2.jpg";
import col3 from "@/assets/collection-3.jpg";

const archivedDrops = [
  {
    name: "Genesis Protocol",
    season: "Pre-Season",
    pieces: 3,
    image: col1,
    status: "Sold Out",
  },
  {
    name: "Silent Formation",
    season: "FW24",
    pieces: 4,
    image: col2,
    status: "Sold Out",
  },
  {
    name: "First Light",
    season: "SS24",
    pieces: 2,
    image: col3,
    status: "Closed",
  },
];

const Archive = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
    <section className="px-6 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-4">Past Releases</p>
          <h1 className="text-foreground text-3xl lg:text-5xl font-black tracking-[0.15em] uppercase">Archive</h1>
          <p className="text-silver-muted text-sm tracking-wide mt-4 max-w-md leading-relaxed">
            What came before. These chapters are closed. The pieces had their moment.
          </p>
          <div className="h-px bg-border mt-10 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {archivedDrops.map((drop, i) => (
            <div
              key={drop.name}
              className="group relative overflow-hidden opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={drop.image}
                  alt={drop.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:opacity-80 group-hover:grayscale-[50%]"
                />
                <div className="absolute inset-0 bg-background/60" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent text-[9px] tracking-[0.3em] uppercase">{drop.season}</span>
                  <span className="text-muted-foreground text-[9px] tracking-[0.2em] uppercase">· {drop.status}</span>
                </div>
                <h3 className="text-foreground text-lg font-bold tracking-[0.15em] uppercase">{drop.name}</h3>
                <p className="text-silver-muted text-xs mt-2 tracking-wide">{drop.pieces} pieces</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-10 text-center">
          <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">
            A record, not a store. These pieces don't come back.
          </p>
        </div>
      </div>
    </section>
  </main>
    <Footer />
    <SyndicateAI />
  </>
);

export default Archive;
