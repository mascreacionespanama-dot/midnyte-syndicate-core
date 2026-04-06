import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-32 lg:pt-48 pb-24 lg:pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.1em] text-foreground mb-12">About</h1>
        <div className="space-y-6 text-silver-muted text-sm leading-relaxed tracking-wide">
          <p>
            Midnyte Syndicate was born in silence. Not in a boardroom. Not from a trend report. 
            From the streets, the shadows, the spaces between what's seen and what's felt.
          </p>
          <p>
            We design for the ones who don't need to explain themselves. Every piece is a statement. 
            Every drop is intentional. We don't chase seasons—we set the tone.
          </p>
          <p>
            This isn't fashion. It's armor. Built for those who move different, think different, 
            and refuse to blend in by trying to stand out.
          </p>
          <p className="text-foreground font-semibold tracking-[0.2em] uppercase text-xs pt-6">
            The Syndicate doesn't recruit. You either belong or you don't.
          </p>
        </div>
      </div>
    </main>
    <Footer />
    <SyndicateAI />
  </div>
);

export default About;
