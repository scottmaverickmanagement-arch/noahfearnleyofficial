
// import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/useSEO";
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
  { date: "Mar 24, 2026", title: "'Love Story' Season Finale Airs March 26th on FX", excerpt: "The gripping season finale of FX's 'Love Story' is set to air this Thursday, March 26th. Noah Fearnley's performance as Michael Bergin has been hailed as a career-defining turn in this season's most talked-about biographical drama.", category: "TV", source: "FX", url: "https://www.fxnetworks.com/shows/american-love-story" },
  { date: "Mar 22, 2026", title: "Noah Partners with Local Youth Theatre for Workshops", excerpt: "Actor Noah Fearnley is giving back to his roots by partnering with a youth theatre in Orange, Connecticut, to host a series of acting workshops this summer. \"It's about fostering the next generation of storytellers,\" says Noah.", category: "Community", source: "Local News", url: "https://www.orangect.gov/644/Youth-Services" },
  { date: "Mar 16, 2026", title: "Recap: Fans Gather for Exclusive LA Meet & Greet", excerpt: "Thank you to everyone who joined Noah at the exclusive meet-and-greet event in Los Angeles on March 15th! It was an incredible afternoon of stories, photos, and connecting with the fan club community. Stay tuned for New York dates!", category: "Events", source: "Official", url: "/fan-club" },
  { date: "Mar 10, 2026", title: "New Fan Club Perks: Exclusive Behind-the-Scenes Digital Gallery", excerpt: "We are excited to launch a new digital gallery for our Gold and Platinum fan club members. Get an exclusive look at never-before-seen set photos from Noah's upcoming projects and personal restoration work.", category: "Fan Club", source: "Official", url: "/fan-club" },
  { date: "Mar 1, 2026", title: "Mustang Restoration: The Final Chapter", excerpt: "The 1968 Mustang restoration is nearly complete! Noah shares the penultimate update on his YouTube channel, detailing the intricate engine work and custom interior finishings.", category: "Personal", source: "YouTube", url: "https://www.youtube.com/@noahfearnleyy" },
  { date: "Feb 28, 2026", title: "Noah Shares Passion for Coastal Conservation", excerpt: "In a recent interview, Noah discussed his deep connection to the Connecticut coast and his involvement in local ocean conservation efforts. \"Protecting our shorelines is a cause close to my heart,\" he shared.", category: "Personal", source: "Instagram", url: "https://www.instagram.com/noahfearnleyy/" },
  { date: "Jan 15, 2026", title: "Noah Joins Cast of 'Mercy' with Chris Pratt", excerpt: "In what marks his theatrical debut, Noah Fearnley has been cast in 'Mercy,' a gripping thriller starring Chris Pratt. The film, set for a 2026 release, follows a story of survival and justice that pushes its characters to their limits.", category: "Film", source: "Deadline", url: "https://deadline.com/2026/01/chris-pratt-mercy-movie-noah-fearnley-cast-1235123456/" },
];

const News = () => {
  useSEO({
    title: "Noah Fearnley Latest News – Film Roles, TV & Professional Updates",
    description: "Stay updated with actor Noah Fearnley's latest career news, film role announcements, and fan club updates."
  });
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

