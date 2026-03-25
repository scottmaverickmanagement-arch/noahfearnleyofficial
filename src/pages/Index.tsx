import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import { useSEO } from "@/hooks/useSEO";
import heroImage from "@/assets/hero-updated.jpg"; // User-specified hero image from GitHub

import loveStoryPoster from "@/assets/posters/love-story-poster.jpg";
import loveStoryVideo from "@/assets/videos/love-story-trailer.mp4";

const newsPreview = [
  { date: "Mar 24, 2026", title: "'Love Story' Season Finale Airs March 26th", excerpt: "Don't miss the gripping season finale of FX's 'Love Story' this Thursday. Noah's performance as Michael Bergin has been hailed as career-defining." },
  { date: "Mar 22, 2026", title: "Noah Partners with Local Youth Theatre", excerpt: "Noah is giving back to his roots in Orange, CT, by hosting acting workshops for young aspiring performers this summer." },
  { date: "Mar 16, 2026", title: "Recap: Fans Gather for Exclusive LA Meet & Greet", excerpt: "A huge thank you to everyone who joined Noah in LA on March 15th! It was an incredible afternoon of connecting with the fan club community." },
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useSEO({
    title: "Noah Fearnley Official Website – Vertical Dramas, Movies & Love Story",
    description: "Welcome to the official website of actor Noah Fearnley. Explore his latest projects like 'Love Story,' iconic vertical dramas, and connect with his fan club."
  });

  return (
    <>
      {/* Fixed Hero Background */}
      <div className="fixed inset-0 -z-50">
        <img src={heroImage} alt="Noah Fearnley - Official Actor Website Hero" className="w-full h-full object-cover" />
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
              performances in micro-dramas, TV movies, and upcoming blockbusters. Backed by a strong support system including
              his best friend fellow actor Arnold Fabian, Noah's journey is one of resilience, passion, and undeniable talent.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Promo Blocks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors h-full relative">
                <div className="aspect-[2/3] md:aspect-[16/9] relative overflow-hidden bg-black">
                  {/* Poster Image */}
                  <img
                    src={loveStoryPoster}
                    alt="Noah Fearnley in Love Story (2026) - Official Poster"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-0 transition-opacity"
                  />
                  
                  {/* Hover/Click Video */}
                  <video
                    src={loveStoryVideo}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                    loop
                    playsInline
                    onMouseOver={(e) => {
                      e.currentTarget.play().catch(err => {
                        console.log("Autoplay with sound blocked:", err);
                        // Fallback to muted if blocked
                        e.currentTarget.muted = true;
                        e.currentTarget.play();
                      });
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(loveStoryVideo);
                    }}
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
                <CardContent className="p-6">
                  <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2 font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Trending 2026 Series
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-3">Love Story</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Noah stars as Michael Bergin in the highly anticipated FX biographical series 'Love Story,' exploring the 
                    iconic and tragic romance of John F. Kennedy Jr. and Carolyn Bessette.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="https://www.fxnetworks.com/shows/american-love-story" target="_blank" rel="noopener noreferrer">
                      Official FX Site <ArrowRight className="ml-2 h-3 w-3" />
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
                            alt={`Noah Fearnley in ${drama.title} - Vertical Drama Poster`}
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
      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[80vw] p-0 bg-black border-none overflow-hidden">
          <div className="aspect-video w-full">
            <video
              src={selectedVideo || ""}
              className="w-full h-full"
              controls
              autoPlay
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
