import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";

const Drop02 = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
    <section className="px-6 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-4">Scheduled</p>
          <h1 className="text-foreground text-3xl lg:text-5xl font-black tracking-[0.15em] uppercase">Drop 02</h1>
          <div className="h-px bg-border mt-10 max-w-xs" />
        </div>

        <div className="flex flex-col items-center justify-center py-24 lg:py-40 text-center">
          <div className="w-16 h-px bg-accent mb-10" />
          <p className="text-silver-muted text-sm tracking-[0.2em] uppercase">Void Chapter</p>
          <p className="text-muted-foreground text-xs tracking-wide mt-4 max-w-sm leading-relaxed">
            Something is forming. Not ready to be seen yet. When it arrives, it won't wait.
          </p>
          <p className="text-accent text-[10px] tracking-[0.4em] uppercase mt-10">Date pending</p>
          <div className="w-16 h-px bg-accent mt-10" />
        </div>

        <div className="border-t border-border pt-10">
          <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase text-center">
            No previews. No announcements. Pay attention.
          </p>
        </div>
      </div>
    </section>
  </main>
    <Footer />
    <SyndicateAI />
  </>
);

export default Drop02;
