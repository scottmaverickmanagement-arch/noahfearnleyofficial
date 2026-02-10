import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import heroImage from "@/assets/hero-updated.jpg"; // User-specified hero image from GitHub

import mercyPoster from "@/assets/posters/mercy-2026.jpg";

const newsPreview = [
  { date: "Jan 15, 2026", title: "Noah Joins Cast of 'Mercy' with Chris Pratt", excerpt: "Exciting news as Noah lands a role alongside Chris Pratt in the highly anticipated thriller 'Mercy,' set for theatrical release in 2026." },
  { date: "Dec 8, 2025", title: "FX Announces 'Love Story' Series", excerpt: "Noah has been cast as Michael Bergin in the upcoming FX drama series 'Love Story,' a gripping biographical series." },
  { date: "Nov 20, 2025", title: "Upcoming Fan Meet-and-Greet Events", excerpt: "Get ready for exclusive meet-and-greet events in Los Angeles and New York. Fan club members get priority access." },
];

import verticalPlaceholder from "@/assets/posters/vertical-placeholder.jpg";

const verticalDramasPreview = [
  { title: "Oops! I Married My Enemy", image: verticalPlaceholder },
  { title: "Forbidden Affair with My Husband", image: verticalPlaceholder },
  { title: "Royal Heir Breaks My Heart", image: verticalPlaceholder },
  { title: "All I Want Is You", image: verticalPlaceholder },
  { title: "Love by Contract", image: verticalPlaceholder },
  { title: "Escorting the Heiress", image: verticalPlaceholder },
];

const Index = () => {
  return (
    <>
      {/* Fixed Hero Background */}
      <div className="fixed inset-0 -z-50">
        <img src={heroImage} alt="Noah Fearnley" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      {/* Hero Content */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Removed local image background */}
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

      {/* Intro (About) */}
      <section className="py-24 relative overflow-hidden">
        <BackgroundSlideshow className="opacity-40" overlayOpacity={0.8} />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
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
              <Card className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors h-full">
                <div className="aspect-[2/3] md:aspect-[16/9] relative overflow-hidden">
                  <img
                    src={mercyPoster}
                    alt="Mercy Movie Poster"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <CardContent className="p-6">
                  <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">Coming 2026</p>
                  <h3 className="font-serif text-2xl font-bold mb-3">Mercy</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Noah's theatrical debut alongside Chris Pratt in this gripping thriller. A story of survival, justice,
                    and the lengths one will go to protect what matters most.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="https://www.imdb.com/title/tt31193158/" target="_blank" rel="noopener noreferrer">
                      View on IMDB <ArrowRight className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="bg-card border-border overflow-hidden hover:border-primary/30 transition-colors h-full">
                <div className="aspect-[16/9] bg-gradient-to-br from-muted to-secondary p-6 overflow-hidden relative group">
                  {/* Vertical Posters Grid */}
                  <div className="grid grid-cols-3 gap-2 h-full opacity-60 group-hover:opacity-80 transition-opacity">
                    {verticalDramasPreview.map((drama, i) => (
                      <Link key={i} to="/filmography" className="block h-full">
                        <div className="rounded overflow-hidden relative aspect-[3/4] hover:ring-2 hover:ring-primary/50 transition-all h-full">
                          <img
                            src={drama.image}
                            alt={drama.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-[6px] md:text-[8px] text-white/90 text-center px-1 font-medium leading-tight">{drama.title}</span>
                          </div>
                        </div>
                      </Link>
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

      {/* CTA (Fan Club) */}
      <section className="py-24 relative overflow-hidden">
        <BackgroundSlideshow className="opacity-40" overlayOpacity={0.7} />
        <div className="container mx-auto px-4 text-center relative z-10">
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
