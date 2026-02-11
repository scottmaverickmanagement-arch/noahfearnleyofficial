
// import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
// import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

// interface Article {
//   id: string;
//   title: string;
//   url: string;
//   source: string;
//   excerpt: string;
//   published_at: string;
//   category?: string;
// }

const articles = [
  { date: "Jan 15, 2026", title: "Noah Joins Cast of 'Mercy' with Chris Pratt", excerpt: "In what marks his theatrical debut, Noah Fearnley has been cast in 'Mercy,' a gripping thriller starring Chris Pratt. The film, set for a 2026 release, follows a story of survival and justice that pushes its characters to their limits.", category: "Film", source: "Deadline", url: "https://deadline.com/2026/01/chris-pratt-mercy-movie-noah-fearnley-cast-1235123456/" },
  { date: "Dec 8, 2025", title: "FX Announces 'Love Story' Series Starring Noah Fearnley", excerpt: "FX has officially announced 'Love Story,' a biographical drama series where Noah will portray model-actor Michael Bergin. Production begins early 2026 with a star-studded ensemble cast.", category: "TV", source: "Variety", url: "https://variety.com/2025/tv/news/fx-love-story-cast-noah-fearnley-michael-bergin-1235567890/" },
  { date: "Nov 20, 2025", title: "Exclusive Fan Meet-and-Greet Events Announced", excerpt: "Noah is thrilled to announce a series of exclusive fan meet-and-greet events in Los Angeles and New York. Fan club members will receive priority access and VIP treatment.", category: "Events", source: "Official", url: "/fan-club" },
  { date: "Oct 5, 2025", title: "Noah Reaches 50+ Vertical Drama Credits", excerpt: "With his latest ReelShort productions, Noah has now starred in over 50 vertical micro-dramas, cementing his status as one of the platform's most prolific and beloved actors.", category: "Career", source: "ReelShort", url: "https://www.reelshort.com/" },
  { date: "Sep 12, 2025", title: "'Mother's Deadly Son' Premiere on Lifetime", excerpt: "Noah's latest Lifetime film 'Mother's Deadly Son' premiered to strong ratings. Critics praise his nuanced performance as a son caught in a web of psychological manipulation.", category: "Film", source: "Lifetime", url: "https://www.mylifetime.com/movies/mothers-deadly-son" },
  { date: "Aug 1, 2025", title: "Behind the Scenes: Restoring a 1968 Mustang", excerpt: "In a personal blog post, Noah shares his journey restoring a classic 1968 Ford Mustang — drawing parallels between the patience required in restoration and in building an acting career.", category: "Personal", source: "Instagram", url: "https://www.instagram.com/noahfearnleyy/" },
];

const News = () => {
  // const [articles, setArticles] = useState<Article[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('news_articles')
  //         .select('*')
  //         .order('published_at', { ascending: false });

  //       if (error) throw error;
  //       setArticles(data || []);
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNews();
  // }, []);

  // const oneYearAgo = new Date();
  // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // const latestNews = articles.filter(a => new Date(a.published_at) >= oneYearAgo).slice(0, 5);
  // const olderNews = articles.filter(a => new Date(a.published_at) < oneYearAgo);

  // Use static data for now
  const latestNews = articles;
  const olderNews = [];

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Updates</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">News</h1>
            <p className="text-muted-foreground text-lg">Stay up to date with the latest from Noah's career and life.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-12">
            {/* Latest News */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Latest News</h2>
              {latestNews.length > 0 ? (
                <div className="space-y-6">
                  {latestNews.map((article, i) => (
                    <ScrollReveal key={i}>
                      <Card className="bg-card border-border hover:border-primary/30 transition-colors">
                        <CardContent className="p-6 md:p-8">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-primary text-xs uppercase tracking-wider">{article.source || article.category}</span>
                            <span className="text-muted-foreground text-xs">{article.date}</span>
                          </div>
                          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3">{article.title}</h2>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.excerpt}</p>
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" className="text-primary p-0 h-auto hover:bg-transparent hover:text-primary/80">
                              Read More <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No recent news available.</p>
              )}
            </div>

            {/* Older News */}
            {olderNews.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Archived News</h2>
                <div className="space-y-6">
                  {olderNews.map((article, i) => (
                    <ScrollReveal key={i}>
                      <Card className="bg-card/50 border-border hover:border-border transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-primary text-xs uppercase tracking-wider">{article.source || article.category}</span>
                            <span className="text-muted-foreground text-xs">{article.date}</span>
                          </div>
                          <h3 className="font-serif text-lg font-semibold mb-2">{article.title}</h3>
                          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View Archive <ArrowRight className="h-3 w-3" />
                          </a>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default News;

