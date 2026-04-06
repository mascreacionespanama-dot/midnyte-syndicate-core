import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Midnyte Syndicate editorial" width={1920} height={1080} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
    </div>
    <div className="relative z-10 text-center px-6 opacity-0 animate-fade-in">
      <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-[0.1em] text-foreground leading-none">
        Wear Silence
      </h1>
      <p className="mt-6 text-sm sm:text-base text-silver-muted tracking-[0.3em] uppercase font-light">
        Not meant for everyone
      </p>
      <a
        href="#products"
        className="inline-block mt-12 px-10 py-4 border border-foreground text-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-foreground hover:text-primary-foreground transition-all duration-500"
      >
        Enter
      </a>
    </div>
  </section>
);

export default HeroSection;
