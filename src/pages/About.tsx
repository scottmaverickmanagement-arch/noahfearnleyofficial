import ScrollReveal from "@/components/ScrollReveal";

const milestones = [
  { year: "1999", title: "Born in Orange, CT", description: "Noah Fearnley is born on June 28, 1999, in Orange, Connecticut. Standing at 6'2\" with an athletic build, brown hair, and striking blue eyes." },
  { year: "2015–16", title: "From Football to Film", description: "A devastating knee injury ends his football aspirations. Noah pivots to modeling, signing with agencies in Miami and Los Angeles, and discovers his passion for acting." },
  { year: "2017–22", title: "Training & Craft", description: "Trains rigorously at Tampa's Actors School, Michael Woolson's On-Camera Course, and Lesly Kahn's Comedy Intensive. Moves to Hollywood to pursue acting full-time." },
  { year: "2023", title: "ReelShort Breakthrough", description: "Begins starring in vertical micro-dramas on ReelShort, quickly building a following with captivating performances across 50+ titles." },
  { year: "2024", title: "TV Debut", description: "Debuts as Sam Hitchens in 'Morgan's Secret Admirer.' Lands leading roles in Lifetime films including 'Black Girl Missing' and 'Mother's Deadly Son.'" },
  { year: "2025–26", title: "Hollywood Calling", description: "Cast in the theatrical film 'Mercy' alongside Chris Pratt, and as Michael Bergin in FX's 'Love Story.' The journey from vertical dramas to the big screen is complete." },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">About</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">The Story So Far</h1>
            <p className="text-muted-foreground text-lg">
              From the football fields of Connecticut to Hollywood's biggest sets — a journey defined by resilience,
              passion, and an unwavering belief that every setback is a setup for a comeback.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "text-right pr-12" : "text-left pl-12"}`}>
                    <span className="text-primary font-serif text-2xl font-bold">{m.year}</span>
                    <h3 className="font-serif text-xl font-semibold mt-1 mb-2">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 mt-2 ring-4 ring-background" />
                  <div className="md:hidden pl-10">
                    <span className="text-primary font-serif text-xl font-bold">{m.year}</span>
                    <h3 className="font-serif text-lg font-semibold mt-1 mb-2">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Beyond the Screen</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Off-screen, Noah is a man of depth and authenticity. Married to Aalayah Buie, he values family above all —
                spending quality time with his brother, sister-in-law, and loved ones. His daily fitness routine reflects the
                discipline that carried him from sports to stardom.
              </p>
              <p>
                A true enthusiast at heart, Noah is in the midst of restoring a 1968 Ford Mustang — a project that mirrors
                his approach to acting: patience, precision, and a reverence for the craft. He believes in soul over
                superficiality, work ethic over shortcuts, and consistency over overnight success.
              </p>
              <p>
                Trained at Tampa's Actors School, Michael Woolson's On-Camera Course, and Lesly Kahn's renowned Comedy
                Intensive, Noah brings a rare combination of formal training and raw natural talent to every role he takes on.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <ScrollReveal>
            <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
              "From football fields to film sets, every setback is a setup for a comeback."
            </blockquote>
            <p className="text-primary mt-6 uppercase tracking-[0.2em] text-sm">— Noah Fearnley</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default About;
