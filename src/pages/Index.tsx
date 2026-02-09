import { Link } from "react-router-dom";
import { ArrowRight, Play, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import heroImage from "@/assets/hero.jpg";

const newsPreview = [
  { date: "Jan 15, 2026", title: "Noah Joins Cast of 'Mercy' with Chris Pratt", excerpt: "Exciting news as Noah lands a role alongside Chris Pratt in the highly anticipated thriller 'Mercy,' set for theatrical release in 2026." },
  { date: "Dec 8, 2025", title: "FX Announces 'Love Story' Series", excerpt: "Noah has been cast as Michael Bergin in the upcoming FX drama series 'Love Story,' a gripping biographical series." },
  { date: "Nov 20, 2025", title: "Upcoming Fan Meet-and-Greet Events", excerpt: "Get ready for exclusive meet-and-greet events in Los Angeles and New York. Fan club members get priority access." },
];

const dramaCards = [
  "Escorting the Heiress",
  "Fade Till the End",
  "Virgin's Bucket List",
  "Gold Hearts of Hot Rod County",
  "Rivals Getting Married",
  "AI Robot Chef",
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Noah Fearnley" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Welcome to the Official Website of</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6">Noah Fearnley</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Rising Actor | From Vertical Dramas to Hollywood Screens
            </p>
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/fan-club">
                Join the Exclusive Fan Club <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Noah Fearnley, the charismatic actor from Orange, Connecticut, is captivating audiences with his versatile
              performances in micro-dramas, TV movies, and upcoming blockbusters. From ReelShort hits to Hollywood's
              biggest screens, Noah's journey is one of resilience, passion, and undeniable talent.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Promo Blocks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
                <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <Film className="h-16 w-16 text-primary/40" />
                </div>
                <CardContent className="p-6">
                  <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">Coming 2026</p>
                  <h3 className="font-serif text-2xl font-bold mb-3">Mercy</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Noah's theatrical debut alongside Chris Pratt in this gripping thriller. A story of survival, justice,
                    and the lengths one will go to protect what matters most.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/filmography">Learn More <ArrowRight className="ml-2 h-3 w-3" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="bg-card border-border overflow-hidden hover:border-primary/30 transition-colors">
                <div className="aspect-[16/9] bg-gradient-to-br from-muted to-secondary p-6 overflow-hidden">
                  <div className="grid grid-cols-3 gap-2 h-full">
                    {dramaCards.map((title) => (
                      <div key={title} className="bg-background/50 rounded flex items-center justify-center p-2">
                        <span className="text-[10px] text-muted-foreground text-center leading-tight">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">50+ Titles</p>
                  <h3 className="font-serif text-2xl font-bold mb-3">Vertical Dramas</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    From ReelShort sensations to unforgettable micro-drama performances — explore Noah's extensive catalog
                    of captivating short-form storytelling.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/filmography">Watch Highlights <Play className="ml-2 h-3 w-3" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Latest News</h2>
              <Button variant="ghost" asChild>
                <Link to="/news" className="text-primary">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsPreview.map((article, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Card className="bg-card border-border hover:border-primary/30 transition-colors h-full">
                  <CardContent className="p-6">
                    <p className="text-primary text-xs uppercase tracking-wider mb-3">{article.date}</p>
                    <h3 className="font-serif text-lg font-semibold mb-3">{article.title}</h3>
                    <p className="text-muted-foreground text-sm">{article.excerpt}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Be Part of the Journey</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join the exclusive fan club for behind-the-scenes access, meet-and-greets, VIP events, and more.
            </p>
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/fan-club">Join Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;
