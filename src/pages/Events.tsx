import { CalendarDays, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";
import ScrollReveal from "@/components/ScrollReveal";

const events = [
  { 
    title: "NYC Premiere — 'Love Story'", 
    date: "February 2, 2026", 
    location: "Lincoln Center, New York, NY", 
    description: "An unforgettable evening at the official premiere of the FX biographic drama series 'Love Story.' Special thank you to Noah's best friend Arnold Fabian for his unwavering support during this career-defining event.", 
    tickets: false,
    passed: true 
  },
  { 
    title: "VIP Meet-and-Greet", 
    date: "March 15, 2026", 
    location: "LA Film Festival, Los Angeles, CA", 
    description: "Thank you to everyone who joined us for this exclusive, intimate meet-and-greet with Noah! It was an incredible experience with photo opportunities and signed memorabilia for our fan club members. We truly appreciate everyone who came out and made it possible.", 
    tickets: false,
    passed: true 
  },
  { 
    title: "Sneak Peek: 'Deep Water'", 
    date: "April 10, 2026", 
    location: "Online Exclusive (Fan Club)", 
    description: "Get an exclusive first look at Noah's upcoming independent film 'Deep Water.' Fan club members will receive a private link to the teaser trailer 24 hours before the global release.", 
    tickets: false 
  },
  { title: "Private Screening — 'Mercy'", date: "April 22, 2026", location: "AMC Theatre, New York, NY", description: "Join Noah for an exclusive private screening of 'Mercy' followed by a live Q&A session. Limited seats available for fan club members.", tickets: true },
  { title: "Fan Club Appreciation Night", date: "May 10, 2026", location: "The Hollywood Roosevelt, Los Angeles, CA", description: "A night dedicated to Noah's most loyal fans. Enjoy cocktails, live entertainment, and special announcements about upcoming projects.", tickets: true },
  { 
    title: "Charity Gala for Ocean Conservation", 
    date: "May 15, 2026", 
    location: "The Pierre, New York, NY", 
    description: "Join Noah for a prestigious evening dedicated to protecting our shorelines. Featuring a silent auction, keynote addresses from leading environmentalists, and a special video presentation by Noah. All proceeds support coastal restoration projects.", 
    tickets: true 
  },
  { title: "Comic-Con Panel", date: "July 18, 2026", location: "San Diego Convention Center, San Diego, CA", description: "Noah joins the 'Mercy' cast for a Comic-Con panel discussion. Expect exclusive reveals, behind-the-scenes footage, and audience Q&A.", tickets: false },
  { title: "Charity Gala", date: "September 5, 2026", location: "Beverly Hilton, Beverly Hills, CA", description: "Noah hosts a charity gala benefiting youth sports programs. The evening includes a dinner, live auction of memorabilia, and special performances.", tickets: true },
];

const Events = () => {
  useSEO({
    title: "Noah Fearnley Events – Meet-and-Greets, Screenings & Appearances",
    description: "Find upcoming Noah Fearnley events, including VIP meet-and-greets, private screenings, and special fan appearances."
  });

  const navigate = useNavigate();

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Appearances</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Events</h1>
            <p className="text-muted-foreground text-lg">Upcoming appearances, meet-and-greets, and special events.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          {events.map((event, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <Card className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="font-serif text-xl md:text-2xl font-semibold">{event.title}</h2>
                    {event.passed && (
                      <span className="bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-primary/20">
                        Passed
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-primary" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" /> {event.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>
                  {event.tickets && (
                    <div className="flex flex-col items-start gap-3">
                      <div className="text-xs text-primary font-medium tracking-wide">
                        * Tickets available exclusively for Fan Club members
                      </div>
                      <Button onClick={() => navigate("/fan-club")}>Get Tickets</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;
