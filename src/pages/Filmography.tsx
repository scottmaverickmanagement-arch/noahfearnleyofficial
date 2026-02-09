import { Film } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const verticalDramas = [
  { title: "Escorting the Heiress", role: "Lead", platform: "ReelShort", desc: "A bodyguard falls into a dangerous game of loyalty and desire while protecting a billionaire's daughter." },
  { title: "Fade Till the End", role: "Lead", platform: "ReelShort", desc: "A haunting love story that blurs the line between memory and reality." },
  { title: "Virgin's Bucket List", role: "Lead", platform: "ReelShort", desc: "A coming-of-age comedy-drama about living life to the fullest before it's too late." },
  { title: "Gold Hearts of Hot Rod County", role: "Zack", platform: "ReelShort", desc: "A raw, emotional portrayal in a rural drama about love, loss, and redemption." },
  { title: "Rivals Getting Married", role: "Lead", platform: "ReelShort", desc: "Two rivals forced into an unexpected alliance — and an even more unexpected romance." },
  { title: "AI Robot Chef", role: "Lead", platform: "ReelShort", desc: "A futuristic comedy about a chef competing against an AI in the kitchen." },
  { title: "Morgan's Secret Admirer", role: "Sam Hitchens", platform: "TV Series", desc: "Noah's breakout TV debut as the mysterious Sam Hitchens in this gripping drama series." },
  { title: "The Billionaire's Contract Wife", role: "Lead", platform: "ReelShort", desc: "A high-stakes drama of power, contracts, and unexpected love." },
  { title: "Midnight in Manhattan", role: "Lead", platform: "ReelShort", desc: "One night in New York City changes everything for two strangers." },
  { title: "The CEO's Secret Baby", role: "Lead", platform: "ReelShort", desc: "A powerful executive discovers a secret that turns his world upside down." },
];

const tvFilms = [
  { title: "Black Girl Missing", role: "Lead", platform: "Lifetime", year: "2024", desc: "A gripping Lifetime original about the search for a missing young woman and the systemic issues that complicate the investigation.", cast: "Noah Fearnley, ensemble cast" },
  { title: "Mother's Deadly Son", role: "Lead", platform: "Lifetime", year: "2024", desc: "A psychological thriller exploring the dark side of a mother-son relationship when secrets unravel.", cast: "Noah Fearnley, ensemble cast" },
  { title: "Mercy", role: "Supporting", platform: "Theatrical", year: "2026", desc: "A high-octane thriller alongside Chris Pratt. Noah's theatrical debut in a story of survival and justice.", cast: "Chris Pratt, Noah Fearnley" },
  { title: "Love Story", role: "Michael Bergin", platform: "FX", year: "2025–26", desc: "A biographical drama series for FX. Noah portrays model-actor Michael Bergin in this compelling narrative.", cast: "Noah Fearnley, ensemble cast" },
];

const Filmography = () => {
  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Career</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Filmography</h1>
            <p className="text-muted-foreground text-lg">
              From 50+ vertical dramas to Hollywood blockbusters — a growing body of work that showcases Noah's range and dedication.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="vertical" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-12 bg-secondary">
              <TabsTrigger value="vertical">Vertical Dramas</TabsTrigger>
              <TabsTrigger value="tv">TV & Films</TabsTrigger>
              <TabsTrigger value="modeling">Modeling</TabsTrigger>
            </TabsList>

            <TabsContent value="vertical">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {verticalDramas.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <Card className="bg-card border-border hover:border-primary/30 transition-colors h-full">
                      <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                        <Film className="h-10 w-10 text-primary/30" />
                      </div>
                      <CardContent className="p-5">
                        <p className="text-primary text-xs uppercase tracking-wider mb-1">{item.platform}</p>
                        <h3 className="font-serif text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">as {item.role}</p>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tv">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {tvFilms.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <Card className="bg-card border-border hover:border-primary/30 transition-colors h-full">
                      <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                        <Film className="h-12 w-12 text-primary/30" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-primary text-xs uppercase tracking-wider">{item.platform}</span>
                          <span className="text-muted-foreground text-xs">• {item.year}</span>
                        </div>
                        <h3 className="font-serif text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">as {item.role} — {item.cast}</p>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="modeling">
              <div className="max-w-2xl mx-auto text-center">
                <ScrollReveal>
                  <div className="bg-card border border-border rounded-lg p-8">
                    <h3 className="font-serif text-2xl font-bold mb-4">Early Modeling Career</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Before transitioning to acting, Noah built a successful modeling career in Miami and Los Angeles. Signed
                      with top agencies, he gained valuable experience in front of the camera that would later inform his natural,
                      compelling on-screen presence. His modeling work spanned commercial, print, and runway — laying the
                      groundwork for the versatile performer he would become.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Filmography;
