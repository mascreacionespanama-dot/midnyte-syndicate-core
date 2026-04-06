const FutureDrops = () => (
  <main className="min-h-screen bg-background pt-20 lg:pt-24">
    <section className="px-6 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-4">Unreleased</p>
          <h1 className="text-foreground text-3xl lg:text-5xl font-black tracking-[0.15em] uppercase">Future Drops</h1>
          <div className="h-px bg-border mt-10 max-w-xs" />
        </div>

        <div className="flex flex-col items-center justify-center py-32 lg:py-48 text-center">
          <div className="w-px h-20 bg-accent/30 mb-12" />
          <p className="text-foreground text-lg lg:text-2xl font-bold tracking-[0.2em] uppercase">
            Something is being built
          </p>
          <p className="text-muted-foreground text-xs tracking-wide mt-6 max-w-sm leading-relaxed">
            We don't reveal what's next. We don't tease timelines.
            When it's ready, those paying attention will know first.
          </p>
          <div className="mt-12 border border-border px-8 py-4">
            <p className="text-accent text-[10px] tracking-[0.4em] uppercase">Members only</p>
          </div>
          <div className="w-px h-20 bg-accent/30 mt-12" />
        </div>

        <div className="border-t border-border pt-10 text-center">
          <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">
            The next chapter is already being written. In silence.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default FutureDrops;
