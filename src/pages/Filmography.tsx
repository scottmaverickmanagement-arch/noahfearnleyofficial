import { useState } from "react";
import { Film, Play, Tv, Smartphone, MonitorPlay } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

// Import posters
// Movies
import wrongCheer from "@/assets/posters/the-wrong-cheer-captain.jpg";
import infamously from "@/assets/posters/infamously-in-love.jpg";
import dognapped from "@/assets/posters/dognapped.jpg";
import mothersDeadly from "@/assets/posters/mothers-deadly-son.jpg";
import secrets from "@/assets/posters/secrets-in-the-building.jpg";
import blackGirl from "@/assets/posters/black-girl-missing.jpg";
import lifeguard from "@/assets/posters/a-lifeguards-obsession.jpg";
import mercy from "@/assets/posters/mercy-2026.jpg";

// TV Series
import doctorOdyssey from "@/assets/posters/doctor-odyssey.avif";
import billionaireSurrogate from "@/assets/posters/call-for-billionaires-surrogate.avif";
import unwantedBride from "@/assets/posters/the-back-of-the-unwanted-bride.avif";
import fatedAlpha from "@/assets/posters/fated-to-the-alpha.avif";
import americanLove from "@/assets/posters/american-love-story.jpg";

// Vertical Films - Using single placeholder for all as requested
import verticalPlaceholder from "@/assets/posters/vertical-placeholder.jpg";

interface Project {
  title: string;
  role: string;
  year: string;
  image: string;
  streamLink: string;
  trailerLink: string;
  desc?: string;
  platform?: string;
}

const movies: Project[] = [
  {
    title: "Mercy",
    role: "Tattooed Sleazebag",
    year: "2026",
    image: mercy,
    streamLink: "https://www.imdb.com/title/tt21235248/", // Placeholder for theatrical released
    trailerLink: "https://www.youtube.com/results?search_query=Mercy+2026+trailer",
    desc: "Theatrical Release Film"
  },
  {
    title: "A Lifeguard's Obsession",
    role: "Cade Kerrigan",
    year: "2023",
    image: lifeguard,
    streamLink: "https://tubitv.com/movies/100005831/a-lifeguard-s-obsession",
    trailerLink: "https://www.youtube.com/results?search_query=A+Lifeguard%27s+Obsession+trailer"
  },
  {
    title: "Black Girl Missing",
    role: "Ian / Charlie",
    year: "2023",
    image: blackGirl,
    streamLink: "https://www.mylifetime.com/movies/black-girl-missing",
    trailerLink: "https://www.youtube.com/results?search_query=Black+Girl+Missing+trailer"
  },
  {
    title: "Secrets in the Building",
    role: "Aiden",
    year: "2022",
    image: secrets,
    streamLink: "https://www.amazon.com/Secrets-Building-Shelli-Boone/dp/B0B8TMSJK2",
    trailerLink: "https://www.youtube.com/results?search_query=Secrets+in+the+Building+trailer"
  },
  {
    title: "Mother's Deadly Son",
    role: "Jacob",
    year: "2022",
    image: mothersDeadly,
    streamLink: "https://res.cloudinary.com/", // Placeholder
    trailerLink: "https://www.youtube.com/results?search_query=Mother%27s+Deadly+Son+trailer"
  },
  {
    title: "Dognapped: Hound for the Holidays",
    role: "Jonathan",
    year: "2022",
    image: dognapped,
    streamLink: "https://www.amazon.com/Dognapped-Hound-Holidays-Sara-Ball/dp/B0B65XNZ3Q",
    trailerLink: "https://www.youtube.com/results?search_query=Dognapped+Hound+for+the+Holidays+trailer"
  },
  {
    title: "Infamously in Love",
    role: "Becker",
    year: "2022",
    image: infamously,
    streamLink: "https://www.amazon.com/Infamously-Love-Jennifer-Freeman/dp/B0B8TD8N7L",
    trailerLink: "https://www.youtube.com/results?search_query=Infamously+in+Love+trailer"
  },
  {
    title: "The Wrong Cheer Captain",
    role: "Shane",
    year: "2021",
    image: wrongCheer,
    streamLink: "https://www.mylifetime.com/movies/the-wrong-cheer-captain",
    trailerLink: "https://www.youtube.com/results?search_query=The+Wrong+Cheer+Captain+trailer"
  }
];

const tvSeries: Project[] = [
  {
    title: "American Love Story",
    role: "Michael Bergin",
    year: "2026",
    image: americanLove,
    streamLink: "https://www.fxnetworks.com/",
    trailerLink: "https://www.youtube.com/results?search_query=American+Love+Story+Ryan+Murphy+trailer"
  },
  {
    title: "Doctor Odyssey",
    role: "Valet",
    year: "2024",
    image: doctorOdyssey,
    streamLink: "https://abc.com/shows/doctor-odyssey",
    trailerLink: "https://www.youtube.com/results?search_query=Doctor+Odyssey+trailer"
  },
  {
    title: "Fated to the Alpha",
    role: "Ezra Pierce",
    year: "2024",
    image: fatedAlpha,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Fated+to+the+Alpha+trailer"
  },
  {
    title: "The Back of the Unwanted Bride",
    role: "Ethan Wright",
    year: "2024",
    image: unwantedBride,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=The+Back+of+the+Unwanted+Bride+trailer"
  },
  {
    title: "Call For Billionaire's Surrogate",
    role: "Layson",
    year: "2024",
    image: billionaireSurrogate,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Call+For+Billionaire%27s+Surrogate+trailer"
  }
];

const verticalDramas: Project[] = [
  {
    title: "Oops! I Married My Enemy",
    role: "Lead",
    year: "2025",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Oops+I+Married+My+Enemy+trailer"
  },
  {
    title: "Forbidden Affair with My Husband",
    role: "Lead",
    year: "2025",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Forbidden+Affair+with+My+Husband+trailer"
  },
  {
    title: "Royal Heir Breaks My Heart in a Warzone",
    role: "Lead",
    year: "2025",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Royal+Heir+Breaks+My+Heart+in+a+Warzone+trailer"
  },
  {
    title: "All I Want Is You",
    role: "Lead",
    year: "2025",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=All+I+Want+Is+You+reelshort+trailer"
  },
  {
    title: "Love by Contract",
    role: "Lead",
    year: "2024",
    image: verticalPlaceholder,
    streamLink: "https://www.goodshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Love+by+Contract+vertical+drama+trailer"
  },
  {
    title: "Escorting the Heiress",
    role: "Lead",
    year: "2024",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Escorting+the+Heiress+trailer"
  },
  {
    title: "Marrying My Ex's Uncle",
    role: "Lead",
    year: "2024",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Marrying+My+Ex%27s+Uncle+trailer"
  },
  {
    title: "Scents and Sensibility: Two Fated Mates",
    role: "Lead",
    year: "2024",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Scents+and+Sensibility+Two+Fated+Mates+trailer"
  },
  {
    title: "Fated to Love You, My Sweet Wife",
    role: "Lead",
    year: "2024",
    image: verticalPlaceholder,
    streamLink: "https://www.reelshort.com/",
    trailerLink: "https://www.youtube.com/results?search_query=Fated+to+Love+You+My+Sweet+Wife+trailer"
  }
];

const ProjectCard = ({ project, aspectRatio = "aspect-[3/4]" }: { project: Project, aspectRatio?: string }) => (
  <Dialog>
    <DialogTrigger asChild>
      <div className="cursor-pointer group h-full">
        <ScrollReveal>
          <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 h-full overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/5">
            <div className={`${aspectRatio} relative overflow-hidden`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play className="text-white w-12 h-12 fill-white/20" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  {project.year}
                </span>
                {project.platform && (
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {project.platform}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.role}
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md bg-card border-primary/20">
      <DialogHeader>
        <DialogTitle className="font-heading text-2xl text-primary">{project.title}</DialogTitle>
        <DialogDescription>
          {project.role} • {project.year}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-4">
        <div className="aspect-video w-full overflow-hidden rounded-md border border-border/50 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover blur-sm opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Film className="w-16 h-16 text-foreground/50" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button asChild className="w-full gap-2" size="lg">
            <a href={project.streamLink} target="_blank" rel="noopener noreferrer">
              <MonitorPlay className="w-4 h-4" />
              Stream Now
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full gap-2" size="lg">
            <a href={project.trailerLink} target="_blank" rel="noopener noreferrer">
              <Play className="w-4 h-4" />
              Watch Trailer
            </a>
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const Filmography = () => {
  return (
    <section id="filmography" className="section-padding bg-background/50">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Filmography
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of Long-Format Movies, TV Series, and Short-Form Vertical Dramas.
            </p>
          </div>
        </ScrollReveal>

        <Tabs defaultValue="movies" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-secondary/50 p-1 border border-border">
              <TabsTrigger value="movies" className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Film className="w-4 h-4 mr-2" />
                Movies
              </TabsTrigger>
              <TabsTrigger value="tv" className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Tv className="w-4 h-4 mr-2" />
                TV Series
              </TabsTrigger>
              <TabsTrigger value="vertical" className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Smartphone className="w-4 h-4 mr-2" />
                Vertical Films
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="movies" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {movies.map((movie, index) => (
                <ProjectCard key={index} project={movie} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tv" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tvSeries.map((show, index) => (
                <ProjectCard key={index} project={show} aspectRatio="aspect-video" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vertical" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {verticalDramas.map((drama, index) => (
                <ProjectCard key={index} project={drama} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Filmography;
