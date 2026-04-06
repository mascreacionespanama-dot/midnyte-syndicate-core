import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";

const Manifesto = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-32 lg:pt-48 pb-24 lg:pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.1em] text-foreground mb-16">Manifesto</h1>
        <div className="space-y-8 text-lg sm:text-xl leading-relaxed tracking-wide">
          <p className="text-foreground font-light">We are the ones who walk when others run.</p>
          <p className="text-silver-muted font-light">We choose silence over noise.</p>
          <p className="text-silver-muted font-light">We wear darkness not to hide—but to be seen on our own terms.</p>
          <p className="text-muted-foreground font-light">Every thread is a decision. Every stitch, a conviction.</p>
          <p className="text-muted-foreground font-light">We don't ask for attention. We command it.</p>
          <p className="text-foreground font-semibold mt-12">
            This is not clothing.<br />
            This is code.<br />
            This is identity.<br />
            This is Midnyte Syndicate.
          </p>
        </div>
      </div>
    </main>
    <Footer />
    <SyndicateAI />
  </div>
);

export default Manifesto;
