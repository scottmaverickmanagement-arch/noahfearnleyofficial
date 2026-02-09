import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const events = [
  { title: "VIP Meet-and-Greet", date: "March 15, 2026", location: "LA Film Festival, Los Angeles, CA", description: "An exclusive, intimate meet-and-greet with Noah. Fan club members receive priority access, photo opportunities, and signed memorabilia.", tickets: true },
  { title: "Private Screening — 'Mercy'", date: "April 22, 2026", location: "AMC Theatre, New York, NY", description: "Join Noah for an exclusive private screening of 'Mercy' followed by a live Q&A session. Limited seats available for fan club members.", tickets: true },
  { title: "Fan Club Appreciation Night", date: "May 10, 2026", location: "The Hollywood Roosevelt, Los Angeles, CA", description: "A night dedicated to Noah's most loyal fans. Enjoy cocktails, live entertainment, and special announcements about upcoming projects.", tickets: true },
  { title: "Comic-Con Panel", date: "July 18, 2026", location: "San Diego Convention Center, San Diego, CA", description: "Noah joins the 'Mercy' cast for a Comic-Con panel discussion. Expect exclusive reveals, behind-the-scenes footage, and audience Q&A.", tickets: false },
  { title: "Charity Gala", date: "September 5, 2026", location: "Beverly Hilton, Beverly Hills, CA", description: "Noah hosts a charity gala benefiting youth sports programs. The evening includes a dinner, live auction of memorabilia, and special performances.", tickets: true },
];

const Events = () => {
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
                  <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3">{event.title}</h2>
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
                    <Button>Get Tickets</Button>
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
